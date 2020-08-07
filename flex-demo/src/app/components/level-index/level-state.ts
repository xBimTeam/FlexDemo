import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import { EntityIdGenerator, LevelsService, ODataAimEntityStateModel, odataDefaultAimEntityState, ODataEntityState } from '@xbim/flex-webkit';
import { Level } from '@xbim/flex-api';
import { ODataService } from 'angular-odata-es5';
import { NGXLogger } from 'ngx-logger';



@State<ODataAimEntityStateModel<Level>>({
  name: 'demolevels',
  defaults: odataDefaultAimEntityState(
    {
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class LevelIndexState extends ODataEntityState<Level> {
  constructor(@Inject(LevelsService) service: ODataService<Level>, logger: NGXLogger, store: Store, actions$: Actions) {
    super(LevelIndexState, 'Key', EntityIdGenerator, service, store, logger, actions$);
  }
}
