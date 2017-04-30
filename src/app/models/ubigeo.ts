export class Ubigeo {

    public static LIMA_DEPARTMENT_CODE = "15";
    public static LIMA_PROVINCE_CODE = "01";

    public code: string;
    public departmentCode: string;
    public departmentDescription: string;  
    public provinceCode: string;
    public districtCode: string;
    public provinceDescription: string;
    public districtDescription: string;

    constructor(){
        this.code = null;
        this.provinceCode = null;
        this.districtCode = null;
    }

    changeToLima(){
        this.departmentCode = Ubigeo.LIMA_DEPARTMENT_CODE; //Department Code for LIMA
        this.provinceCode = Ubigeo.LIMA_PROVINCE_CODE;//Province Code for LIMA
    }

    isLima(){
        return this.departmentCode == Ubigeo.LIMA_DEPARTMENT_CODE 
                && this.provinceCode == Ubigeo.LIMA_PROVINCE_CODE ? true : false;
    }

    initializeItemByDefault(){
        this.provinceCode = null;
        this.provinceDescription = "<SELECCIONAR>";
        this.districtCode = null;
        this.districtDescription = "<SELECCIONAR>";
    }

    joinCodes(){
        this.code = this.departmentCode + this.provinceCode + this.districtCode;
    }

    validateCodes(){
        return this.departmentCode!=null && this.provinceCode!=null && this.districtCode!=null ? true : false;
    }
}
