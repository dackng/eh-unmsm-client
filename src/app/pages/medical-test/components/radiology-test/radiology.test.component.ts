import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Logger } from "angular2-logger/core";

import {Patient} from '../../../../models/patient';
import {Catalog} from '../../../../models/catalog';
import {Emr} from '../../../../models/emr';
import {RadiologyTest} from '../../../../models/medical-test/radiology.test';
import {RadiologyTestService} from '../../../../services/medical-test/radiology.test.service';
import {EmrService} from '../../../../services/emr.service';
import {CatalogService} from '../../../../services/catalog.service';

import {BasicTablesService} from '../../../../services/basicTables.service';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
    selector: 'radiology',
    styleUrls: ['../../../../theme/sass/_disabled.scss', 
                '../../../../theme/sass/_basicTables.scss',
                '../../../../theme/sass/_modals.scss'],
    templateUrl: './radiology-test.html',
    providers: [Logger, RadiologyTestService, EmrService, CatalogService, BasicTablesService]
})

export class RadiologyTestComponent implements OnInit{ 
    radiologyTest: RadiologyTest;
    currentHealthPlan: Catalog;
    patientCode: number;
    isRadiologyTestRegistered: boolean;
    radiologyTypeItemList: Array<Catalog>;
    isFieldDisabled: boolean;
    errorMessage: string;

    ngOnInit(){
        this.initilize();
    }

    constructor(private _logger: Logger, private _basicTablesService: BasicTablesService, private _catalogService: CatalogService
        , private _emrService: EmrService, private _radiologyTestService: RadiologyTestService) {
        this._logger.warn("Constructor()");
        let itemByDefault = new Catalog(null,"<SELECCIONE>");
        this._logger.warn("===== Calling method CATALOG API:  getCurrentHealthPlan() =====");
        this._catalogService.getCurrentHealthPlan()//loading the current health plan
            .subscribe( (catalog : Catalog ) => {
                this.currentHealthPlan = new Catalog (catalog.secondaryId, catalog.name);
                this._logger.warn("OUTPUT=> currentHealthPlan : " + JSON.stringify(this.currentHealthPlan));
        }, error => this.errorMessage = <any> error);
    }

    receiveOutputExternal(patient: Patient){
        this.validateEMRAndRadiologyTestExistence(patient);   
    }

    validateEMRAndRadiologyTestExistence(patient: Patient){
        this._logger.warn("===== Calling EMR API: getEmrByHealthPlanIdAndPatientCode(" + this.currentHealthPlan.secondaryId 
                    + ", " + patient.code + ") =====");
        this._emrService.getEmrByHealthPlanIdAndPatientCode(this.currentHealthPlan.secondaryId, patient.code)
            .subscribe( (emr: Emr) => {
                if (emr != null){
                    this._logger.warn("EMR already registered");
                    this._logger.warn("===== Calling RadiologyTest API: getRadiologyTestByHealthPlanIdAndPatientCode("
                            + this.currentHealthPlan.secondaryId + ", " + patient.code + ") =====");
                    this._radiologyTestService
                        .getRadiologyTestByHealthPlanIdAndPatientCode(emr.healthPlanId, emr.patientCode)
                        .subscribe( (radiologyTest: RadiologyTest) => {
                            if(radiologyTest != null){
                                this._logger.warn("RadiologyTest already registered");
                                this.radiologyTest.setFieldsDetail(radiologyTest);
                            }else{
                                this._logger.warn("RadiologyTest is not registered yet");
                                this.radiologyTest = new RadiologyTest();
                                this.radiologyTest.emrHealthPlanId = this.currentHealthPlan.secondaryId;
                                this.radiologyTest.emrPatientCode = patient.code;
                                this.isRadiologyTestRegistered = false;
                            }
                        }, error => this.errorMessage = <any> error);                        
                }else{
                    this._logger.warn("EMR doesn't be registered yet, should register EMR for this patient");
                }
            }, error => this.errorMessage = <any> error);
    }

    registerRadiologyTest(){
        this.isFieldDisabled = true;
        this._logger.warn("===== Calling RadiologyTest API: registerRadiologyTest()");
        this._logger.warn("INPUT => RadiologyTest: "+JSON.stringify(this.radiologyTest)); 
    }

    initilize(){
        this.patientCode = null;
        this.isRadiologyTestRegistered = true;
        this.isFieldDisabled = false;
        this.errorMessage = null;
        this.radiologyTest = new RadiologyTest();
    }
}