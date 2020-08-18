import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import {
  EntityIdGenerator, ODataAimEntityStateModel,
  odataDefaultAimEntityState, ODataEntityState, ZoneService, ZoneRepository
} from '@xbim/flex-webkit';
import { Zone, ZonesClient } from '@xbim/flex-api';
import { NGXLogger } from 'ngx-logger';



@State<ODataAimEntityStateModel<Zone>>({
  name: 'demozones',
  defaults: odataDefaultAimEntityState(
    {
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class ZoneIndexState extends ODataEntityState<Zone, ZonesClient> {
  constructor(@Inject(ZoneService) repository: ZoneRepository, logger: NGXLogger, store: Store, actions$: Actions) {

    super(ZoneIndexState, 'Key', EntityIdGenerator, repository, store, logger, actions$);
  }
}
