export class Emr {

    public id: number;
    public patientCode: number;
    public employeeCode: string;
    public code: string;
    public stateId: number;
    public createdAt: Date;
    public updatedAt: Date;
    public healthPlanId: number; 
    public healthPlanName: string;
    
    public isApplied : boolean;
    constructor () {
        this.isApplied = false;
        this.stateId = null;
    }

    existEmr(){
        return this.stateId != null ? true : false;
    }

    setFieldsDetail(emr: Emr){
        this.id = emr.id;
        this.employeeCode = emr.employeeCode;
        this.code = emr.code;
        this.stateId = emr.stateId;
        this.createdAt = emr.createdAt;
        this.updatedAt = emr.updatedAt;
        this.healthPlanId = emr.healthPlanId; 
        this.healthPlanName = emr.healthPlanName;
    }
}
