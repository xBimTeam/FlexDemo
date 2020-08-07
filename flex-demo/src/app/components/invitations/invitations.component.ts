import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { InvitationEntityState } from '@xbim/features/team/shared';
import { EntityComparer, AddExpands, Expand } from '@xbim/flex-webkit';
import { GridColumnDefinition } from '@xbim/grid';
import { NGXLogger } from 'ngx-logger';
import { DateCreatedColumns } from '../../common-columns';


@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss']
})
export class InvitationsComponent implements OnInit {

  constructor(private store: Store,
    private logger: NGXLogger) { }


  definedColumns: GridColumnDefinition[] = [
    ...DateCreatedColumns,
    {
      id: 'EmailAddress',
      title: 'Email',
      prefixIcon: 'email',
      isPrimary: true
    },
    {
      id: 'TenantRole',
      title: 'Role'
    },
    {
      id: 'AcceptedBy',
      fieldType: 'Reference',
      field: 'Name'
    }
    // Systems, Type
  ];

  orderedColumns = ['EmailAddress', 'TenantRole', 'DateCreated', 'AcceptedBy'];
  public stateType = InvitationEntityState;
  public comparer = new EntityComparer();


  ngOnInit() {

    this.store.dispatch(new AddExpands(InvitationEntityState, [
      new Expand('AcceptedBy', "$select=Name"),
    ]));
  }
}
