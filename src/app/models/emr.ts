export class Emr {

    public pacientCode: number;
    public employeeCode: string;
    public code: string;
    public stateId: number;
    public stateName: string;
    public createdAt: Date;
    public updatedAt: Date;
    public healthPlanId: number; 
    public healthPlanName: string;
    
    public isApplied : boolean;
    constructor () {
        this.isApplied = false;
    }

    existEmr(){
        return this.stateId != null ? true : false;
    }
}
