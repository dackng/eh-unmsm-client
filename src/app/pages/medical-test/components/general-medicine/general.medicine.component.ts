import { Component, Input, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Pacient} from '../../../../models/pacient';
import {Catalog} from '../../../../models/catalog';
import {PacientService} from '../../../../services/pacient.service';
import {CatalogService} from '../../../../services/catalog.service';

@Component({
	moduleId: module.id,
    selector: 'general-medicine',
    styles: [ require('../../../../theme/sass/_disabled.scss')],
    templateUrl: './general-medicine.html',
    providers: [PacientService, CatalogService]
})

export class GeneralMedicineComponent implements OnInit{ 
  ngOnInit(){
        
    }
}