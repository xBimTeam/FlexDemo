import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import {
  ApplicationIdGenerator, ApplicationService, ODataAimEntityStateModel,
  odataDefaultAimEntityState, ODataEntityState, ApplicationRepository
} from '@xbim/flex-webkit';
import { Application, ApplicationsClient } from '@xbim/flex-api';
import { NGXLogger } from 'ngx-logger';



@State<ODataAimEntityStateModel<Application>>({
  name: 'demoapplication',
  defaults: odataDefaultAimEntityState(
    {
      // TODO: composite key is wrong. Should include ModelId in odata payload
      compositekeys: ['ModelName', 'ApplicationId'],
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class ApplicationIndexState extends ODataEntityState<Application, ApplicationsClient> {
  constructor(@Inject(ApplicationService) repository: ApplicationRepository, logger: NGXLogger, store: Store, actions$: Actions) {

    super(ApplicationIndexState, 'ApplicationId', ApplicationIdGenerator, repository, store, logger, actions$, false);
  }
}
