import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { InvitationEntityState } from './invitations.state';
import { GridColumnDefinition } from '@xbim/grid';
import { NGXLogger } from 'ngx-logger';
import { DateCreatedColumns } from '../../common-columns';
import { EntityComparer, AddExpands, Expand } from '@xbim/flex-webkit';


@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss']
})
export class InvitationsComponent implements OnInit {

  constructor(private store: Store,
    private logger: NGXLogger) { }


  definedColumns: GridColumnDefinition[] = [
    {
      id: 'dateCreated',
      title: 'Date Created',
      format: 'Date',
      prefixIcon: 'calendar_today'
    },
    {
      id: 'dateModified',
      title: 'Date Modified',
      format: 'Date',
      prefixIcon: 'calendar_today'
    },
    {
      id: 'emailAddress',
      title: 'Email',
      prefixIcon: 'email',
      isPrimary: true
    },
    {
      id: 'tenantRole',
      title: 'Role'
    },
    {
      id: 'acceptedBy',
      fieldType: 'Reference',
      field: 'name'
    }
    // Systems, Type
  ];

  orderedColumns = ['emailAddress', 'tenantRole', 'dateCreated', 'acceptedBy'];
  public stateType = InvitationEntityState;
  public comparer = new EntityComparer();


  ngOnInit() {

    this.store.dispatch(new AddExpands(InvitationEntityState, [
      new Expand('acceptedBy', '$select=name'),
    ]));
  }
}
