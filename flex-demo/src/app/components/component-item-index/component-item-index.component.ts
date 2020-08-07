import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { EntityComparer, AddExpands } from '@xbim/flex-webkit';
import { GridColumnDefinition } from '@xbim/grid';
import { CommonEntityColumns } from '../../common-columns';
import { ComponentIndexState } from './component-state';

@Component({
  selector: 'app-component-item-index',
  templateUrl: './component-item-index.component.html',
  styleUrls: ['./component-item-index.component.scss']
})
export class ComponentItemIndexComponent implements OnInit {

  constructor(private store: Store) { }

  definedColumns: GridColumnDefinition[] = [
    ...CommonEntityColumns,
    {
      id: 'ComponentTypeName',
      title: 'Type'
    },
    {
      id: 'ComponentTypeId',
      title: 'Type #'
    },
    {
      id: 'Spaces',
      title: '# Spaces',
      fieldType: "Badge",
      field: 'Spaces@odata.count',
      orderbyField: 'Spaces/$count',
      badgeIcon: 'room'
    }
    // Systems, Type
  ];

  orderedColumns = ['Name', 'Description', 'ComponentTypeName', 'ModelName', 'DateModified'];
  public stateType = ComponentIndexState;
  public comparer = new EntityComparer();


  ngOnInit() {

    this.store.dispatch(new AddExpands(ComponentIndexState, [
      //new Expand('Spaces', "$count=true;$select=Name;$top=10"),
    ]));
  }

  // // you can have as many deailed item views as you wish, just provide appropriate keys i.e. detailedItem('B'),
  // // detailedItem('Main'), detailedItem('First') etc.
  // @Select(ComponentItemIndexState.detailedItem('A')) detailedItemA$: Observable<number>;

  // build a schedule
  // const scheduleTemplate = {
  //   name: 'Window',
  //   columns: [
  //     {
  //       columnName: 'Width',
  //       propertyMappings: [
  //         { groupType: 'AimSystemAttribute', groupName: 'IfcWindow', name: 'Width' },
  //         { groupType: 'QuantityAttribute', groupName: 'BaseQuantities', name: 'Width' }
  //       ],
  //       dataType: 'Real',
  //       displayUnit: 'metre'
  //     },
  //     {
  //       columnName: 'Height',
  //       propertyMappings: [
  //         { groupType: 'AimSystemAttribute', groupName: 'IfcWindow', name: 'Height' },
  //         { groupType: 'QuantityAttribute', groupName: 'BaseQuantities', name: 'Height' }
  //       ],
  //       dataType: 'Real',
  //       displayUnit: 'metre'
  //     }]
  // };



  // public getDetailedItemA(summaryComponent: ComponentItem) {
  //   this.store.dispatch(new GetComponentItemDetailAction('A', summaryComponent));
  // }

}
