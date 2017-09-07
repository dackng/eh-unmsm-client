import {EmrSummary} from './emr.summary';
import {PatientSummary} from './patient.summary';
import {Emr} from './../emr';
import {Catalog} from './../catalog';

export class Phr {

    /*Fields for send to APIs*/
    public patientSummary : PatientSummary; 
    public emrSummary : EmrSummary;
    public emrList : Array<EmrSummary>;
    
    constructor () {
        this.emrList = [];
        this.patientSummary = new PatientSummary();
        this.emrSummary = new EmrSummary();
    }
}
