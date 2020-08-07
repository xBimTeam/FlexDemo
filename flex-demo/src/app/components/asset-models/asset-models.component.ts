import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { EntityComparer, AssetFilterItem, AssetFilterState, AssetModelEntityState } from '@xbim/flex-webkit';
import { GridColumnDefinition } from '@xbim/grid';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { DateCreatedColumns } from '../../common-columns';

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

  definedColumns: GridColumnDefinition[] = [
    ...DateCreatedColumns,
    {
      id: 'Name',
      isPrimary: true
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

  orderedColumns = ['Name', 'SegmentName', 'AssetModelId', 'Revision', 'Status', 'ProcessingStatus', 'ModelSize'];
  public stateType = AssetModelEntityState;
  public comparer = new EntityComparer();


  ngOnInit() {

    // this.store.dispatch(new AddExpands(AssetModelEntityState, [
    //   new Expand('Segment', "$select=Discipline"),
    // ]));
  }

}
