import {Symptom} from './symptom';
import * as moment from 'moment';
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
    public emrPatientCode: number;
    public emrHealthPlanId: number; 
    public symptomList: Array<Symptom>

    public formattedDate : string;
    
    constructor () {
        this.symptomList = [];
    }
    
    setFieldsDetail(generalMedicineTest: GeneralMedicineTest){
        this.employeeCode = generalMedicineTest.employeeCode;
        this.weight = generalMedicineTest.weight;
        this.stature = generalMedicineTest.stature;
        this.pulse = generalMedicineTest.pulse;
        this.setFormattedDate(generalMedicineTest.lmp);
        this.systolic = generalMedicineTest.systolic;
        this.diastolic = generalMedicineTest.diastolic;
        this.rightEye = generalMedicineTest.rightEye;
        this.leftEye = generalMedicineTest.leftEye;
        this.updatedAt = generalMedicineTest.updatedAt;
        this.isFinished = generalMedicineTest.isFinished;
        this.emrPatientCode = generalMedicineTest.emrPatientCode; 
        this.emrHealthPlanId = generalMedicineTest.emrHealthPlanId;
        this.symptomList = generalMedicineTest.symptomList;
    }

    setFormattedDate(date : Date){
        this.formattedDate = moment(date).format("DD/MM/YYYY");
    }

}
