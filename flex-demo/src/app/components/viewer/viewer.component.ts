import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GoToPage, SetPageSize, ClearActive } from '@ngxs-labs/entity-state';
import { Select, Store, Actions, ofActionSuccessful } from '@ngxs/store';
import {
  AddEntityState, AssetEntityState, CanvasService, Expand, LoadModelsIntoView, ModelRef,
  ModelType, RemoveEntityState, SetCurrentView, SetDetailImage, SetExpands, SetIsolatedEntities, SetOrderBys,
  SetRepresentationColour, SetViewerProperties, SortOrder, TenantEntityState, UnloadView, ViewerEntityState,
  ViewerStateSelectors, ViewerStyle, SetDefaultViewPoint, ViewStateModel, SetActive, ModelDefinition, ClearViews,
  SetFilter
} from '@xbim/flex-webkit';
import { Asset, Tenant, Model } from '@xbim/flex-api';
import { NGXLogger } from 'ngx-logger';
import { Observable, Subject } from 'rxjs';
import { skipWhile, take, takeUntil, tap, distinctUntilKeyChanged, distinctUntilChanged } from 'rxjs/operators';
import { ViewType } from '@xbim/viewer';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnDestroy {

  // @Select(AssetFilterState.assetFilters) assetFilters$: Observable<AssetFilterItem[]>;
  @Select(AssetEntityState.entities) assets$: Observable<Asset[]>;
  @Select(AssetEntityState.active) activeAsset$: Observable<Asset>;
  @Select(AssetEntityState.itemsTotal) assetCount$: Observable<number>;
  @Select(TenantEntityState.active) activeTenant$: Observable<Tenant>;
  @Select(TenantEntityState.entities) tenants$: Observable<Tenant[]>;
  @Select(ViewerStateSelectors.canvasId) canvasId$: Observable<string>;
  @Select(ViewerStateSelectors.picked(null)) picked$: Observable<Array<{ assetModel: ModelRef, entityId: number, xyz: number[] }>>;
  @Select(ViewerStateSelectors.selection(null)) selected$: Observable<Array<{ assetModel: ModelRef, entityId: number }>>;
  @Select(ViewerStateSelectors.detailImage(null)) detail$: Observable<HTMLImageElement>;
  @Select(ViewerStateSelectors.currentViewId) currentViewId$: Observable<string>;
  @Select(ViewerStateSelectors.fps) fps$: Observable<number>;
  @Select(ViewerStateSelectors.hoverOver(null)) hoverOver$: Observable<{ assetModel: ModelRef, entityId: number, x: number, y: number }>;
  @Select(ViewerStateSelectors.modelsLoading()) modelLoading$: Observable<{ loading: boolean, percent: number }>;
  @Select(ViewerStateSelectors.activeView(null)) activeView$: Observable<ViewStateModel>;


  private destroy$ = new Subject<void>();

  DefaultTypes: ModelType[] = [
    ModelType.ENVELOPE,
    ModelType.WINDOWS_DOORS,
    ModelType.SITE,
    ModelType.COMPONENT,
    /*ModelType.SPATIAL_STRUCTURE */];

  public properties: { assetModel: ModelRef, entityId: number, x: number, y: number } = { assetModel: null, entityId: null, x: 0, y: 0 };
  public showDetails = false;

  constructor(private store: Store,
    private route: ActivatedRoute,
    private canvasService: CanvasService,
    private logger: NGXLogger,
    private actions$: Actions) { }

  public get currentViewId(): string {
    return this.store.selectSnapshot(ViewerStateSelectors.currentViewId);
  }

  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();

    // Clear any loaded views in the viewer
    this.store.dispatch(new ClearViews());
  }

  ngOnInit() {

    this.activeTenant$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tenant) => {
        if (tenant != null && tenant.TenantId != null) {
          this.store.dispatch([
            new SetPageSize(AssetEntityState, 50),
            new SetExpands(AssetEntityState, new Expand('Models')),
            new SetOrderBys(AssetEntityState, new SortOrder<Asset>('DateCreated', 'desc')),
            new SetFilter(AssetEntityState, 'Models/any(m:m/ProcessingStatus eq \'Completed\')')
          ]
          )
            .subscribe(() => this.store.dispatch(new GoToPage(AssetEntityState, { first: true })));
        }
      });

    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((p: Params) => {
        const assetIdStr = p.assetId;
        if (assetIdStr == null) {
          return;
        }
        const assetId = +assetIdStr;
        this.assets$.pipe(skipWhile(v => v == null || v.length === 0), take(1)).subscribe(assets => {
          const asset = assets.find(a => a.AssetId === assetId);
          if (asset != null) {
            this.setActive(asset);
          }
        });
      });

    // set current canvas
    const canvasContainer = document.getElementById('viewer_canvas') as HTMLElement;
    this.canvasId$
      .pipe(takeUntil(this.destroy$))
      .subscribe(canvasId => {
        if (canvasId != null) {
          canvasContainer.innerHTML = '';
          const canvas = this.canvasService.GetCanvas(canvasId);
          canvasContainer.appendChild(canvas);
        }
      });

    this.picked$
      .pipe(takeUntil(this.destroy$))
      .subscribe(pick => {
        if (pick == null || pick.length === 0) {
          return;
        }
        this.selected$.pipe(
          takeUntil(this.destroy$),
          take(1)).subscribe(selection => {
            if (selection == null || selection.length === 0) {
              this.store.dispatch(new AddEntityState(this.currentViewId, ViewerEntityState.HIGHLIGHTED, pick));

              return;
            }

            const unselect =
              pick.filter(p => selection.find(s =>
                s.entityId === p.entityId &&
                s.assetModel.assetModelId === p.assetModel.assetModelId) != null);
            const select =
              pick.filter(p => selection.find(s =>
                s.entityId !== p.entityId ||
                s.assetModel.assetModelId !== p.assetModel.assetModelId) != null);


            this.store.dispatch(new AddEntityState(this.currentViewId, ViewerEntityState.HIGHLIGHTED, select));
            this.store.dispatch(new RemoveEntityState(this.currentViewId, ViewerEntityState.HIGHLIGHTED, unselect));

          });
        this.store.dispatch(new SetDetailImage(this.currentViewId, 640, 360, pick));
      });

    this.detail$
      .pipe(takeUntil(this.destroy$))
      .subscribe(img => {
        const container = document.getElementById('detail-view');
        container.innerHTML = null;

        if (img != null) {
          img.height = 90;
          container.appendChild(img);
          this.showDetails = true;
        } else {
          this.showDetails = false;
        }
      });

    this.hoverOver$.pipe(takeUntil(this.destroy$))
      .subscribe(hov => {
        this.properties = hov;
      }, err => this.logger.error(err));

    this.actions$
      .pipe(
        takeUntil(this.destroy$),
        ofActionSuccessful(LoadModelsIntoView),
        tap(m => this.logger.debug('Setting default view', m))
      )
      .subscribe((action: LoadModelsIntoView) => {
        this.store.dispatch(new SetDefaultViewPoint(this.currentViewId, ViewType.DEFAULT));
      });

    this.activeAsset$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => a && b && a.AssetId === b.AssetId)
      )
      .subscribe(asset => {
        if (asset) {
          this.load3DModel(asset);
        }
      });
  }

  setActive(asset: Asset) {
    this.store.dispatch(new SetActive(AssetEntityState, asset.AssetId));
  }

  load3DModel(asset: Asset) {
    const currentViewId = `view-${asset.AssetId}-${asset.Name}`;
    this.store.dispatch(new SetCurrentView(currentViewId));
    if (!asset.Models || asset.Models.length === 0) {
      return;
    }

    const models = this.splitModelsByType(asset.Models, this.DefaultTypes);

    this.store.dispatch(new SetViewerProperties(currentViewId, { navigationCubeOn: true, hoverHighlightOn: true, loaderOverlayOn: true }));
    this.store.dispatch(new LoadModelsIntoView(currentViewId, models));

  }

  private splitModelsByType(enabledModels: Model[], types: ModelType[], params?: {}): ModelDefinition[] {

    let result = [];
    types.forEach(type => {
      result = result.concat(enabledModels.map(m => ({ model: m, type, queryParams: params })));
    });
    return result;
  }

  deselect(entity: { assetModel: ModelRef, entityId: number }) {
    this.store.dispatch(new RemoveEntityState(this.currentViewId, ViewerEntityState.HIGHLIGHTED, [entity]));
  }

  unloadCurrentView() {
    if (this.currentViewId != null) {
      this.store.dispatch(new UnloadView(this.currentViewId));
    }
    this.store.dispatch(new ClearActive(AssetEntityState));
  }

  /**
   * Gets selected entities and isolates them in the view
   */
  isolate() {
    this.selected$.pipe(
      take(1)
    )
      .subscribe(entities => {
        this.store.dispatch(new SetIsolatedEntities(this.currentViewId, entities));
      });
  }

  makeRed() {
    this.selected$.pipe(
      take(1)
    )
      .subscribe(entities => {
        this.store.dispatch(new SetRepresentationColour(this.currentViewId, ViewerStyle.RED_80, entities));
      });
  }
}
