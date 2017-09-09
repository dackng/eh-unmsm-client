import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Logger } from "angular2-logger/core";

import {Patient} from '../../../../models/patient';
import {Catalog} from '../../../../models/catalog';
import {Emr} from '../../../../models/emr';
import {Phr} from '../../../../models/health-record/phr';
import {Utils} from '../../../../models/utils';
import {Constants} from '../../../../models/constants';
import {PsychologicalTest} from '../../../../models/medical-test/psychological.test';
import {PsychologicalTestService} from '../../../../services/medical-test/psychological.test.service';
import {EmrService} from '../../../../services/emr.service';
import {PhrService} from '../../../../services/phr.service';
import {CatalogService} from '../../../../services/catalog.service';
import {CommonService} from '../../../../services/common.service';

import { ModalDirective } from 'ng2-bootstrap';

@Component({
    selector: 'psychological',
    styleUrls: ['../../../../theme/sass/_disabled.scss', 
                '../../../../theme/sass/_basicTables.scss',
                '../../../../theme/sass/_modals.scss'],
    templateUrl: './psychological-test.html',
    providers: [Logger, PsychologicalTestService, EmrService, CatalogService, CommonService, PhrService]
})

export class PsychologicalTestComponent implements OnInit{ 
    emrUpdated: Emr;
    phrUpdated: Phr;
    psychologicalTest: PsychologicalTest;
    currentHealthPlan: Catalog;
    patientCode: number;
    isPsychologicalTestRegistered: boolean;
    diagnosisItemList: Array<Catalog>;
    emrStateItemList: Array<Catalog>;
    depressionStateItemList: Array<Catalog>;
	anxietyStateItemList: Array<Catalog>;
    isFieldDisabled: boolean;
    errorMessage: string;

    ngOnInit(){
        this.initilize();
    }

    constructor(private _logger: Logger, private _catalogService: CatalogService
        , private _emrService: EmrService, private _psychologicalTestService: PsychologicalTestService
        , private _commonService: CommonService, private _phrService: PhrService) {
        this._logger.warn("Constructor()");
        let itemByDefault = Utils.getSelectItemByDefault();
        this._logger.warn("===== Calling method CATALOG API:  getPsychologicalDiagnosisList() =====");
        this._catalogService.getPsychologicalDiagnosisList()
            .subscribe( (diagnosisItemList : Array<Catalog> ) => {
                this.diagnosisItemList = diagnosisItemList;
                this.diagnosisItemList.push(itemByDefault);
                this._logger.warn("OUTPUT=> diagnosisItemList : " + JSON.stringify(this.diagnosisItemList));
        }, error => this.errorMessage = <any> error);
        this._logger.warn("===== Calling method CATALOG API: getEmrStateList() =====");
        this._catalogService.getEmrStateList()
            .subscribe( (emrStateItemList : Array<Catalog> ) => {
                this.emrStateItemList = emrStateItemList;
                this._logger.warn("OUTPUT=> emrStateItemList : " + JSON.stringify(this.emrStateItemList));
            }, error => this.errorMessage = <any> error);
        this._logger.warn("===== Calling method CATALOG API: getDepressionStateList() =====");
        this._catalogService.getDepressionStateList()
            .subscribe( (depressionStateItemList : Array<Catalog> ) => {
                this.depressionStateItemList = depressionStateItemList;
                this._logger.warn("OUTPUT=> depressionStateItemList : " + JSON.stringify(this.depressionStateItemList));
            }, error => this.errorMessage = <any> error);
        this._logger.warn("===== Calling method CATALOG API: getAnxietyStateList() =====");
        this._catalogService.getAnxietyStateList()
            .subscribe( (anxietyStateItemList : Array<Catalog> ) => {
                this.anxietyStateItemList = anxietyStateItemList;
                this._logger.warn("OUTPUT=> anxietyStateItemList : " + JSON.stringify(this.anxietyStateItemList));
            }, error => this.errorMessage = <any> error);   
    }

    receiveOutputExternalOfPatient(patient: Patient){
        if(patient != null){
            this.validateEMRAndPsychologicalTestExistence(patient);
        }else{
            this.initilize();
        }   
    }

    receiveOutputExternalOfCurrentHealthPlan(currentHealthPlan: Catalog){
        this.currentHealthPlan = currentHealthPlan;
        this._logger.warn("ReceiveOutput currentHealthPlan="+JSON.stringify(this.currentHealthPlan));   
    }

