import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import { EntityIdGenerator, ODataAimEntityStateModel, odataDefaultAimEntityState, ODataEntityState, SystemsService } from '@xbim/flex-webkit';
import { SystemItem } from '@xbim/flex-api';
import { ODataService } from 'angular-odata-es5';
import { NGXLogger } from 'ngx-logger';



@State<ODataAimEntityStateModel<SystemItem>>({
  name: 'demosystems',
  defaults: odataDefaultAimEntityState(
    {
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class SystemIndexState extends ODataEntityState<SystemItem> {
  constructor(@Inject(SystemsService) service: ODataService<SystemItem>, logger: NGXLogger, store: Store, actions$: Actions) {
    super(SystemIndexState, 'Key', EntityIdGenerator, service, store, logger, actions$);
  }
}
