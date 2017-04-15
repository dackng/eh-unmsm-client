import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { routing }       from './medical.test.routing';

import { RatingModule } from 'ng2-bootstrap/ng2-bootstrap';
import { MedicalTestComponent } from './medical.test.component';
import { GeneralMedicineTestComponent } from './components/general-medicine-test/general.medicine.test.component';
import { TabComponent } from '../useful-components/component-tabbed/tab/tab.component';
import { TabsComponent } from '../useful-components/component-tabbed/tabs/tabs.component';
import { MedicalTestProcessTableComponent } from '../useful-components/medical-test-process-table/medical.test.process.table.component';

import { FindPacientComponent } from '../useful-components/find-pacient/find.pacient.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    RatingModule,
    ModalModule,
    routing
  ],
  declarations: [
    MedicalTestComponent,
    GeneralMedicineTestComponent,
    TabComponent,
    TabsComponent,
    MedicalTestProcessTableComponent,
    FindPacientComponent
  ]
})
export default class MedicalTestModule {
}

