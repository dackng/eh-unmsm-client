import {Component,Output, OnInit, EventEmitter} from '@angular/core';
import { Logger } from "angular2-logger/core";

import {Catalog} from '../../../models/catalog';
import {Utils} from '../../../models/utils';
import {Constants} from '../../../models/constants';

import {CatalogService} from '../../../services/catalog.service';

@Component({
  selector: 'select-patient-type',
  styleUrls: ['../../../theme/sass/_disabled.scss'],
  template: require('./select-patient-type.html'),
  providers: [Logger, CatalogService]
})
export class SelectPatientTypeComponent implements OnInit {
    currentHealthPlan: Catalog;
    errorMessage: string;
    @Output() currentHealthPlanNotify = new EventEmitter<Catalog>();

    ngOnInit(){
        this.initilize();
    }

    constructor(private _logger: Logger, private _catalogService : CatalogService) {
        this._logger.warn("===== Calling method CATALOG API:  getCurrentHealthPlan() =====");
        this._catalogService.getCurrentHealthPlan()//loading the current health plan
            .subscribe( (catalog : Catalog ) => {
                this.currentHealthPlan = Utils.createCatalog(catalog.secondaryId, catalog.name);
                this._logger.warn("OUTPUT=> currentHealthPlan : " + JSON.stringify(this.currentHealthPlan));
                this.currentHealthPlanNotify.emit(this.currentHealthPlan); 
            }, error => this.errorMessage = <any> error);
    }

    initilize(){
        //Creating an item with index 0 because represent the LOADING action
        this.currentHealthPlan = new Catalog(0,Constants.LOADING_LABEL);
    }
}
