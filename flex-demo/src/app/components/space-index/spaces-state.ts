import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import { EntityIdGenerator, ODataAimEntityStateModel, odataDefaultAimEntityState, ODataEntityState, SpacesService } from '@xbim/flex-webkit';
import { Space } from '@xbim/flex-api';
import { ODataService } from 'angular-odata-es5';
import { NGXLogger } from 'ngx-logger';



@State<ODataAimEntityStateModel<Space>>({
  name: 'demospaces',
  defaults: odataDefaultAimEntityState(
    {
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class SpaceIndexState extends ODataEntityState<Space> {
  constructor(@Inject(SpacesService) service: ODataService<Space>, logger: NGXLogger, store: Store, actions$: Actions) {
    super(SpaceIndexState, 'Key', EntityIdGenerator, service, store, logger, actions$);
  }
}
