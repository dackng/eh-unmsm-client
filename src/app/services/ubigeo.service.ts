import {Injectable} from "@angular/core";
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx'

import {Ubigeo} from '../models/ubigeo';

@Injectable()
export class UbigeoService {
  
  URL: string;
  
  constructor (private http: Http) {
      this.URL = 'http://192.168.1.36:8015/api';
  }

  getDepartmentsList() : Observable<Array<Ubigeo>>{
    return this.http.get(this.URL +'/list/departments')
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getProvincesListByDepartmentCode(departmentCode: string) : Observable<Array<Ubigeo>>{
    return this.http.get(this.URL +'/list/provinces/' + departmentCode)
      .map(this.extractDataArray)
      .catch(this.handleError);
  }

  getDistrictsListByProvinceCode(provinceCode: string) : Observable<Array<Ubigeo>>{
    return this.http.get(this.URL +'/list/districts/' + provinceCode)
      .map(this.extractDataArray)
      .catch(this.handleError);
  }
  
  getUbigeoByCode(ubigeoCode: string) : Observable<Ubigeo>{
    return this.http.get(this.URL +'/element/ubigeo/' + ubigeoCode)
      .map(this.extractDataObject)
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
