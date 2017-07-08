export class RadiologyTest {

	/*Fields for send to APIs*/
    public id: number;
	public typeId: number;
	public employeeCode: string;
	public observation: string;
	public updatedAt: Date;
	public isFinished: boolean;
	public emrPatientCode: number;
	public emrHealthPlanId: number; 
    
    constructor () {
		this.typeId = null; 
		this.isFinished = true;
	}

	setFieldsDetail(radiologyTest: RadiologyTest){
		this.id = radiologyTest.id;
		this.typeId = radiologyTest.typeId;
		this.employeeCode = radiologyTest.employeeCode;
		this.observation = radiologyTest.observation;
		this.updatedAt = radiologyTest.updatedAt;
		this.isFinished = radiologyTest.isFinished;
		this.emrPatientCode = radiologyTest.emrPatientCode;
		this.emrHealthPlanId = radiologyTest.emrHealthPlanId;
	}
}
