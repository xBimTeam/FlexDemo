import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GridColumnDefinition } from '@xbim/grid';
import { ApplicationIndexState } from './application-state';
import { EntityComparer } from '@xbim/flex-webkit';


@Component({
  selector: 'app-application-index',
  templateUrl: './application-index.component.html',
  styleUrls: ['./application-index.component.scss']
})
export class ApplicationIndexComponent implements OnInit {

  constructor(private store: Store) { }

  definedColumns: GridColumnDefinition[] = [
    {
      id: 'Name',
      title: 'Name',
      isPrimary: true
    },
    {
      id: 'ApplicationIdentifier',
      title: 'App Identifier'
    },
    {
      id: 'Version'
    },
    {
      id: 'Developer'
    },
    {
      id: 'ModelName',
      title: 'Model'
    }
  ];

  orderedColumns = ['Name', 'ApplicationIdentifier', 'Developer', 'Version', 'ModelName'];
  public stateType = ApplicationIndexState;
  public comparer = new EntityComparer();


  ngOnInit() {

  }
}
