import {Ubigeo} from './../ubigeo';
import {Catalog} from './../catalog';
import {Utils} from './../utils';
import {Constants} from './../constants';
import {Patient} from './../patient';
import * as moment from 'moment';

export class PatientSummary {

    /*Fields for send to APIs*/
    public code: number;
    public names: string;
    public paternalSurname: string;
    public maternalSurname: string;
    public civilState: string;
    public email: string;
    public eap: string;
    public birthDate: Date;
    public telephone: number;
    public gender: string;
    public address : string;
    public ubigeo: Ubigeo;

    /*Fields for help to view logic*/
    public formattedDate : string;
    public fullname: string;

    constructor(){
        this.ubigeo = new Ubigeo();
    }

    setFields(patient: Patient, civilStateItemList : Array<Catalog>, eapItemList : Array<Catalog>
    , departmentItemList : Array<Ubigeo>, provinceItemList : Array<Ubigeo>
    , districtItemList : Array<Ubigeo>, genderItemList: Array<string>){
        this.code = patient.code;
        this.names = patient.names;
        this.paternalSurname = patient.paternalSurname;
        this.maternalSurname = patient.maternalSurname;
        this.civilState = civilStateItemList.find(item => item.secondaryId == patient.civilStateId).name;
        this.email = patient.email;
        this.eap = eapItemList.find(item => item.secondaryId == patient.eapId).name;
        this.formattedDate = Utils.formatDate(patient.birthDate);
        this.telephone = patient.telephone;
        this.gender = Utils.isMaleGender(Constants.GENDER_MALE_API, patient.gender) ? Constants.GENDER_MALE_VIEW : Constants.GENDER_FEMALE_VIEW;
        this.address = patient.address;
        this.ubigeo.findValuesSelected(patient.ubigeo, departmentItemList, provinceItemList, districtItemList);
        this.getFullName();
    }
    
    getFullName(){
        this.fullname = this.paternalSurname + " " + this.maternalSurname + ", " + this.names;  
    }
}
