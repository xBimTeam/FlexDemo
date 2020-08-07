import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import { ComponentTypesService, EntityIdGenerator, ODataAimEntityStateModel, odataDefaultAimEntityState, ODataEntityState } from '@xbim/flex-webkit';
import { ComponentType } from '@xbim/flex-api';
import { ODataService } from 'angular-odata-es5';
import { NGXLogger } from 'ngx-logger';



@State<ODataAimEntityStateModel<ComponentType>>({
  name: 'demotypes',
  defaults: odataDefaultAimEntityState(
    {
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class ComponentTypeIndexState extends ODataEntityState<ComponentType> {
  constructor(@Inject(ComponentTypesService) service: ODataService<ComponentType>, logger: NGXLogger, store: Store, actions$: Actions) {
    super(ComponentTypeIndexState, 'Key', EntityIdGenerator, service, store, logger, actions$);
  }
}
