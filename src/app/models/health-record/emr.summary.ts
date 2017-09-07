import {Emr} from './../emr';
import {Catalog} from './../catalog';
import {LaboratoryTest} from './../medical-test/laboratory.test';

export class EmrSummary {

    /*Fields for send to APIs*/
    public code: string;
    public state: string;
    public createdAt: Date;
    public updatedAt: Date;
    public healthPlan: string;
    public psychologicalResult: string;
    public radiologyResult: string;
    public serologicalResult: string;
    public bloodType: string;
    public hemoglobin: string;
    public bloodCount: string;
    
    constructor () {
    }

    setInitialFields(emr: Emr, emrStateItemList: Array<Catalog>, currentHealthPlan: Catalog){
        this.code = emr.code;
        this.state = emrStateItemList.find(item => item.secondaryId == emr.stateId).name;
        this.createdAt = emr.createdAt;
        this.updatedAt = emr.updatedAt;
        this.healthPlan = currentHealthPlan.name;
    }

    setValuesOfLaboratoryTest(emr: Emr, emrStateItemList: Array<Catalog>, laboratory: LaboratoryTest){
        this.state = emrStateItemList.find(item => item.secondaryId == emr.stateId).name;
        /*
        this.serologicalResult= ;
        this.bloodType;
        this.hemoglobin;
        this.bloodCount;*/
    }
    
    setValuesOfRadiologyTest(){

    }
    setValuesOfPsychologicalTest(){

    }
}
