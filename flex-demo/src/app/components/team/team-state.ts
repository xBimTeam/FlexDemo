import { Inject, Injectable } from '@angular/core';
import { EntityStateModel } from '@ngxs-labs/entity-state';
import { Actions, State, Store } from '@ngxs/store';
import { GuidGenerator, odataDefaultEntityState, ODataEntityState, TeamService, TeamRepository } from '@xbim/flex-webkit';
import { TenantUser, TeamClient } from '@xbim/flex-api';
import { NGXLogger } from 'ngx-logger';



@Injectable({ providedIn: 'root' })

@State<EntityStateModel<TenantUser>>({
    name: 'demoteam',
    defaults: odataDefaultEntityState(
        {
            orderCriteria: [{ field: 'UserName', direction: 'asc' }],
            pageSize: 10
        })
})
export class TeamEntityState extends ODataEntityState<TenantUser, TeamClient> {
    constructor(@Inject(TeamService) repository: TeamRepository, logger: NGXLogger, store: Store, actions$: Actions) {

        super(TeamEntityState, 'UserId', GuidGenerator, repository, store, logger, actions$, false);
    }

}
