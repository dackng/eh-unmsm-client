import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Pacient} from '../../../../models/pacient';
import {Catalog} from '../../../../models/catalog';
import {PacientService} from '../../../../services/pacient.service';
import {CatalogService} from '../../../../services/catalog.service';

import {BasicTablesService} from './basicTables.service';

import { ModalDirective } from 'ng2-bootstrap';

@Component({
	moduleId: module.id,
    selector: 'general-medicine',
    styles: [ require('../../../../theme/sass/_disabled.scss')
            , require ('../../../../theme/sass/_basicTables.scss')
            , require ('../../../../theme/sass/_modals.scss')],
    templateUrl: './general-medicine-test.html',
    providers: [PacientService, CatalogService, BasicTablesService]
})

export class GeneralMedicineTestComponent implements OnInit{ 
    pageAddressTab: string = "/pages/medical-test/general-medicine-test";
    pacient : Pacient;
    pacientCode : number;
    existPacient: boolean;
    errorMessage: string;
    @ViewChild('addSymptomModal') addSymptomModal: ModalDirective; 
    
    peopleTableData:Array<any>;//para la tabla de sintomas

    constructor(private _basicTablesService: BasicTablesService) {//para la tabla de sintomas
        this.peopleTableData = _basicTablesService.peopleTableData;
    }

    ngOnInit(){
        this.initilize();
    }

    showAddSymptomModal(): void {
        this.addSymptomModal.show();
    }

    hideAddSymptomModal(): void {
        this.addSymptomModal.hide();
    }

    initilize(){
        this.pacientCode = null;
        this.existPacient = true;
        this.errorMessage = null;
        this.pacient = new Pacient();
    }

    recibiendo(pacient: Pacient){
        this.pacient = new Pacient();
        this.pacient.code=pacient.code;
        console.log(this.pacient.code);    
    }

    registerGeneralMedicineTest(){
         
    }

}