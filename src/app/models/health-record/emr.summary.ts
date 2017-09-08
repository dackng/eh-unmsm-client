import {Emr} from './../emr';
import {Catalog} from './../catalog';
import {LaboratoryTest} from './../medical-test/laboratory.test';
import {RadiologyTest} from './../medical-test/radiology.test';
import {PsychologicalTest} from './../medical-test/psychological.test';

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

    setFieldsDetail(emrSummary: EmrSummary){
        this.code = emrSummary.code;
        this.state = emrSummary.state;
        this.createdAt = emrSummary.createdAt;
        this.updatedAt = emrSummary.updatedAt;
        this.healthPlan = emrSummary.healthPlan;
        this.psychologicalResult = emrSummary.psychologicalResult;
        this.radiologyResult = emrSummary.radiologyResult;
        this.serologicalResult = emrSummary.serologicalResult;
        this.bloodType = emrSummary.bloodType;
        this.hemoglobin = emrSummary.hemoglobin;
        this.bloodCount = emrSummary.bloodCount;
    }
}