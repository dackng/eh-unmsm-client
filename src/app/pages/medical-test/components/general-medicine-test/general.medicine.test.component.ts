import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Logger } from "angular2-logger/core";

import {Patient} from '../../../../models/patient';
import {Catalog} from '../../../../models/catalog';
import {Emr} from '../../../../models/emr';
import {Utils} from '../../../../models/utils';
import {GeneralMedicineTest} from '../../../../models/medical-test/general.medicine.test';
import {Symptom} from '../../../../models/medical-test/symptom';
import {GeneralMedicineTestService} from '../../../../services/medical-test/general.medicine.test.service';
import {EmrService} from '../../../../services/emr.service';
import {CatalogService} from '../../../../services/catalog.service';

import {BasicTablesService} from '../../../../services/basicTables.service';

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
    isGeneralMedicineTestRegistered: boolean;
    isFieldDisabled: boolean;
    isModalInvalidated: boolean;
    errorMessage: string;
    symptomTypeItemList: Array<Catalog>;
    cieItemList: Array<Catalog>;
    @ViewChild('addSymptomModal') addSymptomModal: ModalDirective;

    ngOnInit(){
        this.initilize();
    }

    constructor(private _logger: Logger, private _basicTablesService: BasicTablesService, private _catalogService: CatalogService
        , private _emrService: EmrService, private _generalMedicineTestService: GeneralMedicineTestService) {
        this._logger.warn("Constructor()");
        let itemByDefault = Utils.getSelectItemByDefault();
        this._logger.warn("===== Calling method CATALOG API:  getCurrentHealthPlan() =====");
        this._catalogService.getCurrentHealthPlan()//loading the current health plan
            .subscribe( (catalog : Catalog ) => {
                this.currentHealthPlan = Utils.createCatalog(catalog.secondaryId, catalog.name);
                this._logger.warn("OUTPUT=> currentHealthPlan : " + JSON.stringify(this.currentHealthPlan));
        }, error => this.errorMessage = <any> error);
        this._catalogService.getSymptomTypeList()
            .subscribe( (symptomTypeItemList : Array<Catalog> ) => {
                this.symptomTypeItemList = symptomTypeItemList;
                this.symptomTypeItemList.push(itemByDefault);
                this._logger.warn("OUTPUT=> symptomTypeItemList : " + JSON.stringify(this.symptomTypeItemList));
        }, error => this.errorMessage = <any> error);
        this._catalogService.getCIEList()
            .subscribe( (cieItemList : Array<Catalog> ) => {
                this.cieItemList = cieItemList;
                this.cieItemList.push(itemByDefault);
                this._logger.warn("OUTPUT=> cieItemList : " + JSON.stringify(this.cieItemList));
        }, error => this.errorMessage = <any> error);
    }

    showAddSymptomModal(){
        console.log("MOSTRAR MODAL AGREGAR SINTOMA");
        this.addSymptomModal.config.backdrop = false;
        this.isModalInvalidated = false;
        this.symptom = new Symptom();
        this.addSymptomModal.show();
    }

    hideAddSymptomModal(){
        console.log("OCULTAR MODAL");
        this.addSymptomModal.hide();
    }

    //First, valid form then valid if symptom don't have index for edit because this depend for add or edit
    saveSymptomChanges(isFormValided : boolean){
        this.isModalInvalidated = true;
        console.log("GUARDAR CAMBIOS");
        if(isFormValided){
            this._findValueSelected();
            this.symptom.isRegistered = true;
            if(this.symptom.indexForEdit == null){
                console.log("AGREGAR SINTOMA");
                this._addSymptom();
            }else{
                console.log("EDITAR SINTOMA");
                this._editSymptom();
            }        
            this.hideAddSymptomModal();
        }
    }

    consultSymptom(index: number){
        console.log("CONSULTAR");
        console.log("INDEX=>"+index);
        console.log("symptomList=>"+JSON.stringify(this.generalMedicineTest.symptomList));
        this.addSymptomModal.config.backdrop = false;
        this.symptom = new Symptom();
        this.symptom.setFieldsSummary(this.generalMedicineTest.symptomList[index]);
        this.symptom.isRegistered = true;
        this.addSymptomModal.show();
    }

    showEditSymptomModal(index: number){
        console.log("MOSTRAR MODAL EDITAR")
        this.addSymptomModal.config.backdrop = false;
        this.symptom = new Symptom();
        this.symptom.isRegistered = false;
        this.isModalInvalidated = false;
        this.symptom.setFieldsDetail(this.generalMedicineTest.symptomList[index]);
        this.symptom.indexForEdit = index;
        this.addSymptomModal.show();
    }

    removeSymptom(symptom: Symptom){
        let index: number = this.generalMedicineTest.symptomList.indexOf(symptom);
        if (index !== -1) {
            this.generalMedicineTest.symptomList.splice(index, 1);
        }      
    }

    receiveOutputExternal(patient: Patient){
        this.validateEMRAndGeneralMedicineTestExistence(patient);   
    }

    validateEMRAndGeneralMedicineTestExistence(patient: Patient){
        this._logger.warn("===== Calling EMR API: getEmrByHealthPlanIdAndPatientCode(" + this.currentHealthPlan.secondaryId 
                    + ", " + patient.code + ") =====");
        this._emrService.getEmrByHealthPlanIdAndPatientCode(this.currentHealthPlan.secondaryId, patient.code)
            .subscribe( (emr: Emr) => {
                if (emr != null){
                    this._logger.warn("EMR already registered");
                    this._logger.warn("===== Calling GeneralMedicineTest API: getGeneralMedicineTestByHealthPlanIdAndPatientCode("
                            + this.currentHealthPlan.secondaryId + ", " + patient.code + ") =====");
                    this._generalMedicineTestService
                        .getGeneralMedicineTestByHealthPlanIdAndPatientCode(emr.healthPlanId, emr.patientCode)
                        .subscribe( (generalMedicineTest: GeneralMedicineTest) => {
                            if(generalMedicineTest != null){
                                this._logger.warn("GeneralMedicineTest already registered");
                                this.generalMedicineTest.setFieldsDetail(generalMedicineTest);
                            }else{
                                this._logger.warn("GeneralMedicineTest is not registered yet");
                                this.generalMedicineTest = new GeneralMedicineTest();
                                this.generalMedicineTest.emrHealthPlanId = this.currentHealthPlan.secondaryId;
                                this.generalMedicineTest.emrPatientCode = patient.code;
                                this.isGeneralMedicineTestRegistered = false;
                            }
                        }, error => this.errorMessage = <any> error);                        
                }else{
                    this._logger.warn("EMR doesn't be registered yet, should register EMR for this patient");
                }
            }, error => this.errorMessage = <any> error);
    }

    registerGeneralMedicineTest(){
        this.isFieldDisabled = true;
        this._logger.warn("===== Calling GeneralMedicineTest API: registerGeneralMedicineTest()");
        this._logger.warn("INPUT => GeneralMedicineTest: "+JSON.stringify(this.generalMedicineTest)); 
    }

    initilize(){
        this.patientCode = null;
        this.isGeneralMedicineTestRegistered = true;
        this.isFieldDisabled = false;
        this.errorMessage = null;
        this.generalMedicineTest = new GeneralMedicineTest();
        this.symptom = new Symptom();
    }

    //Find value item selected
    private _findValueSelected(){
        //let symptom = this.symptomTypeItemList.find(item => item.secondaryId == this.symptom.typeId);
        //this.symptom.typeName = symptom.name;
        for(let symptom of this.symptomTypeItemList){
            if(symptom.secondaryId == this.symptom.typeId){
                this.symptom.typeName = symptom.name;break;
            }
        }
    }

    private _addSymptom(){
        this.generalMedicineTest.symptomList.push(this.symptom);
    }
    
    private _editSymptom(){
        this.generalMedicineTest.symptomList[this.symptom.indexForEdit].setFieldsDetail(this.symptom);
        this.symptom.indexForEdit = null;
    }
}