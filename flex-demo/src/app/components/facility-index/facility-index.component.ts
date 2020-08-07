import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { EntityComparer } from '@xbim/flex-webkit';
import { GridColumnDefinition } from '@xbim/grid';
import { CommonEntityColumns } from '../../common-columns';
import { FacilityIndexState } from './facility-state';


@Component({
  selector: 'app-facility-index',
  templateUrl: './facility-index.component.html',
  styleUrls: ['./facility-index.component.scss']
})
export class FacilityIndexComponent implements OnInit {

  constructor(private store: Store) { }
  definedColumns: GridColumnDefinition[] = [
    ...CommonEntityColumns
  ];

  orderedColumns = ['Name', 'Description', 'ModelName', 'DateModified'];
  public stateType = FacilityIndexState;
  public comparer = new EntityComparer();


  ngOnInit() {

    // this.store.dispatch(new AddExpands(FacilityIndexState, [
    //   new Expand('Components', "$count=true;$select=Name;$top=10"),
    // ]));
  }

}
