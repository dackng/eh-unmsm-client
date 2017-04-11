import { Routes, RouterModule }  from '@angular/router';

import { MedicalTestComponent } from './medical.test.component';
import { GeneralMedicineComponent } from './components/general-medicine/general.medicine.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: MedicalTestComponent,
    children: [
      { path: 'general-medicine', component: GeneralMedicineComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
