import {Injectable} from "@angular/core";
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

import {Catalog} from '../models/catalog';

@Injectable()
export class CatalogService {
  
  URL: string; 

  constructor (private http: Http) {
    this.URL = 'http://192.168.1.37:8013/api';
  }

  getCivilStatusList() : Observable<Array<Catalog>>{
    return this.http.get(this.URL + '/list/civil-status')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getFirstMedicalStatus() : Observable<Catalog>{
    return this.http.get(this.URL + '/element/first-medical-status')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getMedicalStatusList() : Observable<Array<Catalog>>{
    return this.http.get(this.URL + '/list/medical-status')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getEapList() : Observable<Array<Catalog>>{
    return this.http.get(this.URL + '/list/eap')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getGenderList() : Observable<Array<Catalog>>{
    return this.http.get(this.URL + '/list/gender')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  private extractDataObject(res: Response) {
    let body = res.json();
    return body || { };
  }
  
  private extractDataArray(res: Response) {
    let body = res.json();
    return body || [ ];
  }
  
  private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
  }
}
