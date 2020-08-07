import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import { EntityIdGenerator, ODataAimEntityStateModel, odataDefaultAimEntityState, ODataEntityState, SitesService } from '@xbim/flex-webkit';
import { Site } from '@xbim/flex-api';
import { ODataService } from 'angular-odata-es5';
import { NGXLogger } from 'ngx-logger';



@State<ODataAimEntityStateModel<Site>>({
  name: 'demosites',
  defaults: odataDefaultAimEntityState(
    {
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class SiteIndexState extends ODataEntityState<Site> {
  constructor(@Inject(SitesService) service: ODataService<Site>, logger: NGXLogger, store: Store, actions$: Actions) {
    super(SiteIndexState, 'Key', EntityIdGenerator, service, store, logger, actions$);
  }
}
