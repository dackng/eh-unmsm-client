import { Routes, RouterModule }  from '@angular/router';

import { AdmissionComponent } from './admission.component';
import { RegisterPacientComponent } from './components/register-pacient/registerPacient.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: AdmissionComponent,
    children: [
      { path: 'register-pacient', component: RegisterPacientComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
