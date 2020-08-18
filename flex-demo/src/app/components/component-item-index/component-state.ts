import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import {
  ComponentService, EntityIdGenerator, ODataAimEntityStateModel,
  odataDefaultAimEntityState, ODataEntityState, ComponentRepository
} from '@xbim/flex-webkit';
import { Component as ComponentItem, ComponentsClient } from '@xbim/flex-api';
import { NGXLogger } from 'ngx-logger';



@State<ODataAimEntityStateModel<ComponentItem>>({
  name: 'democomponents',
  defaults: odataDefaultAimEntityState(
    {
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class ComponentIndexState extends ODataEntityState<ComponentItem, ComponentsClient> {
  constructor(@Inject(ComponentService) repository: ComponentRepository, logger: NGXLogger, store: Store, actions$: Actions) {

    super(ComponentIndexState, 'Key', EntityIdGenerator, repository, store, logger, actions$);
  }
}
