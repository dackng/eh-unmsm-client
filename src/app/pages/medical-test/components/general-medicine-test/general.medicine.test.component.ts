import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Pacient} from '../../../../models/pacient';
import {Catalog} from '../../../../models/catalog';
import {GeneralMedicineTest} from '../../../../models/medical-test/general.medicine.test';
import {Symptom} from '../../../../models/medical-test/symptom';
import {GeneralMedicineTestService} from '../../../../services/medical-test/general.medicine.test.service';
import {CatalogService} from '../../../../services/catalog.service';

import {BasicTablesService} from './basicTables.service';

import { ModalDirective } from 'ng2-bootstrap';

@Component({
    selector: 'general-medicine',
    styleUrls: ['../../../../theme/sass/_disabled.scss', 
                '../../../../theme/sass/_basicTables.scss',
                '../../../../theme/sass/_modals.scss'],
    templateUrl: './general-medicine-test.html',
    providers: [GeneralMedicineTestService, CatalogService, BasicTablesService]
})

export class GeneralMedicineTestComponent implements OnInit{ 
    pageAddressTab: string = "/pages/medical-test/general-medicine-test";
    generalMedicineTest: GeneralMedicineTest;
    symptom: Symptom;
    currentHealthPlan: Catalog;
    pacientCode: number;
    isPacientExisting: boolean;
    errorMessage: string; 
    
    peopleTableData:Array<any>;//para la tabla de ssintomas
    @ViewChild('addSymptomModal') addSymptomModal: ModalDirective;

    ngOnInit(){
        this.initilize();
    }

    constructor(private _basicTablesService: BasicTablesService
        , private catalogService: CatalogService) {
        this.peopleTableData = _basicTablesService.peopleTableData;
        this.catalogService.getCurrentHealthPlan()//loading the current health plan
            .subscribe( (catalog : Catalog ) => {
                this.currentHealthPlan = new Catalog (catalog.secondaryId, catalog.name);
        }, error => this.errorMessage = <any> error);
    }

    showAddSymptomModal(): void {
        this.addSymptomModal.config.backdrop = false;
        this.addSymptomModal.show();
    }

    hideAddSymptomModal(): void {
        this.addSymptomModal.hide();
    }

    receiveOutputExternal(pacient: Pacient){
        this.generalMedicineTest.emrPacientCode = pacient.code;
        this.generalMedicineTest.emrHealthPlanId = this.currentHealthPlan.secondaryId;
        console.log(this.generalMedicineTest.emrPacientCode);   
    }

    registerGeneralMedicineTest(){
         
    }

    initilize(){
        this.pacientCode = null;
        this.isPacientExisting = true;
        this.errorMessage = null;
        this.generalMedicineTest = new GeneralMedicineTest();
        this.symptom = new Symptom();
    }
}