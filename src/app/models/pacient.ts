import {Ubigeo} from './ubigeo';
import {Catalog} from './catalog';

export class Pacient {

    public code: number;
    public names: string;
    public paternalSurname: string;
    public maternalSurname: string;
    public civilStatusId: number;
    public civilStatusName: string;
    public email: string;
    public medicalStatusId: number;
    public medicalStatusName: string;
    public eapId: number;
    public eapName: string;
    public birthDate: Date;
    public telephone: number;
    public gender: string;
    public ubigeo: Ubigeo;
    public address : string;
    
    public civilStatusList : Array<Catalog>;
    public eapList : Array<Catalog>;
    public departmentsList : Array<Ubigeo>;
    public provincesList : Array<Ubigeo>;
    public districtsList : Array<Ubigeo>;
    public genderList: Array<Catalog>;

    constructor(){
        this.ubigeo = new Ubigeo();
        this.civilStatusList = [];
        this.eapList = [];
        this.departmentsList = [];
        this.provincesList = [];
        this.districtsList = [];
        this.initializeGenderList();
        this.eapId = null;
        this.civilStatusId = null;
        this.gender = null;
    }

    generateUbigeoCode(){
        this.ubigeo.joinCodes();
    }

    validateUbigeoCodes(){
        return this.ubigeo.validateCodes();
    }

    addMedicalStatusItem(){
        this.civilStatusList.push(new Catalog(this.civilStatusId, this.civilStatusName));
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

    addCivilStatusItemByDefault(){
       this.civilStatusList.push(new Catalog(null,"<SELECCIONE>")); 
    }
}
