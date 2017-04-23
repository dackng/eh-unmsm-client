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
    itemDefaultUbigeo : Ubigeo;
    
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
                    this.setPacientFields(pacient);
                    this.existPacient = true;
                    this.newPacient.addMedicalStatusItem();
                    this.newPacient.addEapItem();
                    this.newPacient.addUbigeoItems();
                }else{
                    this.existPacient = false;
                    this.newPacient.code = this.pacientCode;
                    this.itemDefaultUbigeo.initializeItemByDefault();
                    this.loadItemsLists();
                }
            }, error => this.errorMessage = <any> error);        
    }

    private loadItemsLists(){
        this.catalogService.getCivilStatusList()
            .subscribe( (civilStatusList : Array<Catalog> ) => {
                this.newPacient.civilStatusList = civilStatusList;
            }, error => this.errorMessage = <any> error);

        this.catalogService.getFirstMedicalStatus()
            .subscribe( (medicalStatus : Catalog ) => {
                this.newPacient.nameMedicalStatus = medicalStatus.name;
                this.newPacient.idMedicalStatus = medicalStatus.idSecondary;
            }, error => this.errorMessage = <any> error);

        this.catalogService.getEapList()
            .subscribe( (eapList : Array<Catalog> ) => {
                this.newPacient.eapList = eapList;
            }, error => this.errorMessage = <any> error);

        this.ubigeoService.getDepartmentsList()
            .subscribe( (departmentsList : Array<Ubigeo> ) => {
                this.newPacient.departmentsList = departmentsList;
                this.newPacient.addDeparmentItemByDefault(this.itemDefaultUbigeo);
                this.newPacient.provincesList = [];
                this.newPacient.addProvinceItemByDefault(this.itemDefaultUbigeo);
                this.newPacient.districtsList = [];
                this.newPacient.addDistrictItemByDefault(this.itemDefaultUbigeo);
            }, error => this.errorMessage = <any> error);
    }

    loadProvincesList(value){
        this.newPacient.ubigeo.departmentCode = value;
        this.ubigeoService.getProvincesListByDepartmentCode(this.newPacient.ubigeo.departmentCode)
            .subscribe( (provincesList : Array<Ubigeo>) => {
                this.newPacient.provincesList = provincesList;
                this.newPacient.addProvinceItemByDefault(this.itemDefaultUbigeo);
                this.newPacient.districtsList = [];
                this.newPacient.addDistrictItemByDefault(this.itemDefaultUbigeo);
            }, error => this.errorMessage = <any> error);
    }

    loadDistrictsList(value){
        this.newPacient.ubigeo.provinceCode = value;
        this.ubigeoService.getDistrictsListByProvinceCode(this.newPacient.ubigeo.provinceCode)
            .subscribe( (districtsList : Array<Ubigeo>) => {
                this.newPacient.districtsList = districtsList;
                this.newPacient.addDistrictItemByDefault(this.itemDefaultUbigeo);
            }, error => this.errorMessage = <any> error);
    }

    registerPacient(){
        if(this.newPacient.validateUbigeoCodes()){
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
        this.itemDefaultUbigeo = new Ubigeo();
    }

    setPacientFields(pacient: Pacient){
        this.newPacient.code = pacient.code;
        this.newPacient.names = pacient.names;
        this.newPacient.paternalSurname = pacient.paternalSurname;
        this.newPacient.maternalSurname = pacient.maternalSurname;
        this.newPacient.idCivilStatus = pacient.idCivilStatus;
        this.newPacient.nameCivilStatus = pacient.nameCivilStatus;
        this.newPacient.email =  pacient.email;
        this.newPacient.idMedicalStatus = pacient.idMedicalStatus;
        this.newPacient.nameMedicalStatus = pacient.nameMedicalStatus;
        this.newPacient.idEap = pacient.idEap;
        this.newPacient.nameEap = pacient.nameEap;
        this.newPacient.birthDate = pacient.birthDate;
        this.newPacient.telephone = pacient.telephone;
        this.newPacient.gender = pacient.gender;
        this.newPacient.ubigeo = pacient.ubigeo;
    }
}