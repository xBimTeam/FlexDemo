import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import {
  EntityIdGenerator, ODataAimEntityStateModel, odataDefaultAimEntityState,
  ODataEntityState, SpaceService, SpaceRepository
} from '@xbim/flex-webkit';
import { Space, SpacesClient } from '@xbim/flex-api';
import { NGXLogger } from 'ngx-logger';



@State<ODataAimEntityStateModel<Space>>({
  name: 'demospaces',
  defaults: odataDefaultAimEntityState(
    {
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class SpaceIndexState extends ODataEntityState<Space, SpacesClient> {
  constructor(@Inject(SpaceService) repository: SpaceRepository, logger: NGXLogger, store: Store, actions$: Actions) {

    super(SpaceIndexState, 'Key', EntityIdGenerator, repository, store, logger, actions$);
  }
}
