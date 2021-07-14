import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { SetActive } from '@ngxs-labs/entity-state';
import { Dictionary } from '@ngxs-labs/entity-state/lib/internal';
import { Store, Actions, Select, ofActionSuccessful } from '@ngxs/store';
import { ModelInfo, ModelMapping, Component as ComponentItem } from '@xbim/flex-api';
import { CanvasService, DisableViews, EnableViews, Expand, Get, LoadModelIntoView, LoadModelsIntoView, ModelDefinition, ModelRef, ModelType, SetCurrentView, SetDefaultViewPoint, SetExpands, SetRepresentationColourForProduct, SetViewerProperties, ViewerStateSelectors, ViewerStyle } from '@xbim/flex-webkit';
import { Product, RenderingMode, ViewType } from '@xbim/viewer';
import { NGXLogger } from 'ngx-logger';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { ModelMappingState } from '../../shared/state/diffs-state';
import { TooltipState } from './tooltip/tooltip.state';


const tooltipDelayMs = 1000;
@Component({
  selector: 'app-diff-detail',
  templateUrl: './diff-detail.component.html',
  styleUrls: ['./diff-detail.component.scss']
})
export class DiffDetailComponent implements OnInit, OnDestroy {

  @Select(ViewerStateSelectors.canvasId) canvasId$: Observable<string>;
  @Select(ViewerStateSelectors.modelsLoading()) modelLoading$: Observable<{ loading: boolean, percent: number }>;
  @Select(ModelMappingState.active) activeDiff$!: Observable<ModelMapping>;
  @Select(ModelMappingState.loading) mappingLoading$: Observable<boolean>;
  @Select(ViewerStateSelectors.hoverOver(null)) hoverOver$: Observable<{ assetModel: ModelRef, entityId: number, x: number, y: number }>;
  @Select(TooltipState.entitiesMap) entityMap$: Observable<Dictionary<ComponentItem>>;
  @Select(TooltipState.active) tooltipData$: Observable<ComponentItem>;
  @Select(TooltipState.loading) tooltipLoading$: Observable<boolean>;


  models$ = this.activeDiff$.pipe(map(m => [m.SourceAssetModel, m.TargetAssetModel]));

  viewId: string;
  public mappingId: string;
  private destroy$ = new Subject<void>();
  public showTooltip = false;
  currentHover: { assetModel: ModelRef, entityId: number, x: number, y: number } = undefined;

