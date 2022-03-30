import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Level } from '@xbim/flex-api';
import { EntityComparer, AddExpands, Expand, SetActive } from '@xbim/flex-webkit';
import { GridColumnDefinition } from '@xbim/grid';
import { NGXLogger } from 'ngx-logger';
import { CommonEntityColumns } from '../../common-columns';
import { LevelIndexState } from './level-state';

@Component({
  selector: 'app-level-index',
  templateUrl: './level-index.component.html',
  styleUrls: ['./level-index.component.scss']
})
export class LevelIndexComponent implements OnInit {

  constructor(private store: Store,
    private logger: NGXLogger) { }

  public floorplanType = "level"

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
    // Systems, Type
  ];

  orderedColumns = ['Name', 'Description', 'Model', 'ModelName', 'EntityId', 'DateModified', 'Spaces'];
  public stateType = LevelIndexState;
  public comparer = new EntityComparer();


  ngOnInit() {

    this.store.dispatch(new AddExpands(LevelIndexState, [
      new Expand('Model', '$select=SegmentName'),
      new Expand('Spaces', '$count=true;$select=EntityId;$top=0'),
    ]));
  }

  public activateLevel(level: Level) {
    this.store.dispatch(new SetActive(LevelIndexState, level.EntityId.toString()));
  }
}
