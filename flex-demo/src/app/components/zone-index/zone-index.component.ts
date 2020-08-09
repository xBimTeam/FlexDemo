import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddExpands, Expand, EntityComparer } from '@xbim/flex-webkit';
import { GridColumnDefinition } from '@xbim/grid';
import { NGXLogger } from 'ngx-logger';
import { CommonEntityColumns } from '../../common-columns';
import { ZoneIndexState } from './zone-state';

@Component({
  selector: 'app-zone-index',
  templateUrl: './zone-index.component.html',
  styleUrls: ['./zone-index.component.scss']
})
export class ZoneIndexComponent implements OnInit {

  constructor(
    private store: Store,
    private logger: NGXLogger) {
  }

  definedColumns: GridColumnDefinition[] = [
    ...CommonEntityColumns,
    {
      id: 'Spaces',
      title: '# Spaces',
      fieldType: 'Badge',
      field: 'Spaces@odata.count',
      orderbyField: 'Spaces/$count',
      badgeIcon: 'room'
    }
  ];

  orderedColumns = ['Spaces', 'Name', 'Description', 'ModelName', 'DateModified', 'CreatedBy'];
  public stateType = ZoneIndexState;
  public comparer = new EntityComparer();


  ngOnInit() {

    this.store.dispatch(new AddExpands(ZoneIndexState, [
      new Expand('Spaces', '$count=true;$select=Name;$top=10'),
    ]));
  }


}
