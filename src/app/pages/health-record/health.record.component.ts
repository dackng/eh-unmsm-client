import {Component, OnInit, ViewChild} from '@angular/core';
import { Logger } from "angular2-logger/core";
import {Phr} from '../../models/health-record/phr';
import {EmrSummary} from '../../models/health-record/emr.summary';
import {PhrService} from '../../services/phr.service';

import { ModalDirective } from 'ng2-bootstrap';

@Component({
    selector: 'health-record',
    styleUrls: ['../../theme/sass/_disabled.scss', 
                '../../theme/sass/_basicTables.scss',
                './_modal-health-record.scss'],
    templateUrl: './health-record.html',
    providers: [Logger, PhrService]
})
export class HealthRecordComponent {
    phr: Phr;
    emrSummary: EmrSummary;
    patientCode: number;
    isActive: boolean;
    isPhrNoRegistered: boolean;
    errorMessage: string;

    @ViewChild('emrOfNewPatientModal') emrOfNewPatientModal: ModalDirective;
    @ViewChild('emrOfOldPatientModal') emrOfOldPatientModal: ModalDirective;
    @ViewChild('patientDetailModal') patientDetailModal: ModalDirective;

    ngOnInit(){
        this.initilize();
    }

    constructor(private _logger: Logger, private _phrService: PhrService) {
    }

    showEmrModal(index: number){
        this.emrSummary = new EmrSummary();
        this.emrSummary.setFieldsDetail(this.phr.emrSummaryList[index]);
        if(index == 0){
            this.emrOfNewPatientModal.config.backdrop = false;
            this.emrOfNewPatientModal.show();
        }else{
            this.emrOfOldPatientModal.config.backdrop = false;
            this.emrOfOldPatientModal.show();
        }
    }

    hideEmrOfNewPatientModal(){
        this.emrOfNewPatientModal.hide();
    }

    hideEmrOfOldPatientModal(){
        this.emrOfOldPatientModal.hide();
    }

    showPatientDetailModal(){
        this.patientDetailModal.config.backdrop = false;
        this.patientDetailModal.show();
    }

    hidePatientDetailModal(){
        this.patientDetailModal.hide();
    }

    findPhrByPatientCode(){
        this.isActive = true;
        this.isPhrNoRegistered = false;
        this._logger.warn("===== Calling method PHR API:  findPhrByPatientCode("+ this.patientCode +") =====");
        this._phrService.findPhrByPatientCode(this.patientCode)
            .subscribe( (phr: Phr) => {
                if(phr != null){
                    this.phr.setFields(phr);
                    this._logger.warn("OUTPUT => PHR: " + JSON.stringify(this.phr));
                }else{
                    this._logger.warn("PHR isn't exist");
                    this.initilize();
                }
            }, error => this.errorMessage = <any> error);
    }

    initilize(){      
        this.phr = new Phr();
        this.emrSummary = new EmrSummary();
        this.isPhrNoRegistered = true;
    }
}