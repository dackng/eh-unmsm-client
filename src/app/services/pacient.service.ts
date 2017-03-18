import {Injectable} from "@angular/core";
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx' 

import {Pacient} from '../models/pacient';

@Injectable()
export class PacientService {
  
  URL: string;                                              

  constructor (private http: Http) {
    this.URL = 'http://192.168.1.36:8014/api';
  }

  getPacientByCode(code: number) : Observable<Pacient>{
    return this.http.get(this.URL +'/find/' + code)
      .map(this.extractData)
      .catch(this.handleError);
  }

  registerPacient(pacient: Pacient) {
    let bodyString = JSON.stringify(pacient);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.URL + '/save', bodyString, {headers:headers})
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
