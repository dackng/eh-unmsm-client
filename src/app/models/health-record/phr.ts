import {Emr} from './../emr';

export class Phr {

    /*Fields for send to APIs*/
    public id: number;
    public emrList : Array<Emr>;

    constructor () {
        this.emrList = [];
    }
}
