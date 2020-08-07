import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import { EntityIdGenerator, FacilitiesService, ODataAimEntityStateModel, odataDefaultAimEntityState, ODataEntityState } from '@xbim/flex-webkit';
import { Facility } from '@xbim/flex-api';
import { ODataService } from 'angular-odata-es5';
import { NGXLogger } from 'ngx-logger';



@State<ODataAimEntityStateModel<Facility>>({
  name: 'demofacilities',
  defaults: odataDefaultAimEntityState(
    {
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class FacilityIndexState extends ODataEntityState<Facility> {
  constructor(@Inject(FacilitiesService) service: ODataService<Facility>, logger: NGXLogger, store: Store, actions$: Actions) {
    super(FacilityIndexState, 'Key', EntityIdGenerator, service, store, logger, actions$);
  }
}
