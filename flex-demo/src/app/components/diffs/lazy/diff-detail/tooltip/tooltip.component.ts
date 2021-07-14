import { Component, Input, OnInit } from '@angular/core';
import { Component as ComponentItem } from '@xbim/flex-api';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  @Input() tooltipData: ComponentItem;

  constructor() { }

  ngOnInit(): void {
  }

}
