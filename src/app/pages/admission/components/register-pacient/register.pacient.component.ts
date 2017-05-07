import { Component, Input, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Pacient} from '../../../../models/pacient';
import {Catalog} from '../../../../models/catalog';
import {Ubigeo} from '../../../../models/ubigeo';
import {PacientService} from '../../../../services/pacient.service';
import {CatalogService} from '../../../../services/catalog.service';
import {UbigeoService} from '../../../../services/ubigeo.service';

@Component({
    selector: 'register-pacient',
    styleUrls: ['../../../../theme/sass/_disabled.scss'],
    templateUrl: './register-pacient.html',
    providers: [PacientService, CatalogService, UbigeoService]
})

export class RegisterPacientComponent implements OnInit{ 
    newPacient : Pacient;
    pacientCode : number;
    existPacient: boolean;
    errorMessage: string;
    ubigeoItemByDefault : Ubigeo;
    genderRadioDisabled : boolean;
    submittedDisabled : boolean;
    applyMedicalTest: boolean;

    ngOnInit(){
        this.initilize();
    }

    constructor (private pacientService: PacientService, private catalogService : CatalogService
                , private ubigeoService: UbigeoService) {}

    findPacientByCode(){
        this.newPacient = new Pacient();
        this.catalogService.getGenderList()
            .subscribe( (genderList : Array<Catalog> ) => {
                this.newPacient.genderList = genderList;
            }, error => this.errorMessage = <any> error);
        
        this.pacientService.getPacientByCode(this.pacientCode)
            .subscribe( (pacient : Pacient )=> {            
                if(pacient != null){
                    //this.emrService.getEmrByPacientCode(this.pacientCode)
                    this.setPacientFields(pacient);
                    this.existPacient = true;
                    this.newPacient.addMedicalStatusItem();
                    this.newPacient.addEapItem();
                    this.newPacient.addUbigeoItems();
                    this.genderRadioDisabled = this.newPacient.isMale();
                }else{
                    this.existPacient = false;
                    this.newPacient.code = this.pacientCode;
                    this.newPacient.ubigeo.changeToLima();
                    this.ubigeoItemByDefault.initializeItemByDefault();
                    this.loadItemsLists();
                    this.genderRadioDisabled = false;
                }
            }, error => this.errorMessage = <any> error);        
    }

    private loadItemsLists(){
        this.catalogService.getCivilStatusList()
            .subscribe( (civilStatusList : Array<Catalog> ) => {
                this.newPacient.civilStatusList = civilStatusList;
                this.newPacient.addCivilStatusItemByDefault();
            }, error => this.errorMessage = <any> error);

        this.catalogService.getFirstMedicalStatus()
            .subscribe( (medicalStatus : Catalog ) => {
                this.newPacient.medicalStatusName = medicalStatus.name;
                this.newPacient.medicalStatusId = medicalStatus.secondaryId;
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

    registerPacient(){
        this.submittedDisabled = true;
        if(this.applyMedicalTest){
            //call insert emr record
        }
        if(!this.existPacient){//if don't exist pacient
            this.newPacient.generateUbigeoCode();
            this.pacientService.registerPacient(this.newPacient)
                .subscribe( pacient => {
                    this.initilize();
                }, error => this.errorMessage = <any> error);    
        }
    }

    initilize(){
        this.pacientCode = null;
        this.existPacient = true;
        this.errorMessage = null;
        this.newPacient = new Pacient();
        this.ubigeoItemByDefault = new Ubigeo();
        this.genderRadioDisabled = true;
        this.submittedDisabled = false;
        this.applyMedicalTest = false;
    }

    setPacientFields(pacient: Pacient){
        this.newPacient.code = pacient.code;
        this.newPacient.names = pacient.names;
        this.newPacient.paternalSurname = pacient.paternalSurname;
        this.newPacient.maternalSurname = pacient.maternalSurname;
        this.newPacient.civilStatusId = pacient.civilStatusId;
        this.newPacient.civilStatusName = pacient.civilStatusName;
        this.newPacient.email =  pacient.email;
        this.newPacient.medicalStatusId = pacient.medicalStatusId;
        this.newPacient.medicalStatusName = pacient.medicalStatusName;
        this.newPacient.eapId = pacient.eapId;
        this.newPacient.eapName = pacient.eapName;
        this.newPacient.setFormattedDate(pacient.birthDate);
        this.newPacient.telephone = pacient.telephone;
        this.newPacient.gender = pacient.gender;
        this.newPacient.address = pacient.address;
        this.newPacient.ubigeo = pacient.ubigeo;
    }
}