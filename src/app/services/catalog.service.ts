import {Injectable} from "@angular/core";
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

import {Catalog} from '../models/catalog';

@Injectable()
export class CatalogService {
  
  URL: string; 

  constructor (private http: Http) {
    //this.URL = 'http://192.168.1.42:8013/api';
    this.URL = 'https://ehu-catalog-service.herokuapp.com/api';
  }

  getCivilStateList() : Observable<Array<Catalog>>{
    return this.http.get(this.URL + '/list/civil-state')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getFirstEmrState() : Observable<Catalog>{
    return this.http.get(this.URL + '/element/first-emr-state')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getEmrStateList() : Observable<Array<Catalog>>{
    return this.http.get(this.URL + '/list/emr-state')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getEapList() : Observable<Array<Catalog>>{
    return this.http.get(this.URL + '/list/eap')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getCurrentHealthPlan() : Observable<Catalog>{
    return this.http.get(this.URL + '/element/current-health-plan')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getGenderList() : Observable<Array<string>>{
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
