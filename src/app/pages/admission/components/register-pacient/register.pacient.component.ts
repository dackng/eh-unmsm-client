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
    applyEmr: boolean;

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
                    this.newPacient.addEmrStateItem();
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
        this.catalogService.getCivilStateList()
            .subscribe( (civilStateList : Array<Catalog> ) => {
                this.newPacient.civilStateList = civilStateList;
                this.newPacient.addCivilStateItemByDefault();
            }, error => this.errorMessage = <any> error);

        this.catalogService.getFirstEmrState()
            .subscribe( (emrState : Catalog ) => {
                this.newPacient.emrStateName = emrState.name;
                this.newPacient.emrStateId = emrState.secondaryId;
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
        if(this.applyEmr){
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
        this.applyEmr = false;
    }

    setPacientFields(pacient: Pacient){
        this.newPacient.code = pacient.code;
        this.newPacient.names = pacient.names;
        this.newPacient.paternalSurname = pacient.paternalSurname;
        this.newPacient.maternalSurname = pacient.maternalSurname;
        this.newPacient.civilStateId = pacient.civilStateId;
        this.newPacient.civilStateName = pacient.civilStateName;
        this.newPacient.email =  pacient.email;
        this.newPacient.emrStateId = pacient.emrStateId;
        this.newPacient.emrStateName = pacient.emrStateName;
        this.newPacient.eapId = pacient.eapId;
        this.newPacient.eapName = pacient.eapName;
        this.newPacient.setFormattedDate(pacient.birthDate);
        this.newPacient.telephone = pacient.telephone;
        this.newPacient.gender = pacient.gender;
        this.newPacient.address = pacient.address;
        this.newPacient.ubigeo = pacient.ubigeo;
    }
}