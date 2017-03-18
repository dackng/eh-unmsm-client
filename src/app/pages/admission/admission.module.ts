import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './admission.routing';

import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AdmissionComponent } from './admission.component';
import { RegisterPacientComponent } from './components/register-pacient/registerPacient.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    RatingModule,
    routing
  ],
  declarations: [
    AdmissionComponent,
    RegisterPacientComponent
  ]
})
export default class AdmissionModule {
}
