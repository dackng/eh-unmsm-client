import {Component, Input,OnInit, OnDestroy} from '@angular/core';
import { Logger } from "angular2-logger/core";
import { Subscription } from 'rxjs/Subscription';

import {EmrService} from '../../../../../services/emr.service';
import {CommonService} from '../../../../../services/common.service';

import {MedicalTest} from '../../../../../models/medical.test';
@Component({
  selector: 'medical-test-process-table',
  template: require('./medical-test-process-table.html'),
  providers: [Logger, EmrService]
})
export class MedicalTestProcessTableComponent implements OnInit, OnDestroy{
    patientCode: number;
    healthPlanId: number;
    errorMessage: string;
    medicalTestList: Array<MedicalTest>;
    peopleTableData:Array<any>;
    
    private subscriptionForReceiveInput: Subscription;

    ngOnInit(){
      this.initilize();
    }
    
    ngOnDestroy() {
      this.subscriptionForReceiveInput.unsubscribe();
    }

    constructor(private _logger: Logger, private _emrService: EmrService
        , private _commonService: CommonService) {
    }

    initilize(){
      this.patientCode = null;
      this.healthPlanId = null;
      this.medicalTestList = [];
      this.completeMedicalTestProcess();
    }

    private completeMedicalTestProcess(){
      this.subscriptionForReceiveInput = this._commonService.notifyObservableOfMedicalTestTable$.subscribe((res) => {

        this.patientCode = res.patientCode;
        this.healthPlanId = res.healthPlanId;
        
        if(this.patientCode!= null && this.healthPlanId != null){
          this.setMedicalStateForEachTest(res.testTypeId);
        }
      });
    }

    private setMedicalStateForEachTest(testTypeId: number){
      this._logger.warn("===== Calling method EMR API: getMedicalTestsByType() =====");
      this._emrService.getMedicalTestsByType(
      this.healthPlanId, this.patientCode, testTypeId).subscribe((medicalTestList:Array<MedicalTest>)=>{
            this._logger.warn("OUTPUT => MedicalTestList: " + JSON.stringify(medicalTestList));
            this.medicalTestList = medicalTestList;     
          }, error => this.errorMessage = <any> error);
    }
}
