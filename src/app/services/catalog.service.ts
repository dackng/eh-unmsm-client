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

  getSymptomTypeList() : Observable<Array<Catalog>>{
    return this.http.get(this.URL + '/list/symptom-type')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getCIEList() : Observable<Array<Catalog>>{
    return this.http.get(this.URL + '/list/cie')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getSerologicalTestList() : Observable<Array<Catalog>>{
    return this.http.get(this.URL + '/list/serological-test')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getBloodTypeList() : Observable<Array<Catalog>>{
    return this.http.get(this.URL + '/list/blood-type')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getRadiologyTypeList() : Observable<Array<Catalog>>{
    return this.http.get(this.URL + '/list/radiology-type')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getPsychologicalDiagnosisList() : Observable<Array<Catalog>>{
    return this.http.get(this.URL + '/list/psychological-diagnosis')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getHemoglobinStateList() : Observable<Array<Catalog>>{
    return this.http.get(this.URL + '/list/hemoglobin-state')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getDepressionStateList() : Observable<Array<Catalog>>{
    return this.http.get(this.URL + '/list/depression-state')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getAnxietyStateList() : Observable<Array<Catalog>>{
    return this.http.get(this.URL + '/list/anxiety-state')
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
