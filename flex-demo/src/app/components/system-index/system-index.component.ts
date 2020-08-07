import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { EntityComparer, AddExpands, Expand } from '@xbim/flex-webkit';
import { GridColumnDefinition } from '@xbim/grid';
import { CommonEntityColumns } from '../../common-columns';
import { SystemIndexState } from './system-state';


@Component({
  selector: 'app-system-index',
  templateUrl: './system-index.component.html',
  styleUrls: ['./system-index.component.scss']
})
export class SystemIndexComponent implements OnInit {

  constructor(private store: Store) { }

  definedColumns: GridColumnDefinition[] = [
    ...CommonEntityColumns,
    {
      id: 'Components',
      title: '# Components',
      fieldType: "Badge",
      field: 'Components@odata.count',
      orderbyField: 'Components/$count',
      badgeIcon: 'room'
    }
  ];

  orderedColumns = ['Name', 'Description', 'ModelName', 'DateModified'];
  public stateType = SystemIndexState;
  public comparer = new EntityComparer();


  ngOnInit() {

    this.store.dispatch(new AddExpands(SystemIndexState, [
      new Expand('Components', "$count=true;$select=Name;$top=10"),
    ]));
  }

}
