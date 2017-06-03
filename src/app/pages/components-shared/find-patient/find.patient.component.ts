import {Component, Output, EventEmitter, OnInit} from '@angular/core';

import {Patient} from '../../../models/patient';
import {PatientService} from '../../../services/patient.service';

@Component({
  selector: 'find-patient',
  styleUrls: ['../../../theme/sass/_disabled.scss'],
  template: require('./find-patient.html'),
  providers: [PatientService]
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

  constructor (private patientService: PatientService) {
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
    this.patientService.getPatientSummaryByCode(this.patientCode)
      .subscribe( (patient : Patient )=> {            
        if(patient != null){
          this.patient.setFieldsSummary(patient);
          this.patientNotify.emit(this.patient);  
        }else{               
          console.log("enviar mensaje que no existe");
          //SE DEBE ENVIAR UNA MENSAJE Q NO EXISTE O TIENE Q IR AL RECEPCIONISTA
        }
      }, error => this.errorMessage = <any> error);
  }

}
