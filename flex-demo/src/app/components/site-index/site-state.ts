import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import {
  EntityIdGenerator, ODataAimEntityStateModel, odataDefaultAimEntityState,
  ODataEntityState, SiteService, SiteRepository
} from '@xbim/flex-webkit';
import { Site, SitesClient } from '@xbim/flex-api';
import { NGXLogger } from 'ngx-logger';



@State<ODataAimEntityStateModel<Site>>({
  name: 'demosites',
  defaults: odataDefaultAimEntityState(
    {
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class SiteIndexState extends ODataEntityState<Site, SitesClient> {
  constructor(@Inject(SiteService) repository: SiteRepository, logger: NGXLogger, store: Store, actions$: Actions) {

    super(SiteIndexState, 'Key', EntityIdGenerator, repository, store, logger, actions$);
  }
}
