import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { TeamEntityState } from '@xbim/features/team/shared';
import { EntityComparer } from '@xbim/flex-webkit';
import { GridColumnDefinition } from '@xbim/grid';
import { NGXLogger } from 'ngx-logger';
import { DateCreatedColumns } from '../../common-columns';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(private store: Store,
    private logger: NGXLogger) { }

  definedColumns: GridColumnDefinition[] = [
    ...DateCreatedColumns,
    {
      id: 'UserName',
      title: 'Name',
      isPrimary: true
    },
    {
      id: 'UserEmail',
      title: 'Email',
      prefixIcon: 'email'
    },
    {
      id: 'UserId',
      field: 'UserId'
    }
    // Systems, Type
  ];

  orderedColumns = ['UserName', 'UserEmail', 'UserId', 'DateCreated'];
  public stateType = TeamEntityState;
  public comparer = new EntityComparer();


  ngOnInit() {

    // this.store.dispatch(new AddExpands(TeamEntityState, [
    //   new Expand('', "$select=Name"),
    // ]));
  }
}