  DefaultTypes: ModelType[] = [
    ModelType.ENVELOPE,
    ModelType.WINDOWS_DOORS,
    ModelType.SITE,
    ModelType.COMPONENT,
    ModelType.SPATIAL_STRUCTURE
  ];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private canvasService: CanvasService,
    private logger: NGXLogger,
    private actions$: Actions) {


  }

  ngOnInit(): void {
    const canvasContainer = document.getElementById('viewer_canvas') as HTMLElement;
    this.setupCanvas(canvasContainer);

    this.setDefaultViewWhen3DLoaded();
    this.loadModelsWhenDiffChanges();
    this.loadDiffWhenParameterChanges();
    this.monitorTooltips();
  }
  monitorTooltips() {
    combineLatest([this.hoverOver$, this.entityMap$])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(([currhov, _], [prevhov, __]) => // dedupe the xy so we only fire a a request off once.
          currhov && prevhov
          && currhov.assetModel && prevhov.assetModel
          && currhov.entityId === prevhov.entityId
          && currhov.assetModel.assetModelId === prevhov.assetModel.assetModelId),
        tap(([h]) => {
          this.showTooltip = false;
          this.currentHover = h;
        }),  // track move before dedupe
        debounceTime(tooltipDelayMs),
        switchMap(async ([hov, entities]) => {
          if (hov && hov.assetModel) {
            const key = `${hov.assetModel.assetModelId}.${hov.entityId}`;
            if (!entities[key]) {
              this.logger.debug('Loading tooltip', key);
              await this.store.dispatch(new Get(TooltipState, { AssetModelId: hov.assetModel.assetModelId, EntityId: hov.entityId }))
                .toPromise();
            }
            this.store.dispatch(new SetActive(TooltipState, key));
            return hov;
          }
          return null;
        })
      )
      .subscribe(hov => {
        if (hov) {
          this.showTooltip = true;
        }
      }, err => this.logger.error(err));


  }

  private loadDiffWhenParameterChanges() {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      this.mappingId = params['id'];

      this.loadDiff(this.mappingId);
    });
  }

  private loadModelsWhenDiffChanges() {
    this.activeDiff$
      .pipe(takeUntil(this.destroy$))
      .subscribe(diff => {
        console.log('Active changed', diff);
        if (diff) {

          this.load3DModels(diff);
        }
      });
  }

  private setupCanvas(canvasContainer: HTMLElement) {
    this.canvasId$
      .pipe(takeUntil(this.destroy$))
      .subscribe(canvasId => {
        if (canvasId != null) {
          canvasContainer.innerHTML = '';
          const canvas = this.canvasService.GetCanvas(canvasId);
          canvasContainer.appendChild(canvas);
        }
      });
  }

  load3DModels(diff: ModelMapping) {

    this.viewId = `diffview-${diff.MappingId}`;
    this.store.dispatch(new SetCurrentView(this.viewId));
    if (!diff.SourceAssetModel || !diff.TargetAssetModel) {
      console.log('No model');
      return;
    }

    const models = [diff.SourceAssetModel, diff.TargetAssetModel];
    const shards = this.splitModelsByType(models, this.DefaultTypes);

    this.initialise3DView();


    this.store.dispatch([

      new LoadModelsIntoView(this.viewId, shards)
    ]);
  }

  changeSelected(event: MatSelectionListChange) {

    if (event.option.selected) {
      const modelStates = this.store.selectSnapshot(ViewerStateSelectors.disabledModels(this.viewId));
      const wexbims = modelStates.filter(s => s.assetModelId === event.option.value).map(ms => ms.wexbimId);
      this.store.dispatch(new EnableViews(this.viewId, wexbims));
    } else {
      const modelStates = this.store.selectSnapshot(ViewerStateSelectors.activeModels(this.viewId));
      const wexbims = modelStates.filter(s => s.assetModelId === event.option.value).map(ms => ms.wexbimId);
      this.store.dispatch(new DisableViews(this.viewId, wexbims));

    }
  }


  private initialise3DView() {
    this.store.dispatch(
      [new SetViewerProperties(this.viewId, {
        navigationCubeOn: true, hoverHighlightOn: true, hoverHighlightColour: [0, 0, 255, 180], loaderOverlayOn: true, renderingMode: RenderingMode.NORMAL, navigationGridOn: false,

        showSpaces: false
      }),
      new SetRepresentationColourForProduct(this.viewId, ViewerStyle.DEFAULT, undefined, undefined),]);
  }

  private setDefaultViewWhen3DLoaded() {
    this.actions$
      .pipe(
        takeUntil(this.destroy$),
        ofActionSuccessful(LoadModelsIntoView),
        tap(m => this.logger.debug('Setting default view', m))
      )
      .subscribe((action: LoadModelsIntoView) => {
        this.zoomToDefault();
      });

    this.actions$
      .pipe(
        take(1),
        ofActionSuccessful(LoadModelIntoView),
        tap(m => this.logger.debug('Setting default view', m))
      )
      .subscribe((action: LoadModelsIntoView) => {
        this.zoomToDefault();
      });
  }

  private zoomToDefault() {
    const viewId = this.store.selectSnapshot(ViewerStateSelectors.currentViewId);

    this.store.dispatch([
      new SetDefaultViewPoint(viewId, ViewType.DEFAULT),
    ]);
  }

  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDiff(id: string) {

    const query = `$select=Name,Description,AssetModelId,ExternalObjectName,EntityId,ExternalIdentifier;$count=true;$orderby=Name;$filter=IfcType/Classifications/any(a:a/Name eq 'BuildingElement');$expand=IfcType($expand=Classifications($top=0));`;
    this.store.dispatch([
      new SetExpands(ModelMappingState, [
        new Expand('SourceAssetModel'),
        new Expand('TargetAssetModel'),
        new Expand('MappedEntities', '$top=1000;$expand=SourceEntity,TargetEntity'),
        new Expand('LostEntities', query),
        new Expand('FoundEntities', query),
        new Expand('CandidateMatches', '$count=true;$expand=Matches($expand=TargetEntity;$orderby=PercentConfidence desc),SourceEntity'),
      ]),
      new Get(ModelMappingState, id),
      new SetActive(ModelMappingState, id)
    ]);
  }

  private splitModelsByType(enabledModels: ModelInfo[], types: ModelType[], params?: {}): ModelDefinition[] {

    let result = [];
    types.forEach(type => {
      result = result.concat(enabledModels.map(m => ({ model: m, type, queryParams: params })));
    });
    return result;
  }

  resetView() {
    this.initialise3DView();
  }

  showDifferences() {
    const diff: ModelMapping = this.store.selectSnapshot(ModelMappingState.active);
    const productsToShow = Product.getByName('IfcProduct');
    const spacesToShow = Product.getByName('IfcSpace');

    this.store.dispatch([

      new SetRepresentationColourForProduct(this.viewId, ViewerStyle.GREEN_80, productsToShow, diff.TargetAssetModel.AssetModelId),
      new SetRepresentationColourForProduct(this.viewId, ViewerStyle.RED_80, productsToShow, diff.SourceAssetModel.AssetModelId),
      new SetRepresentationColourForProduct(this.viewId, ViewerStyle.GREEN_30, spacesToShow, diff.TargetAssetModel.AssetModelId),
      new SetRepresentationColourForProduct(this.viewId, ViewerStyle.RED_30, spacesToShow, diff.SourceAssetModel.AssetModelId),

    ]);
  }
}


