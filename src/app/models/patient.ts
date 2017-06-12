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

    public civilStateList : Array<Catalog>;
    public eapList : Array<Catalog>;
    public departmentsList : Array<Ubigeo>;
    public provincesList : Array<Ubigeo>;
    public districtsList : Array<Ubigeo>;
    public genderList: Array<string>;
    public formattedDate : string;
    public healthPlanId : number;

    constructor(){
        this.ubigeo = new Ubigeo();
        this.civilStateList = [];
        this.eapList = [];
        this.departmentsList = [];
        this.provincesList = [];
        this.districtsList = [];
        this.initializeGenderList();
        this.eapId = null;
        this.civilStateId = null;
        this.gender = null;
        this.healthPlanId = null;
    }

    generateUbigeoCode(){
        this.ubigeo.joinCodes();
    }

    validateUbigeoCodes(){
        return this.ubigeo.validateCodes();
    }

    addCivilStateItem(){
        this.civilStateList.push(Utils.createCatalog(this.civilStateId, this.civilStateName));
    }

    addEapItem(){
        this.eapList.push(Utils.createCatalog(this.eapId, this.eapName));
    }

    addEapItemByDefault(){
       this.eapList.push(Utils.getSelectItemByDefault()); 
    }

    addUbigeoItems(){
        this.departmentsList.push(this.ubigeo);
        this.provincesList.push(this.ubigeo);
        this.districtsList.push(this.ubigeo);
    }

    addProvinceItemByDefault(item: Ubigeo){
        if(!this.ubigeo.isLima()){
            this.provincesList.push(item);
            this.ubigeo.provinceCode = null;
        }
    }
    
    addDistrictItemByDefault(item: Ubigeo){
        this.districtsList.push(item);
        this.ubigeo.districtCode = null;
    }

    initializeGenderList(){
        this.genderList = [];
        this.genderList.push('');//first index for Male
        this.genderList.push('');//second index for Female
    }

    isMale():boolean{
        return this.gender == this.genderList[0].toString() ? true : false;
    }

    addCivilStateItemByDefault(){
       this.civilStateList.push(Utils.getSelectItemByDefault()); 
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
