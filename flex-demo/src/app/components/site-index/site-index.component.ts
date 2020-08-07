import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { EntityComparer } from '@xbim/flex-webkit';
import { GridColumnDefinition } from '@xbim/grid';
import { CommonEntityColumns } from '../../common-columns';
import { SiteIndexState } from './site-state';


@Component({
  selector: 'app-site-index',
  templateUrl: './site-index.component.html',
  styleUrls: ['./site-index.component.scss']
})
export class SiteIndexComponent implements OnInit {

  constructor(private store: Store) { }
  definedColumns: GridColumnDefinition[] = [
    ...CommonEntityColumns
  ];

  orderedColumns = ['Name', 'Description', 'ModelName', 'DateModified'];
  public stateType = SiteIndexState;
  public comparer = new EntityComparer();


  ngOnInit() {

    // this.store.dispatch(new AddExpands(SiteIndexState, [ ]));
  }
}
