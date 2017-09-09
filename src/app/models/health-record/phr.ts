import {EmrSummary} from './emr.summary';
import {PatientSummary} from './patient.summary';
import {Emr} from './../emr';
import {Catalog} from './../catalog';

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
        this.patientSummary = phr.patientSummary;
        this.emrSummaryList = phr.emrSummaryList;
    }

    addFirstEmrSummary(emr: Emr, emrStateItemList: Array<Catalog>, currentHealthPlan: Catalog){
        this.emrSummary.setInitialFields(emr, emrStateItemList, currentHealthPlan);
        this.emrSummaryList.push(this.emrSummary);
    }
}
