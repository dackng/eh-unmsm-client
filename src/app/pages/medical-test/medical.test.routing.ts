import { Routes, RouterModule }  from '@angular/router';

import { MedicalTestComponent } from './medical.test.component';
import { GeneralMedicineTestComponent } from './components/general-medicine-test/general.medicine.test.component';
import { LaboratoryTestComponent } from './components/laboratory-test/laboratory.test.component';
import { RadiologyTestComponent } from './components/radiology-test/radiology.test.component';
import { PsychologicalTestComponent } from './components/psychological-test/psychological.test.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: MedicalTestComponent,
    children: [
      { path: 'general-medicine-test', component: GeneralMedicineTestComponent },
      { path: 'laboratory-test', component: LaboratoryTestComponent },
      { path: 'radiology-test', component: RadiologyTestComponent },
      { path: 'psychological-test', component: PsychologicalTestComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
