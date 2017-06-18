import {Ubigeo} from './ubigeo';
import {Catalog} from './catalog';
import {Utils} from './utils';
import * as moment from 'moment';

export class Patient {

    public code: number;
    public names: string;
    public paternalSurname: string;
    public maternalSurname: string;
    public civilStateId: number;
    public civilStateName: string;
    public email: string;
    public eapId: number;
    public eapName: string;
    public birthDate: Date;
    public telephone: number;
    public gender: string;
    public ubigeo: Ubigeo;
    public address : string;

    public genderList: Array<string>;
    public formattedDate : string;

    constructor(){
        this.ubigeo = new Ubigeo();
        this.eapId = null;
        this.civilStateId = null;
        this.gender = null;
    }

    generateUbigeoCode(){
        this.ubigeo.joinCodes();
    }

    validateUbigeoCodes(){
        return this.ubigeo.validateCodes();
    }

    setFieldsDetail(patient: Patient){
        this.code = patient.code;
        this.names = patient.names;
        this.paternalSurname = patient.paternalSurname;
        this.maternalSurname = patient.maternalSurname;
        this.civilStateId = patient.civilStateId;
        this.civilStateName = patient.civilStateName;
        this.email =  patient.email;
        this.eapId = patient.eapId;
        this.eapName = patient.eapName;
        this.formattedDate = Utils.formatDate(patient.birthDate);
        this.telephone = patient.telephone;
        this.gender = patient.gender;
        this.address = patient.address;
        this.ubigeo = patient.ubigeo;
    }

    setFieldsSummary(patient: Patient){
        this.code = patient.code;
        this.names = patient.names;
        this.paternalSurname = patient.paternalSurname;
        this.maternalSurname = patient.maternalSurname;
    }
}
