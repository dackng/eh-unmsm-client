import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { routing }       from './medical.test.routing';

import { MedicalTestComponent } from './medical.test.component';
import { GeneralMedicineTestComponent } from './components/general-medicine-test/general.medicine.test.component';
import { TabComponent } from '../useful-components/component-tabbed/tab/tab.component';
import { TabsComponent } from '../useful-components/component-tabbed/tabs/tabs.component';
import { MedicalTestProcessTableComponent } from '../useful-components/medical-test-process-table/medical.test.process.table.component';

import { FindPacientComponent } from '../useful-components/find-pacient/find.pacient.component';
import { SymptomModalComponent } from './components/general-medicine-test/symptom-modal/symptom.modal.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    NgbModalModule,
    routing
  ],
  declarations: [
    MedicalTestComponent,
    GeneralMedicineTestComponent,
    TabComponent,
    TabsComponent,
    MedicalTestProcessTableComponent,
    FindPacientComponent,
    SymptomModalComponent
  ],
  entryComponents: [
    SymptomModalComponent
  ]
})
export class MedicalTestModule {
}

