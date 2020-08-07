import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import { ApplicationIdGenerator, ApplicationService, ODataAimEntityStateModel, odataDefaultAimEntityState, ODataEntityState } from '@xbim/flex-webkit';
import { Application } from '@xbim/flex-api';
import { ODataService } from 'angular-odata-es5';
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
export class ApplicationIndexState extends ODataEntityState<Application> {
  constructor(@Inject(ApplicationService) service: ODataService<Application>, logger: NGXLogger, store: Store, actions$: Actions) {
    super(ApplicationIndexState, 'ApplicationId', ApplicationIdGenerator, service, store, logger, actions$, false);
  }
}
