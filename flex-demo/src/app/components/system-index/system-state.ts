import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import {
  EntityIdGenerator, ODataAimEntityStateModel,
  odataDefaultAimEntityState, ODataEntityState, SystemService, SystemRepository
} from '@xbim/flex-webkit';
import { SystemItem, SystemsClient } from '@xbim/flex-api';
import { NGXLogger } from 'ngx-logger';



@State<ODataAimEntityStateModel<SystemItem>>({
  name: 'demosystems',
  defaults: odataDefaultAimEntityState(
    {
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class SystemIndexState extends ODataEntityState<SystemItem, SystemsClient> {
  constructor(@Inject(SystemService) repository: SystemRepository, logger: NGXLogger, store: Store, actions$: Actions) {

    super(SystemIndexState, 'Key', EntityIdGenerator, repository, store, logger, actions$);
  }
}
