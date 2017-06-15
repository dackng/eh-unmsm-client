import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Logger } from "angular2-logger/core";

import {Patient} from '../../../../models/patient';
import {Catalog} from '../../../../models/catalog';
import {Emr} from '../../../../models/emr';
import {PsychologicalTest} from '../../../../models/medical-test/psychological.test';
import {PsychologicalTestService} from '../../../../services/medical-test/psychological.test.service';
import {EmrService} from '../../../../services/emr.service';
import {CatalogService} from '../../../../services/catalog.service';
import {CommonService} from '../../../../services/common.service';

import {BasicTablesService} from '../../../../services/basicTables.service';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
    selector: 'psychological',
    styleUrls: ['../../../../theme/sass/_disabled.scss', 
                '../../../../theme/sass/_basicTables.scss',
                '../../../../theme/sass/_modals.scss'],
    templateUrl: './psychological-test.html',
    providers: [Logger, PsychologicalTestService, EmrService, CatalogService, BasicTablesService]
})

export class PsychologicalTestComponent implements OnInit{ 
    psychologicalTest: PsychologicalTest;
    currentHealthPlan: Catalog;
    patientCode: number;
    isPsychologicalTestRegistered: boolean;
    diagnosisItemList: Array<Catalog>;
    isFieldDisabled: boolean;
    errorMessage: string;

    ngOnInit(){
        this.initilize();
    }

    constructor(private _logger: Logger, private _basicTablesService: BasicTablesService, private _catalogService: CatalogService
        , private _emrService: EmrService, private _psychologicalTestService: PsychologicalTestService, private _commonService: CommonService) {
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
        this.validateEMRAndPsychologicalTestExistence(patient);   
    }

    validateEMRAndPsychologicalTestExistence(patient: Patient){
        this._logger.warn("===== Calling EMR API: getEmrByHealthPlanIdAndPatientCode(" + this.currentHealthPlan.secondaryId 
                    + ", " + patient.code + ") =====");
        this._emrService.getEmrByHealthPlanIdAndPatientCode(this.currentHealthPlan.secondaryId, patient.code)
            .subscribe( (emr: Emr) => {
                if (emr != null){
                    this._logger.warn("EMR already registered");
                    this._logger.warn("===== Calling RadiologyTest API: getRadiologyTestByHealthPlanIdAndPatientCode("
                            + this.currentHealthPlan.secondaryId + ", " + patient.code + ") =====");
                    this._psychologicalTestService
                        .getPsychologicalTestByHealthPlanIdAndPatientCode(emr.healthPlanId, emr.patientCode)
                        .subscribe( (psychologicalTest: PsychologicalTest) => {
                            if(psychologicalTest != null){
                                this._logger.warn("PsychologicalTest already registered");
                                this.psychologicalTest.setFieldsDetail(psychologicalTest);
                            }else{
                                this._logger.warn("RadiologyTest is not registered yet");
                                this.psychologicalTest = new PsychologicalTest();
                                this.psychologicalTest.emrHealthPlanId = this.currentHealthPlan.secondaryId;
                                this.psychologicalTest.emrPatientCode = patient.code;
                                this.isPsychologicalTestRegistered = false;
                            }
                        }, error => this.errorMessage = <any> error);                        
                }else{
                    this._logger.warn("EMR doesn't be registered yet, should register EMR for this patient");
                }
            }, error => this.errorMessage = <any> error);
    }

    registerPsychologicalTest(){
        this.isFieldDisabled = true;
        this._logger.warn("===== Calling PsychologicalTest API: registerPsychologicalTest()");
        this._logger.warn("INPUT => PsychologicalTest: "+JSON.stringify(this.psychologicalTest)); 
    }

    initilize(){
        this.patientCode = null;
        this.isPsychologicalTestRegistered = true;
        this.isFieldDisabled = false;
        this.errorMessage = null;
        this.psychologicalTest = new PsychologicalTest();
        this._commonService.notifyOther({initilizePatientCode:null
            , initilizePatient: new Patient(), initilizeIsActive:false});
    }
}