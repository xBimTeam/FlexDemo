import { Component, OnInit } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Model } from '@xbim/flex-api';
import { EntityComparer, AssetFilterItem, AssetFilterState, AssetModelEntityState } from '@xbim/flex-webkit';
import { GridColumnDefinition } from '@xbim/grid';
import { NGXLogger } from 'ngx-logger';
import { combineLatest, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GenerateDifferences } from '../diffs/shared/state/diff-actions';
import { ModelMappingState } from '../diffs/shared/state/diffs-state';

@Component({
  selector: 'app-asset-models',
  templateUrl: './asset-models.component.html',
  styleUrls: ['./asset-models.component.scss']
})
export class AssetModelsComponent implements OnInit {

  constructor(private store: Store,
    private logger: NGXLogger) { }

  @Select(AssetFilterState.assetFilterCount) assetFilterCount$: Observable<number>;
  @Select(AssetFilterState.assetFilters) assetFilters$: Observable<AssetFilterItem[]>;
  @Select(AssetModelEntityState.selection) selected$!: Observable<string[]>;
  @Select(ModelMappingState.saving) saving$!: Observable<boolean>;

  public diffEnabled$ = combineLatest([this.selected$, this.saving$]).pipe(map(([sel, saving]) => sel.length === 2 && !saving));

  definedColumns: GridColumnDefinition[] = [
    {
      id: 'DateUploaded',
      title: 'Date Uploaded',
      format: 'Date',
      prefixIcon: 'calendar_today'
    },
    {
      id: 'Name',
      isPrimary: true
    },
    {
      id: 'AssetName',
      title: 'Asset'
    },
    {
      id: 'AssetModelId',
      title: 'Id',
      format: 'Integer',
    },
    {
      id: 'AssetId',
      title: 'Asset Id',
      format: 'Integer'
    },
    {
      id: 'SegmentName',
      title: 'Segment',
    },
    {
      id: 'Revision'
    },
    {
      id: 'Status'
    },
    {
      id: 'ModelSize',
      title: 'File Size',
      format: 'Integer'
    },
    {
      id: 'ProcessingStatus'
    },
    {
      id: 'ProcessingStage'
    }
    // Systems, Type
  ];

  orderedColumns = ['Select', 'Name', 'AssetName', 'Revision', 'Status', 'ProcessingStatus', 'ModelSize', 'DateUploaded'];
  public stateType = AssetModelEntityState;
  public comparer = new EntityComparer();


  ngOnInit() {

    // this.store.dispatch(new AddExpands(AssetModelEntityState, [
    //   new Expand('Segment', "$select=Discipline"),
    // ]));
  }

  createDiff() {
    const selections: Model[] = this.store.selectSnapshot(AssetModelEntityState.selectedEntities);
    if (!selections || selections.length != 2) {
      return;
    }
    const first = selections[0];
    const second = selections[1];

    this.store.dispatch(new GenerateDifferences(first.AssetModelId, second.AssetModelId)).pipe(tap(_ =>
      this.store.dispatch(new Navigate(['../diffs']))));

  }

}
