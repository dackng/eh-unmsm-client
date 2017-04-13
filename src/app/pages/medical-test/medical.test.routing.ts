import { Routes, RouterModule }  from '@angular/router';

import { MedicalTestComponent } from './medical.test.component';
import { GeneralMedicineTestComponent } from './components/general-medicine-test/general.medicine.test.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: MedicalTestComponent,
    children: [
      { path: 'general-medicine-test', component: GeneralMedicineTestComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
