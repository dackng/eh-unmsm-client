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
    }

    generateUbigeoCode(){
        this.ubigeo.joinCodes();
    }

    validateUbigeoCodes(){
        return this.ubigeo.validateCodes();
    }

    addMedicalStatusItem(){
        this.civilStatusList.push(this.getMedicalStatusItem());
    }

    addEapItem(){
        this.eapList.push(this.getEapItem());
    }

    addUbigeoItems(){
        this.departmentsList.push(this.ubigeo);
        this.provincesList.push(this.ubigeo);
        this.districtsList.push(this.ubigeo);
    }
    
    addDeparmentItemByDefault(item: Ubigeo){
        this.departmentsList.push(item);
        this.ubigeo.departmentCode = null;
    }

    addProvinceItemByDefault(item: Ubigeo){
        this.provincesList.push(item);
        this.ubigeo.provinceCode = null;
    }
    
    addDistrictItemByDefault(item: Ubigeo){
        this.districtsList.push(item);
        this.ubigeo.districtCode = null;
    }

    initializeGenderList(){
        this.genderList = [];
        this.genderList.push(new Catalog(null,""));//first index for Male
        this.genderList.push(new Catalog(null,""));//second index for Female
    }

    isMale():boolean{
        return this.gender == this.genderList[0].name ? true : false;
    }

    isFemale():boolean{
        return this.gender == this.genderList[1].name ? true : false;
    }

    private getMedicalStatusItem(): Catalog{
        return new Catalog(this.civilStatusId, this.civilStatusName);
    }

    private getEapItem(): Catalog{
        return new Catalog(this.eapId, this.eapName);
    }

}
