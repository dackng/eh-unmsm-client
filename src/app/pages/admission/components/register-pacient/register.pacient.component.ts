import { Component, Input, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Pacient} from '../../../../models/pacient';
import {Catalog} from '../../../../models/catalog';
import {Ubigeo} from '../../../../models/ubigeo';
import {Emr} from '../../../../models/emr';
import {PacientService} from '../../../../services/pacient.service';
import {CatalogService} from '../../../../services/catalog.service';
import {UbigeoService} from '../../../../services/ubigeo.service';
import {EmrService} from '../../../../services/emr.service';

@Component({
    selector: 'register-pacient',
    styleUrls: ['../../../../theme/sass/_disabled.scss'],
    templateUrl: './register-pacient.html',
    providers: [PacientService, CatalogService, UbigeoService, EmrService]
})

export class RegisterPacientComponent implements OnInit{ 
    newPacient: Pacient;
    emr: Emr;
    currentHealthPlan: Catalog;
    pacientCode: number;
    isPacientExisting: boolean;
    errorMessage: string;
    ubigeoItemByDefault: Ubigeo;
    isGenderRadioDisabled: boolean;
    isFieldDisabled: boolean;
    isEmrConfirmationMessage: boolean;
    
    ngOnInit(){
        this.initilize();
    }

    constructor (private pacientService: PacientService, private catalogService : CatalogService
                , private ubigeoService: UbigeoService, private emrService: EmrService) {
        this.catalogService.getCurrentHealthPlan()//loading the current health plan
            .subscribe( (catalog : Catalog ) => {
                this.currentHealthPlan = new Catalog (catalog.secondaryId, catalog.name);
            }, error => this.errorMessage = <any> error); 
    }

    findPacientByCode(){
        this.newPacient = new Pacient();
        this.emr = new Emr();
        this.emr.healthPlanId = this.currentHealthPlan.secondaryId;
        this.catalogService.getGenderList()
            .subscribe( (genderList : Array<string> ) => {
                this.newPacient.genderList = genderList;
            }, error => this.errorMessage = <any> error);
        this.pacientService.getPacientByCode(this.pacientCode)
            .subscribe( (pacient : Pacient )=> {            
                if(pacient != null){
                    this.emr.pacientCode = pacient.code;
                    this.emrService.getEmrByHealthPlanIdAndPacientCode(this.emr.healthPlanId,this.emr.pacientCode)
                        .subscribe( (emr: Emr ) => {
                            if(emr != null){
                                this.setEmrFields(emr);
                                this.isEmrConfirmationMessage = false;
                            }else{
                                this.isEmrConfirmationMessage = true;
                            }
                        }, error => this.errorMessage = <any> error);
                    this.setPacientFields(pacient);
                    this.isPacientExisting = true;
                    this.newPacient.addCivilStateItem();
                    this.newPacient.addEapItem();
                    this.newPacient.addUbigeoItems();
                    this.isGenderRadioDisabled = this.newPacient.isMale();
                }else{
                    this.isEmrConfirmationMessage = true;
                    this.isPacientExisting = false;
                    this.emr.pacientCode = this.pacientCode;
                    this.newPacient.code = this.pacientCode;
                    this.newPacient.ubigeo.changeToLima();
                    this.ubigeoItemByDefault.initializeItemByDefault();
                    this.loadItemsLists();
                    this.isGenderRadioDisabled = false;
                }
            }, error => this.errorMessage = <any> error);        
    }

    private loadItemsLists(){
        this.catalogService.getCivilStateList()
            .subscribe( (civilStateList : Array<Catalog> ) => {
                this.newPacient.civilStateList = civilStateList;
                this.newPacient.addCivilStateItemByDefault();
            }, error => this.errorMessage = <any> error);

        this.catalogService.getEapList()
            .subscribe( (eapList : Array<Catalog> ) => {
                this.newPacient.eapList = eapList;
                this.newPacient.addEapItemByDefault();
            }, error => this.errorMessage = <any> error);

        this.ubigeoService.getDepartmentsList()
            .subscribe( (departmentsList : Array<Ubigeo> ) => {
                this.newPacient.departmentsList = departmentsList;
                this.newPacient.provincesList = [];
                this.loadProvincesList(this.newPacient.ubigeo.departmentCode);
                this.newPacient.districtsList = [];
                this.loadDistrictsList(this.newPacient.ubigeo.provinceCode);
            }, error => this.errorMessage = <any> error);
    }

