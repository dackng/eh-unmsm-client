import {Component} from '@angular/core';

import {BasicTablesService} from '../../../pages/medical-test/components/general-medicine-test/basicTables.service';

@Component({
  selector: 'medical-test-process-table',
  template: require('./medical-test-process-table.html')
})
export class MedicalTestProcessTable {

  peopleTableData:Array<any>;

  constructor(private _basicTablesService: BasicTablesService) {
    this.peopleTableData = _basicTablesService.peopleTableData;
  }
}
