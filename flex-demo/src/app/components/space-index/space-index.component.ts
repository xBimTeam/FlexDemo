import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { EntityComparer, AddExpands, Expand } from '@xbim/flex-webkit';
import { GridColumnDefinition } from '@xbim/grid';
import { CommonEntityColumns } from '../../common-columns';
import { SpaceIndexState } from './spaces-state';


@Component({
  selector: 'app-space-index',
  templateUrl: './space-index.component.html',
  styleUrls: ['./space-index.component.scss']
})
export class SpaceIndexComponent implements OnInit {

  constructor(private store: Store) { }

  definedColumns: GridColumnDefinition[] = [
    ...CommonEntityColumns,
    {
      id: 'LevelName',
      title: 'Level',
      prefixIcon: 'layers'
    },
    {
      id: 'Components',
      title: '# Components',
      fieldType: "Badge",
      field: 'Components@odata.count',
      orderbyField: 'Components/$count',
      badgeIcon: 'room'
    }
  ];

  orderedColumns = ['Name', 'Description', 'LevelName', 'ModelName', 'DateModified'];
  public stateType = SpaceIndexState;
  public comparer = new EntityComparer();


  ngOnInit() {

    this.store.dispatch(new AddExpands(SpaceIndexState, [
      new Expand('Components', "$count=true;$select=Name;$top=10"),
    ]));
  }
}
