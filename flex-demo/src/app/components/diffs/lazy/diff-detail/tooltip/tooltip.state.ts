import { Inject } from '@angular/core';
import { Actions, State, Store } from '@ngxs/store';
import { EntityService, EntityIdGenerator, Expand, ODataAimEntityStateModel, odataDefaultAimEntityState, ODataEntityState, EntityRepository } from '@xbim/flex-webkit';
import { Entity, EntitiesClient } from '@xbim/flex-api';
import { NGXLogger } from 'ngx-logger';


/**
 * Maintains a cache of component details used by the viewwer tooltip
 */
@State<ODataAimEntityStateModel<Entity>>({
    name: 'viewerTooltips',
    defaults: odataDefaultAimEntityState(
        {
            selectCriteria: ['EntityId', 'AssetModelId', 'Name', 'ComponentTypeName', 'ExternalObjectType', 'ExternalObjectName'],
            expandCriteria: [
                new Expand('Attributes', '$select=Name,Unit,Value'),
                new Expand('Model', '$select=Name,Revision')
            ],
            pageSize: 500,
            orderCriteria: [{ field: 'Name', direction: 'asc' }]
        })
})
export class TooltipState extends ODataEntityState<Entity, EntitiesClient> {
    constructor(@Inject(EntityService) repository: EntityRepository,
        logger: NGXLogger, actions$: Actions,
        store: Store) {
        super(TooltipState, 'Key', EntityIdGenerator, repository, store, logger, actions$);
    }
}
