import {Injectable} from "@angular/core";
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx' 

import {Patient} from '../models/patient';

@Injectable()
export class PatientService {
  
  URL: string;                                              

  constructor (private http: Http) {
    //this.URL = 'http://192.168.1.42:8014/api';
    this.URL = 'https://ehu-patient-service.herokuapp.com/api';
  }

  getPatientDetailByCode(code: number) : Observable<Patient>{
    return this.http.get(this.URL +'/find-detail/' + code)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPatientSummaryByCode(code: number) : Observable<Patient>{
    return this.http.get(this.URL +'/find-summary/' + code)
      .map(this.extractData)
      .catch(this.handleError);
  }

  registerPatient(patient: Patient) {
    let bodyString = JSON.stringify(patient);
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
