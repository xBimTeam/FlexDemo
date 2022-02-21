import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { TeamEntityState } from './team-state';
import { EntityComparer } from '@xbim/flex-webkit';
import { GridColumnDefinition } from '@xbim/grid';
import { NGXLogger } from 'ngx-logger';
import { LowerDateCreatedColumns } from '../../common-columns';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(private store: Store,
    private logger: NGXLogger) { }

  definedColumns: GridColumnDefinition[] = [
    ...LowerDateCreatedColumns,
    {
      id: 'userName',
      title: 'Name',
      isPrimary: true
    },
    {
      id: 'userEmail',
      title: 'Email',
      prefixIcon: 'email'
    },

    {
      id: 'role',
      prefixIcon: 'policy'
    },
    {
      id: 'userId',
      field: 'UserId'
    }
    // Systems, Type
  ];

  orderedColumns = ['userName', 'userEmail', 'role', 'userId', 'dateCreated'];
  public stateType = TeamEntityState;
  public comparer = new EntityComparer();


  ngOnInit() {

    // this.store.dispatch(new AddExpands(TeamEntityState, [
    //   new Expand('', "$select=Name"),
    // ]));
  }
}
