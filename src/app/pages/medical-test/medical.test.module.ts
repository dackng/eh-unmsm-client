import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './medical.test.routing';

import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import { MedicalTestComponent } from './medical.test.component';
import { GeneralMedicineComponent } from './components/general-medicine/general.medicine.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    RatingModule,
    routing
  ],
  declarations: [
    MedicalTestComponent,
    GeneralMedicineComponent
  ]
})
export default class MedicalTestModule {
}

