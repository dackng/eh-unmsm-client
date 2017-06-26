import {Symptom} from './symptom';
import {Catalog} from './../catalog';
import {Utils} from './../utils';

export class GeneralMedicineTest {

    public id: number;
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
    public symptoms: Array<Symptom>

    public formattedDate : string;
    constructor () {
        this.symptoms = [];
    }
    
    setFieldsDetail(generalMedicineTest: GeneralMedicineTest){
        this.id = generalMedicineTest.id;
        this.employeeCode = generalMedicineTest.employeeCode;
        this.weight = generalMedicineTest.weight;
        this.stature = generalMedicineTest.stature;
        this.pulse = generalMedicineTest.pulse;
        this.lmp = generalMedicineTest.lmp;
        this.formattedDate = Utils.formatDate(generalMedicineTest.lmp);
        this.systolic = generalMedicineTest.systolic;
        this.diastolic = generalMedicineTest.diastolic;
        this.rightEye = generalMedicineTest.rightEye;
        this.leftEye = generalMedicineTest.leftEye;
        this.updatedAt = generalMedicineTest.updatedAt;
        this.isFinished = generalMedicineTest.isFinished;
        this.emrPatientCode = generalMedicineTest.emrPatientCode; 
        this.emrHealthPlanId = generalMedicineTest.emrHealthPlanId;
        this.symptoms = generalMedicineTest.symptoms;
    }
    
    //This method set typeName and format the appointment for each symptom
    completeFields(symptomTypeItemList: Array<Catalog>){
        for (let _i = 0; _i < this.symptoms.length; _i++) {
             let symptomFound = symptomTypeItemList.find(item => item.secondaryId == this.symptoms[_i].typeId);
             this.symptoms[_i].typeName = symptomFound.name;
             this.symptoms[_i].formattedDate = Utils.formatHourDate(this.symptoms[_i].appointment);
        }
    }
}