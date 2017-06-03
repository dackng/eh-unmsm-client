import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Logger } from "angular2-logger/core";

import {Patient} from '../../../../models/patient';
import {Catalog} from '../../../../models/catalog';
import {Emr} from '../../../../models/emr';
import {GeneralMedicineTest} from '../../../../models/medical-test/general.medicine.test';
import {Symptom} from '../../../../models/medical-test/symptom';
import {GeneralMedicineTestService} from '../../../../services/medical-test/general.medicine.test.service';
import {EmrService} from '../../../../services/emr.service';
import {CatalogService} from '../../../../services/catalog.service';

import {BasicTablesService} from './basicTables.service';

import { ModalDirective } from 'ng2-bootstrap';

@Component({
    selector: 'general-medicine',
    styleUrls: ['../../../../theme/sass/_disabled.scss', 
                '../../../../theme/sass/_basicTables.scss',
                '../../../../theme/sass/_modals.scss'],
    templateUrl: './general-medicine-test.html',
    providers: [Logger, GeneralMedicineTestService, EmrService, CatalogService, BasicTablesService]
})

export class GeneralMedicineTestComponent implements OnInit{ 
    pageAddressTab: string = "/pages/medical-test/general-medicine-test";
    generalMedicineTest: GeneralMedicineTest;
    symptom: Symptom;
    currentHealthPlan: Catalog;
    patientCode: number;
    isPatientExisting: boolean;
    errorMessage: string; 
    
    peopleTableData:Array<any>;//para la tabla de ssintomas
    @ViewChild('addSymptomModal') addSymptomModal: ModalDirective;

    ngOnInit(){
        this.initilize();
    }

    constructor(private _logger: Logger, private _basicTablesService: BasicTablesService, private _catalogService: CatalogService
        , private _emrService: EmrService, private _generalMedicineTestService: GeneralMedicineTestService) {
        this.peopleTableData = _basicTablesService.peopleTableData;
        this._catalogService.getCurrentHealthPlan()//loading the current health plan
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

    receiveOutputExternal(patient: Patient){
        this._emrService.getEmrByHealthPlanIdAndPatientCode(this.currentHealthPlan.secondaryId, patient.code)
            .subscribe( (emr: Emr) => {
                if (emr != null){
                    this._generalMedicineTestService
                        .getGeneralMedicineTestByHealthPlanIdAndPatientCode(emr.healthPlanId, emr.patientCode)
                        .subscribe( (generalMedicineTest: GeneralMedicineTest) => {
                            if(generalMedicineTest != null){
                                this.generalMedicineTest.setFieldsDetail(generalMedicineTest);
                            }else{
                                this.generalMedicineTest = new GeneralMedicineTest();
                                this.generalMedicineTest.emrHealthPlanId = this.currentHealthPlan.secondaryId;
                                this.generalMedicineTest.emrPatientCode = patient.code;
                            }
                        }, error => this.errorMessage = <any> error);                        
                }else{
                    //enviar un mensaje que tiene que solicitar la activacion de emr
                }
            }, error => this.errorMessage = <any> error);   
    }

    registerGeneralMedicineTest(){
         
    }

    initilize(){
        this.patientCode = null;
        this.isPatientExisting = true;
        this.errorMessage = null;
        this.generalMedicineTest = new GeneralMedicineTest();
        this.symptom = new Symptom();
    }
}