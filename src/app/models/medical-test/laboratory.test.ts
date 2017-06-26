export class LaboratoryTest {

    public id: number;
	public employeeCode: string;
	public serologicalTestId: number;
	public hemoglobin: number;
	public hemoglobinStateId: number;
	public hemoglobinStateName;
	public bloodTypeId: number;
	public observation: string;
	public updatedAt: Date;
	public isFinished: boolean;
	public emrPatientCode: number;
	public emrHealthPlanId: number; 
    
    constructor () {}

	setFieldsDetail(laboratoryTest: LaboratoryTest){
        this.id = laboratoryTest.id;
		this.employeeCode = laboratoryTest.employeeCode;
        this.serologicalTestId = laboratoryTest.serologicalTestId;
		this.hemoglobin = laboratoryTest.hemoglobin;
		this.hemoglobinStateId = laboratoryTest.hemoglobinStateId;
		this.hemoglobinStateName = laboratoryTest.hemoglobinStateName;
		this.bloodTypeId = laboratoryTest.bloodTypeId;
		this.observation = laboratoryTest.observation;
        this.updatedAt = laboratoryTest.updatedAt;
        this.isFinished = laboratoryTest.isFinished;
        this.emrPatientCode = laboratoryTest.emrPatientCode; 
        this.emrHealthPlanId = laboratoryTest.emrHealthPlanId;
    }
}
