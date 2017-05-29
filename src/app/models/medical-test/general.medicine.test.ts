import {Symptom} from './symptom';
export class GeneralMedicineTest {

    public employeeCode: string;
    public weight: number;
    public stature: number;
    public pulse: number;
    public lmp: Date;
    public systolic: number;
    public diastolic: number;
    public rightEye: number;
    public leftEye: number;
    public updatedAt: Date;
    public isFinished: boolean;
    public emrPacientCode: number;
    public emrHealthPlanId: number; 
    public symptomList: Array<Symptom>
    
    constructor () {
        this.symptomList = [];
    }
}
