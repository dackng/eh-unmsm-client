import {Injectable} from "@angular/core";
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

import {PsychologicalTest} from '../../models/medical-test/psychological.test';
import {MedicalTestItem} from '../../pages/medical-test/components/components-shared/medical-test-process-table/medical.test.item';

@Injectable()
export class PsychologicalTestService {
  
  URL: string;                                              

  constructor (private http: Http) {
    //this.URL = 'http://192.168.1.42:8016/api';
    this.URL = 'https://ehu-psychological-test-service.herokuapp.com/api';
  }

  getPsychologicalTestByHealthPlanIdAndPatientCode(healthPlanId: number, patientCode: number)
     : Observable<PsychologicalTest>{
    return this.http.get(this.URL +'/find/' + healthPlanId + '/' + patientCode)
      .map(this.extractData)
      .catch(this.handleError);
  }

  registerPsychologicalTest(psychologicalTest: PsychologicalTest) {
    let bodyString = JSON.stringify(psychologicalTest);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.URL + '/register', bodyString, {headers:headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTestStateByEmrHealthPlanIdAndEmrPatientCode(healthPlanId: number, patientCode: number)
     : Observable<MedicalTestItem>{
    return this.http.get(this.URL +'/get-state/' + healthPlanId + '/' + patientCode)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) { 
    let body = res.json();
    return body || { };
  }

  private handleError() {//if there is error http 404 "Not found" then set null
      return Observable.of(null);
  }
}
