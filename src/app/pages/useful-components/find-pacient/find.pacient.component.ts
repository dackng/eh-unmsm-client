import {Component, Output, EventEmitter} from '@angular/core';
import {Pacient} from '../../../models/pacient';

@Component({
  selector: 'find-pacient',
  template: require('./find-pacient.html')
})
export class FindPacientComponent {
  pacient : Pacient;
  @Output() pacient2Notify = new EventEmitter<Pacient>();
  pacientCode : number;
  existPacient: boolean;
  errorMessage: string;
  
  constructor() {
    this.initilize();
  }

  initilize(){
      this.pacientCode = null;
      this.existPacient = true;
      this.errorMessage = null;
      this.pacient = new Pacient();
  }

  findPacientByCode(){
      this.pacient.code=this.pacientCode;
      this.pacient2Notify.emit(this.pacient);


    }    
  }

}
