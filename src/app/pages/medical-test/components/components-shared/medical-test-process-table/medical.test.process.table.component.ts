import {Component, Input,OnInit, OnDestroy} from '@angular/core';
import { Logger } from "angular2-logger/core";
import { Subscription } from 'rxjs/Subscription';

import {GeneralMedicineTestService} from '../../../../../services/medical-test/general.medicine.test.service';
import {LaboratoryTestService} from '../../../../../services/medical-test/laboratory.test.service';
import {PsychologicalTestService} from '../../../../../services/medical-test/psychological.test.service';
import {RadiologyTestService} from '../../../../../services/medical-test/radiology.test.service';
import {CommonService} from '../../../../../services/common.service';

import {MedicalTestItem} from './medical.test.item';
import {Constants} from '../../../../../models/constants';
import {Catalog} from '../../../../../models/catalog';

@Component({
  selector: 'medical-test-process-table',
  template: require('./medical-test-process-table.html'),
  providers: [Logger, GeneralMedicineTestService, LaboratoryTestService, PsychologicalTestService
        , RadiologyTestService]
})
export class MedicalTestProcessTableComponent implements OnInit, OnDestroy{

    patientCode: number;
    healthPlanId: number;
    errorMessage: string;
    medicalTestItemList: Array<MedicalTestItem>;
    emrStateItemList: Array<Catalog>;
    peopleTableData:Array<any>;
    
    private subscriptionForReceiveInput: Subscription;

    ngOnInit(){
      this.initilize();
    }
    
    ngOnDestroy() {
      this.subscriptionForReceiveInput.unsubscribe();
    }

    constructor(private _logger: Logger, private _generalMedicineTestService: GeneralMedicineTestService
        , private _laboratoryTestService: LaboratoryTestService
        , private _psychologicalTestService: PsychologicalTestService
        , private _radiologyTestService: RadiologyTestService
        , private commonService: CommonService) {
        
    }

    initilize(){
      this.patientCode = null;
      this.healthPlanId = null;
      this.emrStateItemList = [];
      this.initilizeMedicalTestProcessListByDefault();
      this.completeMedicalTestProcess();
    }

    private completeMedicalTestProcess(){
      this.subscriptionForReceiveInput = this.commonService.notifyObservableOfMedicalTestTable$.subscribe((res) => {

        this.patientCode = res.patientCode;
        this.healthPlanId = res.healthPlanId;
        this.emrStateItemList = res.emrStateItemList;
        
        if(this.patientCode!= null && this.healthPlanId != null && this.emrStateItemList !=null){
          this.setMedicalStateForEachTest(res.testIndex, res.isExistingTest);
        }
      });
    }

