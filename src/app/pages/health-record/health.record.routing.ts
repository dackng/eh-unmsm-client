import { Routes, RouterModule }  from '@angular/router';

import { HealthRecordComponent } from './health.record.component';
import { PHRComponent } from './components/phr/phr.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: HealthRecordComponent,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
