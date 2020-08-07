import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { EntityComparer, AddExpands } from '@xbim/flex-webkit';
import { GridColumnDefinition } from '@xbim/grid';
import { CommonEntityColumns } from '../../common-columns';
import { DocumentIndexState } from './document-state';

@Component({
  selector: 'app-document-index',
  templateUrl: './document-index.component.html',
  styleUrls: ['./document-index.component.scss']
})
export class DocumentIndexComponent implements OnInit {

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
  public stateType = DocumentIndexState;
  public comparer = new EntityComparer();


  ngOnInit() {

    this.store.dispatch(new AddExpands(DocumentIndexState, [
      //new Expand('Components', "$count=true;$select=Name;$top=10"),
    ]));
  }
}