    private setMedicalStateForEachTest(indexOfMedicalTest: number, isExistingTest: boolean){
      this._logger.warn("===== Calling method GENERAL MEDICINE API: getTestStateByEmrHealthPlanIdAndEmrPatientCode() =====");
      
      this._generalMedicineTestService.getTestStateByEmrHealthPlanIdAndEmrPatientCode(
      this.healthPlanId, this.patientCode).subscribe((medicalTestItem:MedicalTestItem)=>{
            this._logger.warn("OUTPUT => MedicalTestItem: " + JSON.stringify(medicalTestItem));
            if(Constants.GENERAL_MEDICINE_TEST_INDEX == indexOfMedicalTest && !isExistingTest){
              this.medicalTestItemList[Constants.GENERAL_MEDICINE_TEST_INDEX].stateName = this.emrStateItemList[1].name; //in process
              this.medicalTestItemList[Constants.GENERAL_MEDICINE_TEST_INDEX].colorMessage = Constants.INFO_COLOR;
            }else if(medicalTestItem != null){
              if(medicalTestItem.isFinished){
                this.medicalTestItemList[Constants.GENERAL_MEDICINE_TEST_INDEX].stateName = this.emrStateItemList[2].name; //finished
                this.medicalTestItemList[Constants.GENERAL_MEDICINE_TEST_INDEX].colorMessage = Constants.PRIMARY_COLOR;
              }else{
                this.medicalTestItemList[Constants.GENERAL_MEDICINE_TEST_INDEX].stateName = this.emrStateItemList[1].name; //in process
                this.medicalTestItemList[Constants.GENERAL_MEDICINE_TEST_INDEX].colorMessage = Constants.INFO_COLOR;
              }
            }else{
               this.medicalTestItemList[Constants.GENERAL_MEDICINE_TEST_INDEX].stateName = this.emrStateItemList[0].name; //without evaluating
               this.medicalTestItemList[Constants.GENERAL_MEDICINE_TEST_INDEX].colorMessage = Constants.DANGER_COLOR;  
            }     
          }, error => this.errorMessage = <any> error);
          
      this._logger.warn("===== Calling method LABORATORY API: getTestStateByEmrHealthPlanIdAndEmrPatientCode() =====");
      this._laboratoryTestService.getTestStateByEmrHealthPlanIdAndEmrPatientCode(
          this.healthPlanId, this.patientCode).subscribe((medicalTestItem:MedicalTestItem)=>{
            this._logger.warn("OUTPUT => MedicalTestItem: " + JSON.stringify(medicalTestItem));
            if(Constants.LABORATORY_TEST_INDEX == indexOfMedicalTest && !isExistingTest){
              this.medicalTestItemList[Constants.LABORATORY_TEST_INDEX].stateName = this.emrStateItemList[1].name; //in process
              this.medicalTestItemList[Constants.LABORATORY_TEST_INDEX].colorMessage = Constants.INFO_COLOR;
            }else if(medicalTestItem != null){
              if(medicalTestItem.isFinished){
                this.medicalTestItemList[Constants.LABORATORY_TEST_INDEX].stateName = this.emrStateItemList[2].name; //finished
                this.medicalTestItemList[Constants.LABORATORY_TEST_INDEX].colorMessage = Constants.PRIMARY_COLOR;
              }else{
                this.medicalTestItemList[Constants.LABORATORY_TEST_INDEX].stateName = this.emrStateItemList[1].name; //in process
                this.medicalTestItemList[Constants.LABORATORY_TEST_INDEX].colorMessage = Constants.INFO_COLOR;
              }
            }else{
              this.medicalTestItemList[Constants.LABORATORY_TEST_INDEX].stateName = this.emrStateItemList[0].name; //without evaluating
              this.medicalTestItemList[Constants.LABORATORY_TEST_INDEX].colorMessage = Constants.DANGER_COLOR;
            }     
          }, error => this.errorMessage = <any> error);
        
        this._logger.warn("===== Calling method RADIOLOGY API: getTestStateByEmrHealthPlanIdAndEmrPatientCode() =====");
        this._radiologyTestService.getTestStateByEmrHealthPlanIdAndEmrPatientCode(
          this.healthPlanId, this.patientCode).subscribe((medicalTestItem:MedicalTestItem)=>{
            this._logger.warn("OUTPUT => MedicalTestItem: " + JSON.stringify(medicalTestItem));
            if(Constants.RADIOLOGY_TEST_INDEX == indexOfMedicalTest && !isExistingTest){
              this.medicalTestItemList[Constants.RADIOLOGY_TEST_INDEX].stateName = this.emrStateItemList[1].name; //in process
              this.medicalTestItemList[Constants.RADIOLOGY_TEST_INDEX].colorMessage = Constants.INFO_COLOR;
            }else if(medicalTestItem != null){
              if(medicalTestItem.isFinished){
                this.medicalTestItemList[Constants.RADIOLOGY_TEST_INDEX].stateName = this.emrStateItemList[2].name; //finished
                this.medicalTestItemList[Constants.RADIOLOGY_TEST_INDEX].colorMessage = Constants.PRIMARY_COLOR;
              }else{
                this.medicalTestItemList[Constants.RADIOLOGY_TEST_INDEX].stateName = this.emrStateItemList[1].name; //in process
                this.medicalTestItemList[Constants.RADIOLOGY_TEST_INDEX].colorMessage = Constants.INFO_COLOR;
              }
            }else{
              this.medicalTestItemList[Constants.RADIOLOGY_TEST_INDEX].stateName = this.emrStateItemList[0].name; //without evaluating
              this.medicalTestItemList[Constants.RADIOLOGY_TEST_INDEX].colorMessage = Constants.DANGER_COLOR;
            }     
          }, error => this.errorMessage = <any> error);
        
        this._logger.warn("===== Calling method PSYCHOLOGICAL API: getTestStateByEmrHealthPlanIdAndEmrPatientCode() =====");
        this._psychologicalTestService.getTestStateByEmrHealthPlanIdAndEmrPatientCode(
          this.healthPlanId, this.patientCode).subscribe((medicalTestItem:MedicalTestItem)=>{
            this._logger.warn("OUTPUT => MedicalTestItem: " + JSON.stringify(medicalTestItem));
            if(Constants.PSYCHOLOGICAL_TEST_INDEX == indexOfMedicalTest && !isExistingTest){
              this.medicalTestItemList[Constants.PSYCHOLOGICAL_TEST_INDEX].stateName = this.emrStateItemList[1].name; //in process
              this.medicalTestItemList[Constants.PSYCHOLOGICAL_TEST_INDEX].colorMessage = Constants.INFO_COLOR;
            }else if(medicalTestItem != null){
              if(medicalTestItem.isFinished){
                this.medicalTestItemList[Constants.PSYCHOLOGICAL_TEST_INDEX].stateName = this.emrStateItemList[2].name; //finished
                this.medicalTestItemList[Constants.PSYCHOLOGICAL_TEST_INDEX].colorMessage = Constants.PRIMARY_COLOR;
              }else{
                this.medicalTestItemList[Constants.PSYCHOLOGICAL_TEST_INDEX].stateName = this.emrStateItemList[1].name; //in process
                this.medicalTestItemList[Constants.PSYCHOLOGICAL_TEST_INDEX].colorMessage = Constants.INFO_COLOR;
              }
            }else{
              this.medicalTestItemList[Constants.PSYCHOLOGICAL_TEST_INDEX].stateName = this.emrStateItemList[0].name; //without evaluating
              this.medicalTestItemList[Constants.PSYCHOLOGICAL_TEST_INDEX].colorMessage = Constants.DANGER_COLOR;
            }     
          }, error => this.errorMessage = <any> error);
    }

    private initilizeMedicalTestProcessListByDefault(){
      this.medicalTestItemList = [];
      //is very important the order for push item
      this.medicalTestItemList.push(new MedicalTestItem(MedicalTestItem.GENERAL_MEDICINE_TEST_NAME
            ,Constants.LOADING_LABEL, Constants.WARNING_COLOR));//index 0
      this.medicalTestItemList.push(new MedicalTestItem(MedicalTestItem.LABORATORY_TEST_NAME
            ,Constants.LOADING_LABEL, Constants.WARNING_COLOR));//index 1
      this.medicalTestItemList.push(new MedicalTestItem(MedicalTestItem.RADIOLOGY_TEST_NAME
            ,Constants.LOADING_LABEL, Constants.WARNING_COLOR));//index 2
      this.medicalTestItemList.push(new MedicalTestItem(MedicalTestItem.PSYCHOLOGICAL_TEST_NAME
            ,Constants.LOADING_LABEL, Constants.WARNING_COLOR));//index 3
    }
}
