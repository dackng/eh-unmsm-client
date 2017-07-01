import {Ubigeo} from './ubigeo';
import {Catalog} from './catalog';
import {Utils} from './utils';
import * as moment from 'moment';

export class Patient {

    /*Fields for send to APIs*/
    public id: number;
    public code: number;
    public names: string;
    public paternalSurname: string;
    public maternalSurname: string;
    public civilStateId: number;
    public email: string;
    public eapId: number;
    public birthDate: Date;
    public telephone: number;
    public gender: string;
    public ubigeo: Ubigeo;
    public address : string;

    /*Fields for help to view logic*/
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
        this.id = patient.id;
        this.code = patient.code;
        this.names = patient.names;
        this.paternalSurname = patient.paternalSurname;
        this.maternalSurname = patient.maternalSurname;
        this.civilStateId = patient.civilStateId;
        this.email =  patient.email;
        this.eapId = patient.eapId;
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
        this.gender = patient.gender;
        this.birthDate = patient.birthDate;
    }
}
