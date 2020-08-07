import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import { DocumentsService, EntityIdGenerator, ODataAimEntityStateModel, odataDefaultAimEntityState, ODataEntityState } from '@xbim/flex-webkit';
import { Document } from '@xbim/flex-api';
import { ODataService } from 'angular-odata-es5';
import { NGXLogger } from 'ngx-logger';



@State<ODataAimEntityStateModel<Document>>({
  name: 'demodocuments',
  defaults: odataDefaultAimEntityState(
    {
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class DocumentIndexState extends ODataEntityState<Document> {
  constructor(@Inject(DocumentsService) service: ODataService<Document>, logger: NGXLogger, store: Store, actions$: Actions) {
    super(DocumentIndexState, 'Key', EntityIdGenerator, service, store, logger, actions$);
  }
}
