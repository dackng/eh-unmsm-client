import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { routing }       from './health.record.routing';

import { HealthRecordComponent } from './health.record.component';

import { TabComponent } from '../components-shared/component-tabbed/tab/tab.component';
import { TabsComponent } from '../components-shared/component-tabbed/tabs/tabs.component';

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
    HealthRecordComponent,
    TabComponent,
    TabsComponent,
    FindPatientComponent,
    SelectPatientTypeComponent
  ]
})
export class HealthRecordModule {
}

