import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './admission.routing';

import { AdmissionComponent } from './admission.component';
import { RegisterPacientComponent } from './components/register-pacient/register.pacient.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    routing
  ],
  declarations: [
    AdmissionComponent,
    RegisterPacientComponent
  ]
})
export class AdmissionModule {
}
