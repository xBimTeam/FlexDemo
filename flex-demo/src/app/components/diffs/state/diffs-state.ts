import { Inject } from '@angular/core';
import { State, Store, Actions, Action, StateContext } from '@ngxs/store';
import {
    ODataEntityState, ODataEntityStateModel, GuidGenerator, odataDefaultEntityState, TenantEntityState
} from '@xbim/flex-webkit';
import { ModelMapping, ModelMappingClient, ModelsClient, Tenant } from '@xbim/flex-api';
import { NGXLogger } from 'ngx-logger';
import { ModelMappingRepository, ModelMappingService } from './diff-service.providers';
import { GenerateDifferences } from './diff-actions';
import { tap } from 'rxjs/operators';



@State<ODataEntityStateModel<ModelMapping>>({
    name: 'demodiffs',
    defaults: odataDefaultEntityState(
        {
            orderCriteria: [{ field: 'DateCreated', direction: 'desc' }]
        })
})
export class ModelMappingState extends ODataEntityState<ModelMapping, ModelMappingClient> {
    constructor(@Inject(ModelMappingService) repository: ModelMappingRepository, logger: NGXLogger, store: Store, actions$: Actions,
        private modelsClient: ModelsClient,) {

        super(ModelMappingState, 'MappingId', GuidGenerator, repository, store, logger, actions$, false);
    }

    @Action(GenerateDifferences)
    async generateDifferences(ctx: StateContext<ODataEntityStateModel<ModelMapping>>, action: GenerateDifferences) {
        const state = ctx.getState();
        ctx.patchState({ saving: true });

        try {

            const tenant: Tenant = this.store.selectSnapshot(TenantEntityState.active);

            await this.modelsClient.postGenerateModelMapping(action.sourceModelId, action.revisedModelId, tenant.TenantId)
                .pipe(tap(mapping => {
                    super.add(ctx, { payload: mapping });

                    ctx.patchState({
                        itemTotal: (state.itemTotal || 0) + 1,
                        saving: false,
                        error: undefined
                    });
                })).toPromise();
        }
        catch (err) {
            this.handleUpdateError(err, ctx);
        }
        finally {
            ctx.patchState({ saving: false });
        }
    }
}
