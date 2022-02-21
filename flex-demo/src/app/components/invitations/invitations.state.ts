import { Inject } from '@angular/core';
import { EntityStateModel } from '@ngxs-labs/entity-state';
import { Actions, State, Store } from '@ngxs/store';
import { GuidGenerator, InvitationService, odataDefaultEntityState, ODataEntityState, InvitationRepository, InvitationsWrapper } from '@xbim/flex-webkit';
import { Invitation } from '@xbim/flex-identity-api';
import { NGXLogger } from 'ngx-logger';



@State<EntityStateModel<Invitation>>({
    name: 'demoinvites',
    defaults: odataDefaultEntityState(
        {
            orderCriteria: [{ field: 'dateSent', direction: 'desc' }],
            pageSize: 20
        })
})
export class InvitationEntityState extends ODataEntityState<Invitation, InvitationsWrapper> {
    constructor(@Inject(InvitationService) repository: InvitationRepository, logger: NGXLogger, store: Store, actions$: Actions) {

        super(InvitationEntityState, 'invitationId', GuidGenerator, repository, store, logger, actions$, false);
    }

}
