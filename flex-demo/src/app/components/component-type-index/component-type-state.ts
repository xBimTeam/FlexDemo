import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import {
  ComponentTypeService, EntityIdGenerator, ODataAimEntityStateModel,
  odataDefaultAimEntityState, ODataEntityState, ComponentTypeRepository
} from '@xbim/flex-webkit';
import { ComponentType, ComponentTypesClient } from '@xbim/flex-api';
import { NGXLogger } from 'ngx-logger';


@State<ODataAimEntityStateModel<ComponentType>>({
  name: 'demotypes',
  defaults: odataDefaultAimEntityState(
    {
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class ComponentTypeIndexState extends ODataEntityState<ComponentType, ComponentTypesClient> {
  constructor(@Inject(ComponentTypeService) repository: ComponentTypeRepository, logger: NGXLogger, store: Store, actions$: Actions) {

    super(ComponentTypeIndexState, 'Key', EntityIdGenerator, repository, store, logger, actions$);
  }
}
