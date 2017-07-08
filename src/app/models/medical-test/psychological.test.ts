export class PsychologicalTest {

	/*Fields for send to APIs*/
	public id: number;
    public employeeCode: string;
	public depressionResult: number;
	public depressionStateId: number;
	public depressionStateName: string;
	public anxietyResult: number;
	public anxietyStateId: number;
	public anxietyStateName: string;
	public diagnosisId: number;
	public observation: string;
	public updatedAt: Date;
	public isFinished: boolean;
	public emrPatientCode: number;
	public emrHealthPlanId: number;
	
    constructor () {
		this.isFinished = true;
	}

	setFieldsDetail(psychologicalTest: PsychologicalTest){
		this.id = psychologicalTest.id;
		this.employeeCode = psychologicalTest.employeeCode;
		this.depressionResult = psychologicalTest.depressionResult;
		this.depressionStateId = psychologicalTest.depressionStateId;
		this.depressionStateName = psychologicalTest.depressionStateName;
		this.anxietyResult = psychologicalTest.anxietyResult;
		this.anxietyStateId = psychologicalTest.anxietyStateId;
		this.anxietyStateName = psychologicalTest.anxietyStateName;
		this.diagnosisId = psychologicalTest.diagnosisId;
		this.observation = psychologicalTest.observation;
		this.updatedAt = psychologicalTest.updatedAt;
		this.isFinished = psychologicalTest.isFinished;
		this.emrPatientCode = psychologicalTest.emrPatientCode;
		this.emrHealthPlanId = psychologicalTest.emrHealthPlanId;
	}
}
