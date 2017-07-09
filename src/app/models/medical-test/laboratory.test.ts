import {Catalog} from './../catalog';

export class LaboratoryTest {
	/*Constants*/
	public static FIVE_MONTHS = 5/12;
    public static SIXTY_MONTHS = 5;// is 60/12
	public static FOUR_YEARS = 4;
	public static ELEVEN_YEARS = 11;
	public static TWELVE_YEARS = 12;
	public static FOURTEEN_YEARS = 14;
	public static FIFTEEN_YEARS = 15;


	/*Fields for send to APIs*/
    public id: number;
	public employeeCode: string;
	public serologicalTestId: number;
	public hemoglobin: number;
	public hemoglobinStateId: number;
	public bloodTypeId: number;
	public observation: string;
	public updatedAt: Date;
	public isFinished: boolean;
	public emrPatientCode: number;
	public emrHealthPlanId: number; 
    
	/*Fields for help to view logic*/
	public hemoglobinStateItemList: Array<Catalog>;
	public ageInYearsOfPatient:number;
	public isPatientOfMaleGender: boolean;

    constructor () {
		this.isFinished = true;
		this.serologicalTestId = null;
		this.bloodTypeId = null;
	}

	setFieldsDetail(laboratoryTest: LaboratoryTest){
        this.id = laboratoryTest.id;
		this.employeeCode = laboratoryTest.employeeCode;
        this.serologicalTestId = laboratoryTest.serologicalTestId;
		this.hemoglobin = laboratoryTest.hemoglobin;
		this.hemoglobinStateId = laboratoryTest.hemoglobinStateId;
		this.bloodTypeId = laboratoryTest.bloodTypeId;
		this.observation = laboratoryTest.observation;
        this.updatedAt = laboratoryTest.updatedAt;
        this.isFinished = laboratoryTest.isFinished;
        this.emrPatientCode = laboratoryTest.emrPatientCode; 
        this.emrHealthPlanId = laboratoryTest.emrHealthPlanId;
    }

	/*
	- First group for children: 6 months <= age <= 59 months
	- Second group for children: 5 years <= age <= 11 years
	- Third group for children: 12 years <= age <= 14 years
	- Fourth group for non-pregnant women: 15 years <= age
	- A group for pregnant women but for the moment in this version will be implemented
	- Fifth group for men: 15 years <= age
	Info: http://www.who.int/vmnis/indicators/haemoglobin_es.pdf
	=>THE REQUISITE IS THAT CATALOG API BRING THE LIST IN ORDER ACORD SecondaryId
	*/
	evaluateHemoglobinState(){
		if( this.isWithoutAnaemiaForFirstGroup() 
			|| this.isWithoutAnaemiaForSecondGroup()
			|| this.isWithoutAnaemiaForThirdGroup()
			|| this.isWithoutAnaemiaForFourthGroup()
			|| this.isWithoutAnaemiaForFifthGroup()){
				this.hemoglobinStateId = this.hemoglobinStateItemList[0].secondaryId;
		}else if(this.isWithSlightAnaemiaForFirstGroup()
			|| this.isWithSlightAnaemiaForSecondGroup()
			|| this.isWithSlightAnaemiaForThirdGroup()
			|| this.isWithSlightAnaemiaForFourthGroup()
			|| this.isWithSlightAnaemiaForFifthGroup()){
				this.hemoglobinStateId = this.hemoglobinStateItemList[1].secondaryId;
		}else if(this.isWithModerateAnaemiaForFirstGroup()
			|| this.isWithModerateAnaemiaForSecondGroup()
			|| this.isWithModerateAnaemiaForThirdGroup()
			|| this.isWithModerateAnaemiaForFourthGroup()
			|| this.isWithModerateAnaemiaForFifthGroup()){
				this.hemoglobinStateId = this.hemoglobinStateItemList[2].secondaryId;
		}else{
			this.hemoglobinStateId = this.hemoglobinStateItemList[3].secondaryId;
		}
	}
	
	private isFirstGroup(){
		return LaboratoryTest.FIVE_MONTHS < this.ageInYearsOfPatient 
			&& this.ageInYearsOfPatient < LaboratoryTest.SIXTY_MONTHS ? true : false; 
	}

	private isWithoutAnaemiaForFirstGroup(){
		return this.isFirstGroup() && this.hemoglobin >109 ? true : false;
	}

	private isWithSlightAnaemiaForFirstGroup(){
		return this.isFirstGroup() && this.hemoglobin > 99 && this.hemoglobin <110 ? true : false;
	}

	private isWithModerateAnaemiaForFirstGroup(){
		return this.isFirstGroup() && this.hemoglobin >69 && this.hemoglobin < 100 ? true : false;
	}

	private isSecondGroup(){
		return LaboratoryTest.FOUR_YEARS < this.ageInYearsOfPatient
			&& this.ageInYearsOfPatient < LaboratoryTest.TWELVE_YEARS ? true : false;
	}

	private isWithoutAnaemiaForSecondGroup(){
		return this.isSecondGroup() && this.hemoglobin >114 ? true : false;
	}

	private isWithSlightAnaemiaForSecondGroup(){
		return this.isSecondGroup() && this.hemoglobin > 109 && this.hemoglobin <115 ? true : false;
	}

	private isWithModerateAnaemiaForSecondGroup(){
		return this.isSecondGroup() && this.hemoglobin >79 && this.hemoglobin < 110 ? true : false;
	}
	
	private isThirdGroup(){
		return LaboratoryTest.ELEVEN_YEARS < this.ageInYearsOfPatient 
			&& this.ageInYearsOfPatient < LaboratoryTest.FIFTEEN_YEARS ? true : false;
	}

	private isWithoutAnaemiaForThirdGroup(){
		return this.isThirdGroup() && this.hemoglobin >119 ? true : false;
	}

	private isWithSlightAnaemiaForThirdGroup(){
		return this.isThirdGroup() && this.hemoglobin > 109 && this.hemoglobin <120 ? true : false;
	}

	private isWithModerateAnaemiaForThirdGroup(){
		return this.isThirdGroup() && this.hemoglobin >79 && this.hemoglobin < 110 ? true : false;
	}

	private isFourthGroup(){
		return LaboratoryTest.FOURTEEN_YEARS < this.ageInYearsOfPatient 
			&& !this.isPatientOfMaleGender ? true : false;
	}

	private isWithoutAnaemiaForFourthGroup(){
		return this.isFourthGroup() && this.hemoglobin > 119 ? true : false;
	}

	private isWithSlightAnaemiaForFourthGroup(){
		return this.isFourthGroup() && this.hemoglobin > 109 && this.hemoglobin < 120 ? true : false;
	}

	private isWithModerateAnaemiaForFourthGroup(){
		return this.isFourthGroup() && this.hemoglobin > 79 && this.hemoglobin < 110 ? true : false;
	}

	private isFifthGroup(){
		return LaboratoryTest.FOURTEEN_YEARS < this.ageInYearsOfPatient 
			&& this.isPatientOfMaleGender ? true : false;
	}

	private isWithoutAnaemiaForFifthGroup(){
		return this.isFifthGroup() && this.hemoglobin >129 ? true : false;
	}

	private isWithSlightAnaemiaForFifthGroup(){
		return this.isFifthGroup() && this.hemoglobin > 99 && this.hemoglobin <130 ? true : false;
	}

	private isWithModerateAnaemiaForFifthGroup(){
		return this.isFifthGroup() && this.hemoglobin > 79 && this.hemoglobin < 110 ? true : false;
	}


}
