import { Injectable, Inject } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class CommonService {
  private findPacientSubject = new Subject<any>();
  
  private medicalTestProcessSubject = new Subject<any>();
  /**
   * Observable string streams
   */
  notifyObservableOfFindPacient$ = this.findPacientSubject.asObservable();

  notifyObservableOfMedicalTestTable$ = this.medicalTestProcessSubject.asObservable();

  constructor(){}

  public notifyFindPacientComponent(data: any) {
    if (data) {
      this.findPacientSubject.next(data);
    }
  }

  public notifyMedicalTestProcessComponent(data: any) {
    if (data) {
      this.medicalTestProcessSubject.next(data);
    }
  }
}