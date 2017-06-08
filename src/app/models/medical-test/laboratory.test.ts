export class LaboratoryTest {

    public employeeCode: string;
	public serologicalTestId: number;
	public hemoglobin: number;
	public hemoglobinStateId: number;
	public bloodCountId: number;
	public observation: string;
	public updatedAt: Date;
	public isFinished: boolean;
	public emrPatientCode: number;
	public emrHealthPlanId: number; 
    
    constructor () {}

	setFieldsDetail(laboratoryTest: LaboratoryTest){
        this.employeeCode = laboratoryTest.employeeCode;
        this.serologicalTestId = laboratoryTest.serologicalTestId;
		this.hemoglobin = laboratoryTest.hemoglobin;
		this.hemoglobinStateId = laboratoryTest.hemoglobinStateId;
		this.bloodCountId = laboratoryTest.bloodCountId;
		this.observation = laboratoryTest.observation;
        this.updatedAt = laboratoryTest.updatedAt;
        this.isFinished = laboratoryTest.isFinished;
        this.emrPatientCode = laboratoryTest.emrPatientCode; 
        this.emrHealthPlanId = laboratoryTest.emrHealthPlanId;
    }
}