    loadProvincesList(value){
        this.newPacient.ubigeo.departmentCode = value;
        this.ubigeoService.getProvincesListByDepartmentCode(this.newPacient.ubigeo.departmentCode)
            .subscribe( (provincesList : Array<Ubigeo>) => {
                this.newPacient.provincesList = provincesList;
                this.newPacient.addProvinceItemByDefault(this.ubigeoItemByDefault);
                this.newPacient.districtsList = [];
                this.newPacient.addDistrictItemByDefault(this.ubigeoItemByDefault);
            }, error => this.errorMessage = <any> error);
    }

    loadDistrictsList(value){
        this.newPacient.ubigeo.provinceCode = value;
        this.ubigeoService.getDistrictsListByProvinceCode(this.newPacient.ubigeo.provinceCode)
            .subscribe( (districtsList : Array<Ubigeo>) => {
                this.newPacient.districtsList = districtsList;
                this.newPacient.addDistrictItemByDefault(this.ubigeoItemByDefault);
            }, error => this.errorMessage = <any> error);
    }

    registerPacient(isFormValided : boolean){
        this.isFieldDisabled = true;
        if(isFormValided){
            if(!this.isPacientExisting){//if don't exist pacient
                this.newPacient.generateUbigeoCode();
                this.pacientService.registerPacient(this.newPacient)
                    .subscribe( pacient => {
                        if(this.emr.isApplied){
                            this.catalogService.getFirstEmrState()
                            .subscribe( (emrState : Catalog ) => {
                                this.emr.stateId = emrState.secondaryId;
                                this.emrService.registerEmr(this.emr)
                                    .subscribe( (emr: Emr ) => {
                                        this.initilize();
                                }, error => this.errorMessage = <any> error);
                            }, error => this.errorMessage = <any> error);
                        }else{
                            this.initilize();
                        }
                    }, error => this.errorMessage = <any> error);   
            }else if(this.emr.isApplied){//if exist pacient and is emr applied 
                this.catalogService.getFirstEmrState()
                    .subscribe( (emrState : Catalog ) => {
                        this.emr.stateId = emrState.secondaryId;
                        this.emrService.registerEmr(this.emr)
                            .subscribe( (emr: Emr ) => {
                                this.initilize();
                            }, error => this.errorMessage = <any> error);
                    }, error => this.errorMessage = <any> error);
            }
        }
    }

    initilize(){
        this.pacientCode = null;
        this.emr = new Emr();
        this.isPacientExisting = true;
        this.errorMessage = null;
        this.newPacient = new Pacient();
        this.ubigeoItemByDefault = new Ubigeo();
        this.isGenderRadioDisabled = true;
        this.isFieldDisabled = false;
        this.isEmrConfirmationMessage = false;
    }

    setPacientFields(pacient: Pacient){
        this.newPacient.code = pacient.code;
        this.newPacient.names = pacient.names;
        this.newPacient.paternalSurname = pacient.paternalSurname;
        this.newPacient.maternalSurname = pacient.maternalSurname;
        this.newPacient.civilStateId = pacient.civilStateId;
        this.newPacient.civilStateName = pacient.civilStateName;
        this.newPacient.email =  pacient.email;
        this.newPacient.eapId = pacient.eapId;
        this.newPacient.eapName = pacient.eapName;
        this.newPacient.setFormattedDate(pacient.birthDate);
        this.newPacient.telephone = pacient.telephone;
        this.newPacient.gender = pacient.gender;
        this.newPacient.address = pacient.address;
        this.newPacient.ubigeo = pacient.ubigeo;
    }

    setEmrFields(emr: Emr){
        this.emr.employeeCode = emr.employeeCode;
        this.emr.code = emr.code;
        this.emr.stateId = emr.stateId;
        this.emr.stateName = emr.stateName;
        this.emr.createdAt = emr.createdAt;
        this.emr.updatedAt = emr.updatedAt;
        this.emr.healthPlanId = emr.healthPlanId; 
        this.emr.healthPlanName = emr.healthPlanName;
    }
}