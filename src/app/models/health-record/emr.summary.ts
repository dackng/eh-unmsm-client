import {Emr} from './../emr';
import {Catalog} from './../catalog';
import {LaboratoryTest} from './../medical-test/laboratory.test';
import {RadiologyTest} from './../medical-test/radiology.test';
import {PsychologicalTest} from './../medical-test/psychological.test';
import {Utils} from './../utils';
import {Constants} from './../constants';

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
    
    /*Fields for help to view logic*/
    public formattedCreateDate : string;
    public formattedUpdateDate : string;

    constructor () {
    }

    buildFields(emr: Emr, emrStateItemList: Array<Catalog>, currentHealthPlan: Catalog){
        this.code = emr.code;
        this.state = emrStateItemList.find(item => item.secondaryId == emr.stateId).name;
        this.createdAt = emr.createdAt;
        this.updatedAt = emr.updatedAt;
        this.healthPlan = currentHealthPlan.name;
    }

    setFieldsDetail(emrSummary: EmrSummary){
        this.code = emrSummary.code == null ? Constants.PENDING_UPDATE_DATE : emrSummary.code;
        this.state = emrSummary.state;
        this.createdAt = emrSummary.createdAt;
        this.updatedAt = emrSummary.updatedAt;
        this.healthPlan = emrSummary.healthPlan;
        this.psychologicalResult = emrSummary.psychologicalResult == null ? Constants.PENDING_UPDATE_DATE : emrSummary.psychologicalResult;
        this.radiologyResult = emrSummary.radiologyResult == null ? Constants.PENDING_UPDATE_DATE : emrSummary.radiologyResult;
        this.serologicalResult = emrSummary.serologicalResult == null ? Constants.PENDING_UPDATE_DATE : emrSummary.serologicalResult;
        this.bloodType = emrSummary.bloodType == null ? Constants.PENDING_UPDATE_DATE : emrSummary.bloodType;
        this.hemoglobin = emrSummary.hemoglobin == null ? Constants.PENDING_UPDATE_DATE : emrSummary.hemoglobin;
        this.bloodCount = emrSummary.bloodCount == null ? Constants.PENDING_UPDATE_DATE : emrSummary.bloodCount;
        this._validDates();
    }


    //this method set PENDING name if createdAt field is null and also format date
    private _validDates(){
        if (this.updatedAt == null) this.formattedUpdateDate = Constants.PENDING_UPDATE_DATE;
        else this.formattedUpdateDate = Utils.formatDate(this.updatedAt);
        this.formattedCreateDate = Utils.formatDate(this.createdAt);
    }
}