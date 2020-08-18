import { Inject } from '@angular/core';
import { EntityStateModel } from '@ngxs-labs/entity-state';
import { Actions, State, Store } from '@ngxs/store';
import { GuidGenerator, InvitationService, odataDefaultEntityState, ODataEntityState, InvitationRepository } from '@xbim/flex-webkit';
import { Invitation, InvitationsClient } from '@xbim/flex-api';
import { NGXLogger } from 'ngx-logger';



@State<EntityStateModel<Invitation>>({
    name: 'demoinvites',
    defaults: odataDefaultEntityState(
        {
            orderCriteria: [{ field: 'DateSent', direction: 'desc' }],
            pageSize: 20
        })
})
export class InvitationEntityState extends ODataEntityState<Invitation, InvitationsClient> {
    constructor(@Inject(InvitationService) repository: InvitationRepository, logger: NGXLogger, store: Store, actions$: Actions) {

        super(InvitationEntityState, 'InvitationId', GuidGenerator, repository, store, logger, actions$, false);
    }

}
