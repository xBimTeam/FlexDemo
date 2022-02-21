import { Inject, Injectable } from '@angular/core';
import { EntityStateModel } from '@ngxs-labs/entity-state';
import { Actions, State, Store } from '@ngxs/store';
import { GuidGenerator, odataDefaultEntityState, ODataEntityState, TeamService, TeamRepository, MembersWrapper } from '@xbim/flex-webkit';
import { TenantUser } from '@xbim/flex-identity-api';
import { NGXLogger } from 'ngx-logger';



@Injectable({ providedIn: 'root' })

@State<EntityStateModel<TenantUser>>({
    name: 'demoteam',
    defaults: odataDefaultEntityState(
        {
            orderCriteria: [{ field: 'userName', direction: 'asc' }],
            pageSize: 10
        })
})
export class TeamEntityState extends ODataEntityState<TenantUser, MembersWrapper> {
    constructor(@Inject(TeamService) repository: TeamRepository, logger: NGXLogger, store: Store, actions$: Actions) {

        super(TeamEntityState, 'userId', GuidGenerator, repository, store, logger, actions$, false);
    }

}
