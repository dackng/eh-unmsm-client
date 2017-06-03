import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { routing }       from './medical.test.routing';

import { MedicalTestComponent } from './medical.test.component';
import { GeneralMedicineTestComponent } from './components/general-medicine-test/general.medicine.test.component';
import { TabComponent } from '../components-shared/component-tabbed/tab/tab.component';
import { TabsComponent } from '../components-shared/component-tabbed/tabs/tabs.component';
import { MedicalTestProcessTableComponent } from '../components-shared/medical-test-process-table/medical.test.process.table.component';

import { FindPatientComponent } from '../components-shared/find-patient/find.patient.component';
import { SelectPatientTypeComponent } from '../components-shared/select-patient-type/select.patient.type.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    NgaModule,
    ModalModule,
    AppTranslationModule,
    CustomFormsModule,
    routing
  ],
  declarations: [
    MedicalTestComponent,
    GeneralMedicineTestComponent,
    TabComponent,
    TabsComponent,
    MedicalTestProcessTableComponent,
    FindPatientComponent,
    SelectPatientTypeComponent
  ]
})
export class MedicalTestModule {
}

