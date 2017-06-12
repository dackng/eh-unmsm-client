import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Logger } from "angular2-logger/core";

import {Patient} from '../../../../models/patient';
import {Catalog} from '../../../../models/catalog';
import {Ubigeo} from '../../../../models/ubigeo';
import {Emr} from '../../../../models/emr';
import {Utils} from '../../../../models/utils';

import {PatientService} from '../../../../services/patient.service';
import {CatalogService} from '../../../../services/catalog.service';
import {UbigeoService} from '../../../../services/ubigeo.service';
import {EmrService} from '../../../../services/emr.service';

@Component({
    selector: 'register-patient',
    styleUrls: ['../../../../theme/sass/_disabled.scss'],
    templateUrl: './register-patient.html',
    providers: [Logger, PatientService, CatalogService, UbigeoService, EmrService]
})

export class RegisterPatientComponent implements OnInit{ 
    newPatient: Patient;
    emr: Emr;
    currentHealthPlan: Catalog;
    patientCode: number;
    isPatientExisting: boolean;
    errorMessage: string;
    ubigeoItemByDefault: Ubigeo;
    isGenderRadioDisabled: boolean;
    isFieldDisabled: boolean;
    isEmrConfirmationMessage: boolean;
    
    ngOnInit(){
        this.initilize();
    }

    constructor (private _logger: Logger, private _patientService: PatientService, private _catalogService : CatalogService
                , private _ubigeoService: UbigeoService, private _emrService: EmrService) {
        this._logger.warn("Constructor()");
        this._logger.warn("===== Calling method CATALOG API:  getCurrentHealthPlan() =====");
        this._catalogService.getCurrentHealthPlan()//loading the current health plan
            .subscribe( (catalog : Catalog ) => {
                this.currentHealthPlan = Utils.createCatalog(catalog.secondaryId, catalog.name);
                this._logger.warn("OUTPUT=> currentHealthPlan : " + JSON.stringify(this.currentHealthPlan));
            }, error => this.errorMessage = <any> error); 
    }

    findPatientByCode(){
        this.newPatient = new Patient();
        this.emr = new Emr();
        this.emr.healthPlanId = this.currentHealthPlan.secondaryId;
        this._catalogService.getGenderList()
            .subscribe( (genderList : Array<string> ) => {
                this.newPatient.genderList = genderList;
            }, error => this.errorMessage = <any> error);
        this._logger.warn("===== Calling method PATIENT API:  getPatientDetailByCode("+ this.patientCode +") =====");
        this._patientService.getPatientDetailByCode(this.patientCode)
            .subscribe( (patient : Patient )=> {            
                if(patient != null){
                    this._logger.warn("Patient already registered");
                    this.emr.patientCode = patient.code;
                    this._logger.warn("===== Calling EMR API: getEmrByHealthPlanIdAndPatientCode(" + this.emr.healthPlanId 
                    + ", " + this.emr.patientCode + ") =====");
                    this._emrService.getEmrByHealthPlanIdAndPatientCode(this.emr.healthPlanId,this.emr.patientCode)
                        .subscribe( (emr: Emr ) => {
                            if(emr != null){
                                this._logger.warn("Patient have an EMR registered");
                                this.emr.setFieldsDetail(emr);
                                this.isEmrConfirmationMessage = false;
                            }else{
                                this._logger.warn("Patient doesn't have an EMR");
                                this.isEmrConfirmationMessage = true;
                            }
                        }, error => this.errorMessage = <any> error);
                    this.newPatient.setFieldsDetail(patient);
                    this.isPatientExisting = true;
                    this.newPatient.addCivilStateItem();
                    this.newPatient.addEapItem();
                    this.newPatient.addUbigeoItems();
                    this.isGenderRadioDisabled = this.newPatient.isMale();
                }else{
                    this._logger.warn("Patient is not registered yet");
                    this.isEmrConfirmationMessage = true;
                    this.isPatientExisting = false;
                    this.emr.patientCode = this.patientCode;
                    this.newPatient.code = this.patientCode;
                    this.newPatient.ubigeo.changeToLima();
                    this.ubigeoItemByDefault.initializeItemByDefault();
                    this.loadItemsLists();
                    this.isGenderRadioDisabled = false;
                }
            }, error => this.errorMessage = <any> error);        
    }

