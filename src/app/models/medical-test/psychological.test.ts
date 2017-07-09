import {Catalog} from './../catalog';

export class PsychologicalTest {

	/*Fields for send to APIs*/
	public id: number;
    public employeeCode: string;
	public depressionResult: number;
	public depressionStateId: number;
	public anxietyResult: number;
	public anxietyStateId: number;
	public diagnosisId: number;
	public observation: string;
	public updatedAt: Date;
	public isFinished: boolean;
	public emrPatientCode: number;
	public emrHealthPlanId: number;

	/*Fields for help to view logic*/
	public depressionStateItemList: Array<Catalog>;
	public anxietyStateItemList: Array<Catalog>;

    constructor () {
		this.isFinished = true;
		this.diagnosisId = null;
	}

	setFieldsDetail(psychologicalTest: PsychologicalTest){
		this.id = psychologicalTest.id;
		this.employeeCode = psychologicalTest.employeeCode;
		this.depressionResult = psychologicalTest.depressionResult;
		this.depressionStateId = psychologicalTest.depressionStateId;
		this.anxietyResult = psychologicalTest.anxietyResult;
		this.anxietyStateId = psychologicalTest.anxietyStateId;
		this.diagnosisId = psychologicalTest.diagnosisId;
		this.observation = psychologicalTest.observation;
		this.updatedAt = psychologicalTest.updatedAt;
		this.isFinished = psychologicalTest.isFinished;
		this.emrPatientCode = psychologicalTest.emrPatientCode;
		this.emrHealthPlanId = psychologicalTest.emrHealthPlanId;
	}
	/*
	HAMILTON DEPRESSION RATING SCALE
	- not depressed:  0-7 
	- light/less depression: 8-13 
	- moderate depression: 14-18
	- severe depression: 19-22
	- very severe depression: >23
	Info: http://www.meiga.info/escalas/depresion-escala-hamilton.pdf
	 */
	evaluateDepressionStateByHamilton(){
		if(this.depressionResult < 8){
			this.depressionStateId = this.depressionStateItemList[0].secondaryId;
		}else if(this.depressionResult > 7 && this.depressionResult < 14){
			this.depressionStateId = this.depressionStateItemList[1].secondaryId;
		}else if(this.depressionResult > 13 && this.depressionResult < 19){
			this.depressionStateId = this.depressionStateItemList[2].secondaryId;
		}else if(this.depressionResult > 18 && this.depressionResult < 23){
			this.depressionStateId = this.depressionStateItemList[3].secondaryId;
		}else {
			this.depressionStateId = this.depressionStateItemList[4].secondaryId;
		}
	}

	/*
	HAMILTON ANXIETY RATING SCALE
	- no/minimal ≤ 7  
	- mild anxiety = 8–14; 
	- moderate = 15–23;
 	- severe ≥ 24 
	Info: http://onlinelibrary.wiley.com/doi/10.1002/mpr.323/abstract
	 */
	evaluateAnxietyStateByHamilton(){
		if(this.anxietyResult < 8){
			this.anxietyStateId = this.anxietyStateItemList[0].secondaryId;
		}else if(this.anxietyResult >7 && this.anxietyResult < 15){
			this.anxietyStateId = this.anxietyStateItemList[1].secondaryId;
		}else if(this.anxietyResult >14 && this.anxietyResult < 24){
			this.anxietyStateId = this.anxietyStateItemList[2].secondaryId;
		}else {
			this.anxietyStateId = this.anxietyStateItemList[3].secondaryId;
		}
	}
}
