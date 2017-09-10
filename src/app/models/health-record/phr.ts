import {EmrSummary} from './emr.summary';
import {PatientSummary} from './patient.summary';
import {Emr} from './../emr';
import {Catalog} from './../catalog';
import {Utils} from './../utils';

export class Phr {

    /*Fields for send to APIs*/
    public patientSummary : PatientSummary; 
    public emrSummary : EmrSummary;
    public emrSummaryList : Array<EmrSummary>;
    
    constructor () {
        this.emrSummaryList = [];
        this.patientSummary = new PatientSummary();
        this.emrSummary = new EmrSummary();
    }

    setFields(phr: Phr){
        this.patientSummary.setFields(phr.patientSummary);
        this._completeFields(phr.emrSummaryList);
    }

    addFirstEmrSummary(emr: Emr, emrStateItemList: Array<Catalog>, currentHealthPlan: Catalog){
        this.emrSummary.buildFields(emr, emrStateItemList, currentHealthPlan);
        this.emrSummaryList.push(this.emrSummary);
    }

    //This method complete names for ui
    private _completeFields(emrSummaryList: Array<EmrSummary>){
        let emrSummary;
        for (let _i = 0; _i < emrSummaryList.length; _i++){
             emrSummary = new EmrSummary();
             emrSummary.setFieldsDetail(emrSummaryList[_i]);
             this.emrSummaryList.push(emrSummary);
        }
    }
}