    private loadItemsLists(){
        this._logger.warn("===== Calling method CATALOG API: getCivilStateList() =====");
        this._catalogService.getCivilStateList()
            .subscribe( (civilStateList : Array<Catalog> ) => {
                this.newPatient.civilStateList = civilStateList;
                this.newPatient.addCivilStateItemByDefault();
            }, error => this.errorMessage = <any> error);
        this._logger.warn("===== Calling method CATALOG API: getEapList() =====");
        this._catalogService.getEapList()
            .subscribe( (eapList : Array<Catalog> ) => {
                this.newPatient.eapList = eapList;
                this.newPatient.addEapItemByDefault();
            }, error => this.errorMessage = <any> error);
        this._logger.warn("===== Calling method UBIGEO API: getDepartmentsList() =====");
        this._ubigeoService.getDepartmentsList()
            .subscribe( (departmentsList : Array<Ubigeo> ) => {
                this.newPatient.departmentsList = departmentsList;
                this.newPatient.provincesList = [];
                this.loadProvincesList(this.newPatient.ubigeo.departmentCode);
                this.newPatient.districtsList = [];
                this.loadDistrictsList(this.newPatient.ubigeo.provinceCode);
            }, error => this.errorMessage = <any> error);
    }

    loadProvincesList(value){
        this.newPatient.ubigeo.departmentCode = value;
        this._ubigeoService.getProvincesListByDepartmentCode(this.newPatient.ubigeo.departmentCode)
            .subscribe( (provincesList : Array<Ubigeo>) => {
                this.newPatient.provincesList = provincesList;
                this.newPatient.addProvinceItemByDefault(this.ubigeoItemByDefault);
                this.newPatient.districtsList = [];
                this.newPatient.addDistrictItemByDefault(this.ubigeoItemByDefault);
            }, error => this.errorMessage = <any> error);
    }

    loadDistrictsList(value){
        this.newPatient.ubigeo.provinceCode = value;
        this._ubigeoService.getDistrictsListByProvinceCode(this.newPatient.ubigeo.provinceCode)
            .subscribe( (districtsList : Array<Ubigeo>) => {
                this.newPatient.districtsList = districtsList;
                this.newPatient.addDistrictItemByDefault(this.ubigeoItemByDefault);
            }, error => this.errorMessage = <any> error);
    }

    registerPatient(isFormValided : boolean){
        this.isFieldDisabled = true;
        if(isFormValided){
            if(!this.isPatientExisting){//if don't exist patient
                this.newPatient.generateUbigeoCode();
                this._logger.warn("===== Calling method PATIENT API: registerPatient(INPUT) =====");
                this._logger.warn("INPUT => Pacient: " + JSON.stringify(this.newPatient));
                this._patientService.registerPatient(this.newPatient)
                    .subscribe( patient => {
                        this._logger.warn("*****Pacient registered successful*****");
                        if(this.emr.isApplied){
                            this._catalogService.getFirstEmrState()
                            .subscribe( (emrState : Catalog ) => {
                                this.emr.stateId = emrState.secondaryId;
                                this._logger.warn("===== Calling method EMR API: registerEmr(INPUT) =====");
                                this._logger.warn("INPUT => EMR: " + JSON.stringify(this.emr));
                                this._emrService.registerEmr(this.emr)
                                    .subscribe( (emr: Emr ) => {
                                        this._logger.warn("OUTPUT => EMR registered successful");
                                        this.initilize();
                                }, error => this.errorMessage = <any> error);
                            }, error => this.errorMessage = <any> error);
                        }else{
                            this.initilize();
                        }
                    }, error => this.errorMessage = <any> error);
            }else if(this.emr.isApplied){//if exist patient and is emr applied 
                this._logger.warn("===== Calling method CATALOG API: getFirstEmrState() =====");
                this._catalogService.getFirstEmrState()
                    .subscribe( (emrState : Catalog ) => {
                        this.emr.stateId = emrState.secondaryId;
                        this._logger.warn("===== Calling method EMR API: registerEmr(INPUT) =====");
                        this._logger.warn("INPUT => EMR: " + JSON.stringify(this.emr));
                        this._emrService.registerEmr(this.emr)
                            .subscribe( (emr: Emr ) => {
                                this._logger.warn("OUTPUT => EMR registered successful");
                                this.initilize();
                            }, error => this.errorMessage = <any> error);
                    }, error => this.errorMessage = <any> error);
            }
        }
    }

    initilize(){
        this.patientCode = null;
        this.emr = new Emr();
        this.isPatientExisting = true;
        this.errorMessage = null;
        this.newPatient = new Patient();
        this.ubigeoItemByDefault = new Ubigeo();
        this.isGenderRadioDisabled = true;
        this.isFieldDisabled = false;
        this.isEmrConfirmationMessage = false;
    }

    
}