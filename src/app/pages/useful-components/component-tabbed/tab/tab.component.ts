 import { Component, Input } from '@angular/core';

@Component({
  
  selector: 'tab',
  styles: [ require('./padding.scss')],
  templateUrl: './tab.html'
})
export class TabComponent {
  @Input('tabTitle') title: string;
  @Input() active = false;
  @Input() pageAddress: string;
}