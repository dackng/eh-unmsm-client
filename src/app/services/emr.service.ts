import {Injectable} from "@angular/core";
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

import {Emr} from '../models/emr';

@Injectable()
export class EmrService {
  
  URL: string;                                              

  constructor (private http: Http) {
    //this.URL = 'http://192.168.1.42:8016/api';
    this.URL = 'https://ehu-emr-service.herokuapp.com/api';
  }

  getEmrByHealthPlanIdAndPatientCode(healthPlanId: number, patientCode: number) : Observable<Emr>{
    return this.http.get(this.URL +'/find/' + healthPlanId + '/' + patientCode)
      .map(this.extractData)
      .catch(this.handleError);
  }

  registerEmr(emr: Emr) {
    let bodyString = JSON.stringify(emr);
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
