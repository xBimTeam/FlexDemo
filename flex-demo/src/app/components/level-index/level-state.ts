import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import {
  EntityIdGenerator, LevelService, ODataAimEntityStateModel,
  odataDefaultAimEntityState, ODataEntityState, LevelRepository
} from '@xbim/flex-webkit';
import { Level, LevelsClient } from '@xbim/flex-api';
import { NGXLogger } from 'ngx-logger';



@State<ODataAimEntityStateModel<Level>>({
  name: 'demolevels',
  defaults: odataDefaultAimEntityState(
    {
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class LevelIndexState extends ODataEntityState<Level, LevelsClient> {
  constructor(@Inject(LevelService) repository: LevelRepository, logger: NGXLogger, store: Store, actions$: Actions) {

    super(LevelIndexState, 'Key', EntityIdGenerator, repository, store, logger, actions$);
  }
}
