import { Routes, RouterModule }  from '@angular/router';

import { AdmissionComponent } from './admission.component';
import { RegisterPatientComponent } from './components/register-patient/register.patient.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: AdmissionComponent,
    children: [
      { path: 'register-patient', component: RegisterPatientComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
