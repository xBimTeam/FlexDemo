import { Inject } from '@angular/core';
import { State, Store, Actions, Action, StateContext, Selector } from '@ngxs/store';
import {
    ODataEntityState, ODataEntityStateModel, GuidGenerator, odataDefaultEntityState, TenantEntityState
} from '@xbim/flex-webkit';
import { Entity, EntityMappingInfo, EntityMatchInfo, ModelMapping, ModelMappingClient, ModelsClient, Tenant } from '@xbim/flex-api';
import { NGXLogger } from 'ngx-logger';
import { ModelMappingRepository, ModelMappingService } from './diff-service.providers';
import { GenerateDifferences } from './diff-actions';
import { tap } from 'rxjs/operators';
import { EntityState } from '@ngxs-labs/entity-state';


function groupBy<T>(objectArray: Array<T>, property: keyof T): { [key: string]: T[] } {
    const initial: { [key: string]: T[] } = {};
    return objectArray.reduce(function (acc, obj) {
        if (!obj || !obj[property]) {
            console.warn('object or key is undefined', obj);
            return acc;
        }
        const key = obj[property].toString();
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, initial);
}

export interface GroupedEntities {
    key: string;
    entities: Entity[];
}

export interface GroupedEntityMatches {
    key: string;
    matches: EntityMatchInfo[];
}

export interface GroupedEntityMapping {
    key: string;
    map: EntityMappingInfo[];
}
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


    @Selector([ModelMappingState.active])
    static lostEntities(state: ModelMapping): Entity[] {
        return state.LostEntities;
    }

    @Selector([ModelMappingState.active])
    static foundEntities(state: ModelMapping): Entity[] {
        return state.FoundEntities;
    }

    @Selector([ModelMappingState.active])
    static candidateEntities(state: ModelMapping): EntityMatchInfo[] {
        return state.CandidateMatches;
    }

    @Selector([ModelMappingState.active])
    static mappedEntities(state: ModelMapping): EntityMappingInfo[] {
        return state.MappedEntities;
    }

    /** Summarises the lost entities by type
     */
    @Selector([ModelMappingState.lostEntities])
    static lostEntitiesByType(state: Entity[]): GroupedEntities[] {
        return ModelMappingState.groupByField(state);
    }

    /** Summarises the found entities by type
     */
    @Selector([ModelMappingState.foundEntities])
    static foundEntitiesByType(state: Entity[]): GroupedEntities[] {
        return ModelMappingState.groupByField(state);
    }

    /** Summarises the candidate mappings
    */
    @Selector([ModelMappingState.candidateEntities])
    static candidateEntitiesByType(state: EntityMatchInfo[]): GroupedEntityMatches[] {
        const results: GroupedEntityMatches[] = [];
        var togroup = state.map(c => ({ type: c.SourceEntity.ExternalObjectName || '', item: c }));
        const grouped = groupBy(togroup, 'type');

        Object.getOwnPropertyNames(grouped).sort((a, b) => a.localeCompare(b)).forEach(k => {
            const items = grouped[k].map(i => i.item);
            results.push({ key: k, matches: items });
        });

        return results;
    }

    @Selector([ModelMappingState.mappedEntities])
    static mappedEntitiesByType(state: EntityMappingInfo[]): GroupedEntityMapping[] {
        const results: GroupedEntityMapping[] = [];
        var togroup = state.map(c => ({ type: c.SourceEntity.ExternalObjectName || '', item: c }));
        const grouped = groupBy(togroup, 'type');

        Object.getOwnPropertyNames(grouped).sort((a, b) => a.localeCompare(b)).forEach(k => {
            const items = grouped[k].map(i => i.item);
            results.push({ key: k, map: items });
        });

        return results;
    }


    private static groupByField(state: Entity[]): GroupedEntities[] {
        const results: GroupedEntities[] = [];
        const grouped = groupBy(state, 'ExternalObjectName');

        Object.getOwnPropertyNames(grouped).forEach(k => {
            results.push({ key: k, entities: grouped[k] });
        });

        return results.sort((a, b) => a.key.localeCompare(b.key));
    }




    // @Selector([ModelMappingState.candidateEntities])
    // static candidateEntitiesByType(state: EntityMatchInfo[]): { [key: string]: EntityMatchInfo[] } {
    //     if (!state || state.length === 0) {
    //         return {};
    //     }
    //     return groupBy(state, 'ExternalObjectName');
    // }


    @Action(GenerateDifferences)
    async generateDifferences(ctx: StateContext<ODataEntityStateModel<ModelMapping>>, action: GenerateDifferences) {
        const state = ctx.getState();
        ctx.patchState({ saving: true });

        try {

            const tenant: Tenant = this.store.selectSnapshot(TenantEntityState.active);

            await this.modelsClient.postGenerateModelMapping(action.sourceModelId, action.revisedModelId, tenant.TenantId)
                .pipe(tap(mapping => {
                    // can't use super as we've over-ridden with extra behaviour to call the API.
                    EntityState.prototype.add.call(this, ctx, { payload: mapping })

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
