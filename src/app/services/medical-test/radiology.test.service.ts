import {Injectable} from "@angular/core";
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

import {RadiologyTest} from '../../models/medical-test/radiology.test';
import {MedicalTestItem} from '../../pages/medical-test/components/components-shared/medical-test-process-table/medical.test.item';

@Injectable()
export class RadiologyTestService {
  
  URL: string;                                              

  constructor (private http: Http) {
    //this.URL = 'http://192.168.1.42:8016/api';
    this.URL = 'https://ehu-radiology-test-service.herokuapp.com/api';
  }

  getRadiologyTestByHealthPlanIdAndPatientCode(healthPlanId: number, patientCode: number)
     : Observable<RadiologyTest>{
    return this.http.get(this.URL +'/find/' + healthPlanId + '/' + patientCode)
      .map(this.extractData)
      .catch(this.handleError);
  }

  registerRadiologyTest(radiologyTest: RadiologyTest) {
    let bodyString = JSON.stringify(radiologyTest);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.URL + '/register', bodyString, {headers:headers})
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
