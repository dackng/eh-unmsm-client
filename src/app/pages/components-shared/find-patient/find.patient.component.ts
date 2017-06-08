import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import { Logger } from "angular2-logger/core";

import {Patient} from '../../../models/patient';
import {PatientService} from '../../../services/patient.service';

@Component({
  selector: 'find-patient',
  styleUrls: ['../../../theme/sass/_disabled.scss'],
  template: require('./find-patient.html'),
  providers: [Logger, PatientService]
})
export class FindPatientComponent implements OnInit{
  patient : Patient;
  patientCode : number;
  isActive: boolean;
  errorMessage: string;
  @Output() patientNotify = new EventEmitter<Patient>();

  ngOnInit(){
    this.initilize();
  }

  constructor (private _logger: Logger, private _patientService: PatientService) {
  }

  initilize(){
    this.isActive = false;
    this.patientCode = null;
    this.errorMessage = null;
    this.patient = new Patient();
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
          this._logger.warn("Patient doesn't exist or should go to receptionist");
        }
      }, error => this.errorMessage = <any> error);
  }

}
