import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import { ComponentsService, EntityIdGenerator, ODataAimEntityStateModel, odataDefaultAimEntityState, ODataEntityState } from '@xbim/flex-webkit';
import { Component as ComponentItem } from '@xbim/flex-api';
import { ODataService } from 'angular-odata-es5';
import { NGXLogger } from 'ngx-logger';



@State<ODataAimEntityStateModel<ComponentItem>>({
  name: 'democomponents',
  defaults: odataDefaultAimEntityState(
    {
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class ComponentIndexState extends ODataEntityState<ComponentItem> {
  constructor(@Inject(ComponentsService) service: ODataService<ComponentItem>, logger: NGXLogger, store: Store, actions$: Actions) {
    super(ComponentIndexState, 'Key', EntityIdGenerator, service, store, logger, actions$);
  }
}
