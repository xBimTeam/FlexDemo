import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import {
  EntityIdGenerator, FacilityService, ODataAimEntityStateModel,
  odataDefaultAimEntityState, ODataEntityState, FacilityRepository
} from '@xbim/flex-webkit';
import { Facility, FacilitiesClient } from '@xbim/flex-api';
import { NGXLogger } from 'ngx-logger';



@State<ODataAimEntityStateModel<Facility>>({
  name: 'demofacilities',
  defaults: odataDefaultAimEntityState(
    {
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class FacilityIndexState extends ODataEntityState<Facility, FacilitiesClient> {
  constructor(@Inject(FacilityService) repository: FacilityRepository, logger: NGXLogger, store: Store, actions$: Actions) {

    super(FacilityIndexState, 'Key', EntityIdGenerator, repository, store, logger, actions$);
  }
}
