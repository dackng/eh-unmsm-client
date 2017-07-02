export class MedicalTestItem {
    /*Constants*/
	public static GENERAL_MEDICINE_TEST_NAME = "Examen de Medicina General";
    public static LABORATORY_TEST_NAME = "Examen de Laboratorio";
    public static PSYCHOLOGICAL_TEST_NAME = "Examen Psicológico";
    public static RADIOLOGY_TEST_NAME = "Examen de Radiología";

    /*Fields for send to APIs*/
    public isFinished: boolean;

    /*Fields for help to view logic*/
    public medicalTestName: string;
    public stateName: string;
    public colorMessage: string;
    
    constructor (medicalTestName: string, stateName: string, colorMessage: string) {
        this.medicalTestName = medicalTestName;
        this.stateName = stateName;
        this.colorMessage = colorMessage;
    }
}
