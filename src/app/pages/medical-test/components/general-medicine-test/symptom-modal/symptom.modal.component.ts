import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-symptom-modal',
  styleUrls: [('./default-modal.component.scss')],
  templateUrl: './symptom-modal.html'
})

export class SymptomModalComponent implements OnInit {

  modalHeader: string;
  modalContent: string = `Lorem ipsum dolor sit amet,
   consectetuer adipiscing elit, sed diam nonummy
   nibh euismod tincidunt ut laoreet dolore magna aliquam
   erat volutpat. Ut wisi enim ad minim veniam, quis
   nostrud exerci tation ullamcorper suscipit lobortis
   nisl ut aliquip ex ea commodo consequat.`;

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {}

  hideAddSymptomModal() {
    this.activeModal.close();
  }
}
