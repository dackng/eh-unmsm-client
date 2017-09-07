import {Injectable} from "@angular/core";
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

import {Phr} from '../models/health-record/phr';
import {EmrSummary} from '../models/health-record/emr.summary';

@Injectable()
export class PhrService {
  
  URL: string;                                              

  constructor (private http: Http) {
    //this.URL = 'http://192.168.1.42:8021/api';
    this.URL = 'https://ehu-phr-service.herokuapp.com/api';
  }

  findPhrByPatientCode(patientCode: number) : Observable<Phr>{
    return this.http.get(this.URL +'/find/' + patientCode)
      .map(this.extractData)
      .catch(this.handleError);
  }

  registerPhr(phr: Phr) {
    let bodyString = JSON.stringify(phr);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.URL + '/register', bodyString, {headers:headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  registerEmrSummary(patientCode: number, emrSummary: EmrSummary) {
    let bodyString = JSON.stringify(emrSummary);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.URL + '/register/emr-summary/' + patientCode, bodyString, {headers:headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateEmrSummary(patientCode: number, emrSummary: EmrSummary) {
    let bodyString = JSON.stringify(emrSummary);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.URL + '/update/emr-summary/' + patientCode, bodyString, {headers:headers})
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