    validateEMRAndPsychologicalTestExistence(patient: Patient){
        this._logger.warn("===== Calling EMR API: getEmrByHealthPlanIdAndPatientCode(" + this.currentHealthPlan.secondaryId 
                    + ", " + patient.code + ") =====");
        this._emrService.getEmrByHealthPlanIdAndPatientCode(this.currentHealthPlan.secondaryId, patient.code)
            .subscribe( (emr: Emr) => {
                if (emr != null){
                    this.emrUpdated = emr;
                    this._logger.warn("EMR already registered");
                    this._logger.warn("===== Calling RadiologyTest API: getRadiologyTestByHealthPlanIdAndPatientCode("
                            + this.currentHealthPlan.secondaryId + ", " + patient.code + ") =====");
                    this._psychologicalTestService
                        .getPsychologicalTestByHealthPlanIdAndPatientCode(emr.healthPlanId, emr.patientCode)
                        .subscribe( (psychologicalTest: PsychologicalTest) => {
                            if(psychologicalTest != null){
                                this._logger.warn("PsychologicalTest already registered");
                                this.psychologicalTest.setFieldsDetail(psychologicalTest);
                                this._commonService.notifyFindPacientComponent(
                                    //sending signal for write other patient code
                                    {initilizePatientCode:patient.code 
                                    , initilizePatient: patient, initilizeIsActive:false});
                            }else{
                                this._logger.warn("RadiologyTest is not registered yet");
                                this.isPsychologicalTestRegistered = false;
                                this.psychologicalTest = new PsychologicalTest();
                                this.psychologicalTest.depressionStateItemList = this.depressionStateItemList;
                                this.psychologicalTest.anxietyStateItemList = this.anxietyStateItemList;
                                this.psychologicalTest.emrHealthPlanId = this.currentHealthPlan.secondaryId;
                                this.psychologicalTest.emrPatientCode = patient.code;
                            }
                            this._commonService.notifyMedicalTestProcessComponent(
                                //sending signal for get process table
                                {patientCode: patient.code 
                                , healthPlanId: this.currentHealthPlan.secondaryId
                                , emrStateItemList:this.emrStateItemList
                                , testIndex: Constants.PSYCHOLOGICAL_TEST_INDEX
                                , isExistingTest: this.isPsychologicalTestRegistered});
                        }, error => this.errorMessage = <any> error);                        
                }else{
                    this._logger.warn("EMR doesn't be registered yet, should register EMR for this patient");
                }
            }, error => this.errorMessage = <any> error);
    }

    registerPsychologicalTest(isFormValided : boolean){
        this.isFieldDisabled = true;
        if(isFormValided){
            this._logger.warn("===== Calling PsychologicalTest API: registerPsychologicalTest()");
            this._logger.warn("INPUT => PsychologicalTest: "+JSON.stringify(this.psychologicalTest));
            this._psychologicalTestService.registerPsychologicalTest(this.psychologicalTest)
                .subscribe(test => {
                    this._logger.warn("*****PsychologicalTest registered successful*****");
                    this._emrService.validateEmrState(this.psychologicalTest.emrHealthPlanId,
                        this.psychologicalTest.emrPatientCode, this.emrUpdated).subscribe( (emr: Emr )=> {
                            this._logger.warn("*****EMR state valid successful*****");
                            this._setValuesOfPsychologicalTestForPHR(emr, this.emrStateItemList
                                , this.psychologicalTest, this.diagnosisItemList);
                            this._logger.warn("===== Calling method PHR API: updateEmrSummary(INPUT) =====");
                            this._logger.warn("INPUT => emrSummary: " + JSON.stringify(this.phrUpdated.emrSummary));
                            this._phrService.updateEmrSummary(this.psychologicalTest.emrPatientCode, this.phrUpdated.emrSummary)
                                .subscribe( (phr: Phr) => {
                                    this._logger.warn("OUTPUT => PHR with EMR updated successful");
                                    this.initilize();
                            }, error => this.errorMessage = <any> error);
                        }, error => this.errorMessage = <any> error);
                }, error => this.errorMessage = <any> error);
        } 
    }

    initilize(){
        this.patientCode = null;
        this.isPsychologicalTestRegistered = true;
        this.isFieldDisabled = false;
        this.errorMessage = null;
        this.psychologicalTest = new PsychologicalTest();
        this.emrUpdated = new Emr();
        this.phrUpdated = new Phr();
        this._initilizeChildComponents();
    }

    private _initilizeChildComponents(){
        this._commonService.notifyFindPacientComponent({initilizePatientCode:null
            , initilizePatient: new Patient(), initilizeIsActive:false});
        this._commonService.notifyMedicalTestProcessComponent(
            {patientCode: null 
            , healthPlanId: null
            , emrStateItemList:null
            , testIndex: Constants.PSYCHOLOGICAL_TEST_INDEX
            , isExistingTest: false});
    }
    
    private _setValuesOfPsychologicalTestForPHR(emr: Emr, emrStateItemList: Array<Catalog>
        , psychologicalTest:PsychologicalTest, diagnosisItemList: Array<Catalog>){
        this.phrUpdated.emrSummary.state = emrStateItemList.find(item => item.secondaryId == emr.stateId).name;
        this.phrUpdated.emrSummary.psychologicalResult = diagnosisItemList
            .find(item => item.secondaryId == psychologicalTest.diagnosisId).name;
    }
}