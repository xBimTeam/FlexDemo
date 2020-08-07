import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import { EntityIdGenerator, ODataAimEntityStateModel, odataDefaultAimEntityState, ODataEntityState, ZonesService } from '@xbim/flex-webkit';
import { Zone } from '@xbim/flex-api';
import { ODataService } from 'angular-odata-es5';
import { NGXLogger } from 'ngx-logger';



@State<ODataAimEntityStateModel<Zone>>({
  name: 'demozones',
  defaults: odataDefaultAimEntityState(
    {
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class ZoneIndexState extends ODataEntityState<Zone> {
  constructor(@Inject(ZonesService) service: ODataService<Zone>, logger: NGXLogger, store: Store, actions$: Actions) {
    super(ZoneIndexState, 'Key', EntityIdGenerator, service, store, logger, actions$);
  }
}
