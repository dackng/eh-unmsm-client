import {Ubigeo} from './ubigeo';
import {Catalog} from './catalog';
import * as moment from 'moment';

export class Pacient {

    public code: number;
    public names: string;
    public paternalSurname: string;
    public maternalSurname: string;
    public civilStateId: number;
    public civilStateName: string;
    public email: string;
    public emrStateId: number;
    public emrStateName: string;
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
    public genderList: Array<Catalog>;
    public formattedDate : string;

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
    }

    generateUbigeoCode(){
        this.ubigeo.joinCodes();
    }

    validateUbigeoCodes(){
        return this.ubigeo.validateCodes();
    }

    addEmrStateItem(){
        this.civilStateList.push(new Catalog(this.civilStateId, this.civilStateName));
    }

    addEapItem(){
        this.eapList.push(new Catalog(this.eapId, this.eapName));
    }

    addEapItemByDefault(){
       this.eapList.push(new Catalog(null,"<SELECCIONE>")); 
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
        let item = new Catalog(null,"");
        this.genderList.push(item);//first index for Male
        this.genderList.push(item);//second index for Female
    }

    isMale():boolean{
        return this.gender == this.genderList[0].name ? true : false;
    }

    addCivilStateItemByDefault(){
       this.civilStateList.push(new Catalog(null,"<SELECCIONE>")); 
    }

    setFormattedDate(date : Date){
        this.formattedDate = moment(date).format("DD/MM/YYYY");
    }
}
