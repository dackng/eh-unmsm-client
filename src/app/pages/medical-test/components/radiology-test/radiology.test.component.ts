import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Logger } from "angular2-logger/core";

import {Patient} from '../../../../models/patient';
import {Catalog} from '../../../../models/catalog';
import {Emr} from '../../../../models/emr';
import {Utils} from '../../../../models/utils';
import {Constants} from '../../../../models/constants';
import {RadiologyTest} from '../../../../models/medical-test/radiology.test';
import {RadiologyTestService} from '../../../../services/medical-test/radiology.test.service';
import {EmrService} from '../../../../services/emr.service';
import {CatalogService} from '../../../../services/catalog.service';
import {CommonService} from '../../../../services/common.service';

import { ModalDirective } from 'ng2-bootstrap';

@Component({
    selector: 'radiology',
    styleUrls: ['../../../../theme/sass/_disabled.scss', 
                '../../../../theme/sass/_basicTables.scss',
                '../../../../theme/sass/_modals.scss'],
    templateUrl: './radiology-test.html',
    providers: [Logger, RadiologyTestService, EmrService, CatalogService, CommonService]
})

export class RadiologyTestComponent implements OnInit{ 
    emrUpdated: Emr;
    radiologyTest: RadiologyTest;
    currentHealthPlan: Catalog;
    patientCode: number;
    isRadiologyTestRegistered: boolean;
    radiologyTypeItemList: Array<Catalog>;
    emrStateItemList: Array<Catalog>;
    isFieldDisabled: boolean;
    errorMessage: string;

    ngOnInit(){
        this.initilize();
    }

    constructor(private _logger: Logger, private _catalogService: CatalogService
        , private _emrService: EmrService, private _radiologyTestService: RadiologyTestService, private _commonService: CommonService) {
        this._logger.warn("Constructor()");
        let itemByDefault = Utils.getSelectItemByDefault();
        this._logger.warn("===== Calling method CATALOG API:  getRadiologyTypeList() =====");
        this._catalogService.getRadiologyTypeList()
            .subscribe( (radiologyTypeItemList : Array<Catalog> ) => {
                this.radiologyTypeItemList = radiologyTypeItemList;
                this.radiologyTypeItemList.push(itemByDefault);
                this._logger.warn("OUTPUT=> radiologyTypeItemList : " + JSON.stringify(this.radiologyTypeItemList));
        }, error => this.errorMessage = <any> error);
        this._logger.warn("===== Calling method CATALOG API: getEmrStateList() =====");
        this._catalogService.getEmrStateList()
            .subscribe( (emrStateItemList : Array<Catalog> ) => {
                this.emrStateItemList = emrStateItemList;
                this._logger.warn("OUTPUT=> emrStateItemList : " + JSON.stringify(this.emrStateItemList));
            }, error => this.errorMessage = <any> error);
    }

    receiveOutputExternalOfPatient(patient: Patient){
        if(patient != null){
            this._commonService.notifyMedicalTestProcessComponent(
            //sending signal for get process table
            {patientCode: patient.code 
            , healthPlanId: this.currentHealthPlan.secondaryId
            , emrStateItemList:this.emrStateItemList
            , testIndex: Constants.RADIOLOGY_TEST_INDEX
            , isExistingTest: this.validateEMRAndRadiologyTestExistence(patient)});
        }else{
            this.initilize();
        }
    }

    receiveOutputExternalOfCurrentHealthPlan(currentHealthPlan: Catalog){
        this.currentHealthPlan = currentHealthPlan;
        this._logger.warn("ReceiveOutput currentHealthPlan="+JSON.stringify(this.currentHealthPlan));   
    }

    validateEMRAndRadiologyTestExistence(patient: Patient){
        this._logger.warn("===== Calling EMR API: getEmrByHealthPlanIdAndPatientCode(" + this.currentHealthPlan.secondaryId 
                    + ", " + patient.code + ") =====");
        this._emrService.getEmrByHealthPlanIdAndPatientCode(this.currentHealthPlan.secondaryId, patient.code)
            .subscribe( (emr: Emr) => {
                if (emr != null){
                    this.emrUpdated = emr;
                    this._logger.warn("EMR already registered");
                    this._logger.warn("===== Calling RadiologyTest API: getRadiologyTestByHealthPlanIdAndPatientCode("
                            + this.currentHealthPlan.secondaryId + ", " + patient.code + ") =====");
                    this._radiologyTestService
                        .getRadiologyTestByHealthPlanIdAndPatientCode(emr.healthPlanId, emr.patientCode)
                        .subscribe( (radiologyTest: RadiologyTest) => {
                            if(radiologyTest != null){
                                this._logger.warn("RadiologyTest already registered");
                                this.radiologyTest.setFieldsDetail(radiologyTest);
                                this._commonService.notifyFindPacientComponent(
                                    //sending signal for write other patient code
                                    {initilizePatientCode:patient.code 
                                    , initilizePatient: patient, initilizeIsActive:false});
                            }else{
                                this._logger.warn("RadiologyTest is not registered yet");
                                this.radiologyTest = new RadiologyTest();
                                this.radiologyTest.emrHealthPlanId = this.currentHealthPlan.secondaryId;
                                this.radiologyTest.emrPatientCode = patient.code;
                                this.isRadiologyTestRegistered = false;
                            }
                            return this.isRadiologyTestRegistered;
                        }, error => this.errorMessage = <any> error);                        
                }else{
                    this._logger.warn("EMR doesn't be registered yet, should register EMR for this patient");
                }
            }, error => this.errorMessage = <any> error);
    }

    registerRadiologyTest(isFormValided : boolean){
        this.isFieldDisabled = true;
        if(isFormValided){
            this._logger.warn("===== Calling RadiologyTest API: registerRadiologyTest()");
            this._logger.warn("INPUT => RadiologyTest: "+JSON.stringify(this.radiologyTest));
            this._radiologyTestService.registerRadiologyTest(this.radiologyTest)
                .subscribe(test => {
                    this._logger.warn("*****RadiologyTest registered successful*****");
                    this._emrService.validateEmrState(this.radiologyTest.emrHealthPlanId,
                        this.radiologyTest.emrPatientCode, this.emrUpdated).subscribe(emr => {
                            this._logger.warn("*****EMR state valid successful*****");
                            this.initilize();
                        }, error => this.errorMessage = <any> error);
                }, error => this.errorMessage = <any> error);
        }
    }

    initilize(){
        this.patientCode = null;
        this.isRadiologyTestRegistered = true;
        this.isFieldDisabled = false;
        this.errorMessage = null;
        this.radiologyTest = new RadiologyTest();
        this.emrUpdated = new Emr();
        this.initilizeChildComponents();
    }

    private initilizeChildComponents(){
        this._commonService.notifyFindPacientComponent({initilizePatientCode:null
            , initilizePatient: new Patient(), initilizeIsActive:false});
        this._commonService.notifyMedicalTestProcessComponent(
            {patientCode: null 
            , healthPlanId: null
            , emrStateItemList:null
            , testIndex: Constants.RADIOLOGY_TEST_INDEX
            , isExistingTest: false});
    }
}