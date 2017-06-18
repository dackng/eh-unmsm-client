import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { Logger } from "angular2-logger/core";
import { Subscription } from 'rxjs/Subscription';

import {Patient} from '../../../models/patient';
import {PatientService} from '../../../services/patient.service';
import {CommonService} from '../../../services/common.service';

@Component({
  selector: 'find-patient',
  styleUrls: ['../../../theme/sass/_disabled.scss'],
  template: require('./find-patient.html'),
  providers: [Logger, PatientService]
})
export class FindPatientComponent implements OnInit, OnDestroy{
  patient : Patient;
  patientCode : number;
  isActive: boolean;
  errorMessage: string;
  @Output() patientNotify = new EventEmitter<Patient>();
  private subscriptionForReceiveInput: Subscription;

  ngOnInit(){
    this.initilize();
  }
  ngOnDestroy() {
    this.subscriptionForReceiveInput.unsubscribe();
  }

  constructor (private _logger: Logger, private _patientService: PatientService
              , private commonService: CommonService) {
  }

  initilize(){
    this.patient = new Patient();
    this.patientCode = null;
    this.isActive = false;
    this.errorMessage = null;
    this.subscriptionForReceiveInput = this.commonService.notifyObservable$.subscribe((res) => {
        this.patientCode = res.initilizePatientCode;
        this.patient = res.initilizePatient;
        this.isActive = res.initilizeIsActive;
    });
  }

  findPatientByCode(){
    this.isActive = true;
    this.patient = new Patient();
    this._logger.warn("===== Calling method PATIENT API:  getPatientSummaryByCode("+ this.patientCode +") =====");
    this._patientService.getPatientSummaryByCode(this.patientCode)
      .subscribe( (patient : Patient )=> {            
        if(patient != null){
          this.patient.setFieldsSummary(patient);
          this._logger.warn("OUTPUT => Patient: " + JSON.stringify(this.patient));
          this.patientNotify.emit(this.patient);  
        }else{               
          this._logger.warn("Patient isn't exist or should go to receptionist");
          this.initilize();
        }
      }, error => this.errorMessage = <any> error);
  }

}
