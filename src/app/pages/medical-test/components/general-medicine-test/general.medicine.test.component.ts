import { Component, Input, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Pacient} from '../../../../models/pacient';
import {Catalog} from '../../../../models/catalog';
import {PacientService} from '../../../../services/pacient.service';
import {CatalogService} from '../../../../services/catalog.service';

import {BasicTablesService} from './basicTables.service';

@Component({
	moduleId: module.id,
    selector: 'general-medicine',
    styles: [ require('../../../../theme/sass/_disabled.scss')
            , require ('../../../../pages/useful-components/medical-test-process-table/basicTables.scss')],
    templateUrl: './general-medicine-test.html',
    providers: [PacientService, CatalogService, BasicTablesService]
})

export class GeneralMedicineTestComponent implements OnInit{ 
    pageAddressTab: string = "/pages/medical-test/general-medicine-test";
    pacient : Pacient;
    pacientCode : number;
    existPacient: boolean;
    errorMessage: string;
    
    ngOnInit(){
        this.initilize();
    }

    initilize(){
        this.pacientCode = null;
        this.existPacient = true;
        this.errorMessage = null;
        this.pacient = new Pacient();
    }

    findPacientByCode(){
        
    }

    registerGeneralMedicineTest(){
         
    }

}