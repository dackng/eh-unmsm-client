export class RadiologyTest {

    public typeId: number;
	public employeeCode: string;
	public observation: string;
	public updatedAt: Date;
	public isFinished: boolean;
	public emrPatientCode: number;
	public emrHealthPlanId: number; 
    
    constructor () {}

	setFieldsDetail(radiologyTest: RadiologyTest){
		this.typeId = radiologyTest.typeId;
		this.employeeCode = radiologyTest.employeeCode;
		this.observation = radiologyTest.observation;
		this.updatedAt = radiologyTest.updatedAt;
		this.isFinished = radiologyTest.isFinished;
		this.emrPatientCode = radiologyTest.emrPatientCode;
		this.emrHealthPlanId = radiologyTest.emrHealthPlanId;
	}
}
