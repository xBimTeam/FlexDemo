import { Component, OnInit } from '@angular/core';
import { ClearActive, GoToPage, SetPageSize } from '@ngxs-labs/entity-state';
import { Select, Store } from '@ngxs/store';
import {
  AssetComparer, AssetFilterItem, AssetModelFilterItem, ActivateAssetModelFilterAction, AddAssetFilterAction,
  AssetEntityState, AssetFilterState, ConnectToAsset, DeactivateAssetModelFilterAction, DisconnectFromAsset,
  Expand, RemoveAssetFilterAction, SetActive, SetExpands
} from '@xbim/flex-webkit';
import { Asset } from '@xbim/flex-api';
import { GridColumnDefinition } from '@xbim/grid';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { DateCreatedColumns } from '../../common-columns';
import { Navigate } from '@ngxs/router-plugin';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-asset-index',
  templateUrl: './asset-index.component.html',
  styleUrls: ['./asset-index.component.scss']
})
export class AssetIndexComponent implements OnInit {

  constructor(private store: Store,
    private route: ActivatedRoute,
    private logger: NGXLogger) {
  }

  @Select(AssetFilterState.assetFilters) assetFilters$: Observable<AssetFilterItem[]>;
  @Select(AssetFilterState.assetFilterCount) assetFilterCount$: Observable<number>;
  @Select(AssetFilterState.oDataFilter) oDataFilter$: Observable<string>;


  public definedColumns: GridColumnDefinition[] = [

    {
      id: 'AssetId',
      title: 'Id',
      format: 'Integer'
    },
    {
      id: 'Name',
      isPrimary: true,
      selectAction: (row, _) => this.openAsset(row)
    },
    ...DateCreatedColumns,
    {
      id: 'Models',
      title: '# Models',
      fieldType: 'Badge',
      field: 'Models@odata.count',
      orderbyField: 'Models/$count',
      badgeIcon: 'room'
    }
  ];

  orderedColumns = ['Select', 'Name', 'AssetId', 'DateCreated', 'Models'];
  public stateType = AssetEntityState;
  public comparer = new AssetComparer();

  ngOnInit() {
    // loads the asset data unless we've recently loaded it
    if (this.store.selectSnapshot(AssetEntityState.isStale())) {
      this.store.dispatch([
        new SetPageSize(AssetEntityState, 10),
        new SetExpands<Asset>(AssetEntityState, new Expand('Models', '$count=true;$select=AssetModelId,Name,SegmentName'))]);
      this.store.dispatch(new GoToPage(AssetEntityState, { first: true }));
    } else {
      this.logger.debug('Cached: Age %d ms', this.store.selectSnapshot(AssetEntityState.age));
    }
  }

  openAsset(row: Asset) {
    this.logger.debug('Navigate to ', row);
    this.store.dispatch([
      new SetActive(AssetEntityState, row.AssetId),
      new Navigate(['../3DView'], null, { relativeTo: this.route })
    ]);
  }

  public activateAsset(asset: Asset) {

    this.store.dispatch([
      new SetActive(AssetEntityState, asset.AssetId.toString()),
      new AddAssetFilterAction(asset),
      new ConnectToAsset(asset)]);
  }

  public deactivateAsset(asset: Asset) {

    this.store.dispatch([
      new ClearActive(AssetEntityState),
      new DisconnectFromAsset()]);
    const filters = this.store.selectSnapshot(AssetFilterState.assetFilters);
    filters.forEach(filter => {
      if (filter.asset.AssetId === asset.AssetId) {
        this.store.dispatch(new RemoveAssetFilterAction(filter));
      }
    });
  }

  public toggleModelFilter(assetModelFilter: AssetModelFilterItem) {
    if (assetModelFilter.isActive) {
      this.store.dispatch(new DeactivateAssetModelFilterAction(assetModelFilter.assetModel));
    } else {
      this.store.dispatch(new ActivateAssetModelFilterAction(assetModelFilter.assetModel));
    }

  }
}
