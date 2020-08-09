import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { EntityComparer, AddExpands, Expand } from '@xbim/flex-webkit';
import { GridColumnDefinition } from '@xbim/grid';
import { NGXLogger } from 'ngx-logger';
import { CommonEntityColumns } from '../../common-columns';
import { ComponentTypeIndexState } from './component-type-state';

@Component({
  selector: 'app-component-type-index',
  templateUrl: './component-type-index.component.html',
  styleUrls: ['./component-type-index.component.scss']
})
export class ComponentTypeIndexComponent implements OnInit {
  constructor(private store: Store,
    private logger: NGXLogger) { }
  definedColumns: GridColumnDefinition[] = [
    ...CommonEntityColumns,
    {
      id: 'Components',
      title: '# Components',
      fieldType: 'Badge',
      field: 'Components@odata.count',
      orderbyField: 'Components/$count',
      badgeIcon: 'room'
    }
  ];

  orderedColumns = ['Name', 'Description', 'ModelName', 'DateModified'];
  public stateType = ComponentTypeIndexState;
  public comparer = new EntityComparer();


  ngOnInit() {

    this.store.dispatch(new AddExpands(ComponentTypeIndexState, [
      new Expand('Components', '$count=true;$select=Name;$top=10'),
    ]));
  }

  // Code to add Images to Types

  // this.componentTypes$.subscribe(items => {
  //   if (items == null || items.length === 0) {
  //     return items;
  //   }
  //   const entities = items.map(item => new EntityRef(item.ComponentEntities[0].EntityId, item.AssetModelId));
  //   this.store
  //     .dispatch(new SetDetailImages(160, 90, ViewType.DEFAULT, entities))
  //     .subscribe(() => {
  //       this.store.selectOnce(ViewerStateSelectors.detailViews)
  //         .subscribe(images => {
  //           if (images == null) {
  //             return;
  //           }
  //           const iterator = images.keys();
  //           let key = iterator.next();
  //           while (!key.done) {
  //             const item = items
  //               .find(i => i.ComponentEntities != null && i.ComponentEntities.length > 0
  //                 && i.ComponentEntities[0].EntityId === key.value.entityId);
  //             if (item == null) {
  //               return;
  //             }
  //             item['imgSrc'] = images.get(key.value).src;
  //             key = iterator.next();
  //           }
  //         });
  //     }
  //     );
  // });
}
