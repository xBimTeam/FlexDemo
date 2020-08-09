import { Inject, Injectable } from '@angular/core';
import { EntityStateModel } from '@ngxs-labs/entity-state';
import { Actions, State, Store } from '@ngxs/store';
import { GuidGenerator, odataDefaultEntityState, ODataEntityState, TeamService } from '@xbim/flex-webkit';
import { TenantUser } from '@xbim/flex-api';
import { ODataService } from 'angular-odata-es5';
import { NGXLogger } from 'ngx-logger';



@Injectable({ providedIn: 'root' })

@State<EntityStateModel<TenantUser>>({
    name: 'team',
    defaults: odataDefaultEntityState(
        {
            orderCriteria: [{ field: 'UserName', direction: 'asc' }],
            pageSize: 10
        })
})
export class TeamEntityState extends ODataEntityState<TenantUser> {
    constructor(@Inject(TeamService) service: ODataService<TenantUser>, logger: NGXLogger, store: Store, actions$: Actions) {
        super(TeamEntityState, 'UserId', GuidGenerator, service, store, logger, actions$, false);
    }

}
