import {Component, Output, EventEmitter, OnInit} from '@angular/core';

import {Pacient} from '../../../models/pacient';
import {PacientService} from '../../../services/pacient.service';

@Component({
  selector: 'find-pacient',
  styleUrls: ['../../../theme/sass/_disabled.scss'],
  template: require('./find-pacient.html'),
  providers: [PacientService]
})
export class FindPacientComponent implements OnInit{
  pacient : Pacient;
  pacientCode : number;
  isActive: boolean;
  errorMessage: string;
  @Output() pacientNotify = new EventEmitter<Pacient>();

  ngOnInit(){
    this.initilize();
  }

  constructor (private pacientService: PacientService) {
  }

  initilize(){
    this.isActive = false;
    this.pacientCode = null;
    this.errorMessage = null;
    this.pacient = new Pacient();
  }

  findPacientByCode(){
    this.isActive = true;
    this.pacient = new Pacient();
    this.pacientService.getPacientSummaryByCode(this.pacientCode)
      .subscribe( (pacient : Pacient )=> {            
        if(pacient != null){
          this.pacient.setFieldsSummary(pacient);
          this.pacientNotify.emit(this.pacient);  
        }else{               
          console.log("enviar mensaje que no existe");
          //SE DEBE ENVIAR UNA MENSAJE Q NO EXISTE O TIENE Q IR AL RECEPCIONISTA
        }
      }, error => this.errorMessage = <any> error);
  }

}
