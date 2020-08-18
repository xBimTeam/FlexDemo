import { Inject } from '@angular/core';
import { State, Store, Actions } from '@ngxs/store';
import {
  DocumentService, EntityIdGenerator, ODataAimEntityStateModel,
  odataDefaultAimEntityState, ODataEntityState, DocumentRepository
} from '@xbim/flex-webkit';
import { Document, DocumentsClient } from '@xbim/flex-api';
import { NGXLogger } from 'ngx-logger';



@State<ODataAimEntityStateModel<Document>>({
  name: 'demodocuments',
  defaults: odataDefaultAimEntityState(
    {
      orderCriteria: [{ field: 'Name', direction: 'asc' }]
    })
})
export class DocumentIndexState extends ODataEntityState<Document, DocumentsClient> {
  constructor(@Inject(DocumentService) repository: DocumentRepository, logger: NGXLogger, store: Store, actions$: Actions) {

    super(DocumentIndexState, 'Key', EntityIdGenerator, repository, store, logger, actions$);
  }
}
