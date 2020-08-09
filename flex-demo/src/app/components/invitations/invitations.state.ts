import { Inject } from '@angular/core';
import { EntityStateModel } from '@ngxs-labs/entity-state';
import { Actions, State, Store } from '@ngxs/store';
import { GuidGenerator, InvitationService, odataDefaultEntityState, ODataEntityState } from '@xbim/flex-webkit';
import { Invitation } from '@xbim/flex-api';
import { ODataService } from 'angular-odata-es5';
import { NGXLogger } from 'ngx-logger';


@State<EntityStateModel<Invitation>>({
    name: 'invites',
    defaults: odataDefaultEntityState(
        {
            orderCriteria: [{ field: 'DateSent', direction: 'desc' }],
            pageSize: 20
        })
})
export class InvitationEntityState extends ODataEntityState<Invitation> {
    constructor(@Inject(InvitationService) invitationService: ODataService<Invitation>,
        logger: NGXLogger,
        store: Store,
        actions$: Actions) {
        super(InvitationEntityState, 'InvitationId', GuidGenerator, invitationService, store, logger, actions$, false);
    }

}
