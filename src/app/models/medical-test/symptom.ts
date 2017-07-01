import * as moment from 'moment';
import {Utils} from './../utils';

export class Symptom {

	/*Fields for send to APIs*/
    public id: number;
	public typeId: number;
	public typeName: string;
	public cieId: number;
	public cieName: string;
	public appointment: Date;
	public observation: string;

	/*Fields for help to view logic*/
	public formattedDate: string;
    public isRegistered: boolean;
	public indexForEdit: number;
	
    constructor () {
		this.typeId = null;
		this.cieId = null;
		this.isRegistered = false;
		this.indexForEdit= null;
	}

	setFieldsDetail(symptom: Symptom){
		this.id = symptom.id;
		this.typeId = symptom.typeId;
		this.typeName = symptom.typeName;
		this.cieId = symptom.cieId;
		this.cieName = symptom.cieName;
		this.formattedDate = Utils.formatHourDate(symptom.appointment);
		this.appointment = symptom.appointment;
		this.observation = symptom.observation;
	}
}
