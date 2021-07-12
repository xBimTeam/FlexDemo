import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SetActive } from '@ngxs-labs/entity-state';
import { Store, Actions, Select, ofActionSuccessful } from '@ngxs/store';
import { ModelInfo, ModelMapping } from '@xbim/flex-api';
import { AddEntityState, CanvasService, EntityRef, Expand, Get, LoadModelsIntoView, ModelDefinition, ModelType, SetCurrentView, SetDefaultViewPoint, SetExpands, SetRepresentationColour, SetViewerProperties, ViewerEntityState, ViewerStateSelectors, ViewerStyle } from '@xbim/flex-webkit';
import { RenderingMode, ViewType } from '@xbim/viewer';
import { NGXLogger } from 'ngx-logger';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ModelMappingState } from '../state/diffs-state';

@Component({
  selector: 'app-diff-detail',
  templateUrl: './diff-detail.component.html',
  styleUrls: ['./diff-detail.component.scss']
})
export class DiffDetailComponent implements OnInit, OnDestroy {

  @Select(ViewerStateSelectors.canvasId) canvasId$: Observable<string>;
  @Select(ViewerStateSelectors.modelsLoading()) modelLoading$: Observable<{ loading: boolean, percent: number }>;
  @Select(ModelMappingState.active) activeDiff$: Observable<ModelMapping>;



  public mappingId: string;
  private destroy$ = new Subject<void>();
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

    const currentViewId = `diffview-${diff.MappingId}`;
    this.store.dispatch(new SetCurrentView(currentViewId));
    if (!diff.SourceAssetModel || !diff.TargetAssetModel) {
      console.log('No model');
      return;
    }

    const models = [diff.SourceAssetModel, diff.TargetAssetModel];
    const shards = this.splitModelsByType(models, this.DefaultTypes);

    this.store.dispatch(new SetViewerProperties(currentViewId, {
      navigationCubeOn: true, hoverHighlightOn: false, loaderOverlayOn: true, renderingMode: RenderingMode.XRAY_ULTRA, navigationGridOn: false,

      showSpaces: false
    }));


    this.store.dispatch([

      new LoadModelsIntoView(currentViewId, shards)
    ]);
  }

  private setDefaultViewWhen3DLoaded() {
    this.actions$
      .pipe(
        takeUntil(this.destroy$),
        ofActionSuccessful(LoadModelsIntoView),
        tap(m => this.logger.debug('Setting default view', m))
      )
      .subscribe((action: LoadModelsIntoView) => {
        const viewId = this.store.selectSnapshot(ViewerStateSelectors.currentViewId);
        const diff: ModelMapping = this.store.selectSnapshot(ModelMappingState.active);
        const lost = diff.LostEntities.map(e => <EntityRef>{ assetModel: e.AssetModelId, entityId: e.EntityId });
        const found = diff.FoundEntities.map(e => <EntityRef>{ assetModel: e.AssetModelId, entityId: e.EntityId });
        this.store.dispatch([
          new SetDefaultViewPoint(viewId, ViewType.DEFAULT),
          new AddEntityState(viewId, ViewerEntityState.XRAYVISIBLE, lost),
          new AddEntityState(viewId, ViewerEntityState.XRAYVISIBLE, found),
          new SetRepresentationColour(viewId, ViewerStyle.GREEN_80, found),
          new SetRepresentationColour(viewId, ViewerStyle.RED_80, lost),

        ]);


      });
  }

  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDiff(id: string) {

    const query = `$select=Name,Description,AssetModelId,EntityId,ExternalIdentifier;$count=true;$filter=IfcType/Classifications/any(a:a/Name eq 'BuildingElement');$expand=IfcType($expand=Classifications($top=0));`;
    this.store.dispatch([
      new SetExpands(ModelMappingState, [
        new Expand('SourceAssetModel'),
        new Expand('TargetAssetModel'),
        //new Expand('MappedEntities', '$count=true;$top=0'),
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
}


