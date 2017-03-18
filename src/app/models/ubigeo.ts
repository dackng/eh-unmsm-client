export class Ubigeo {

    public ubigeoCode: string;
    public departmentCode: string;
    public departmentDescription: string;  
    public provinceCode: string;
    public provinceDescription: string;
    public districtCode: string;
    public districtDescription: string;

    constructor(){
        this.ubigeoCode = null;
        this.departmentCode = null;
        this.provinceCode = null;
        this.districtCode = null;
    }

    initializeItemByDefault(){
        this.departmentCode = null;
        this.departmentDescription = "<SELECCIONAR>";
        this.provinceCode = null;
        this.provinceDescription = "<SELECCIONAR>";
        this.districtCode = null;
        this.districtDescription = "<SELECCIONAR>";
    }

    joinCodes(){
        this.ubigeoCode = this.departmentCode+this.provinceCode+this.districtCode;
    }

    validateCodes(){
        return this.departmentCode!=null && this.provinceCode!=null && this.districtCode!=null ? true: false;
    }
}
