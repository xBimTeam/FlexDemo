import { Component, OnInit, Inject } from '@angular/core';
import { ClearActive } from '@ngxs-labs/entity-state';
import { Store, Select } from '@ngxs/store';
import { AddExpands, ClearFilters, Expand, Query, SetActive, TenantEntityState, TenantComparer, IConfig, APP_CONFIG } from '@xbim/flex-webkit';
import { Tenant } from '@xbim/flex-api';
import { GridColumnDefinition } from '@xbim/grid';
import { NGXLogger } from 'ngx-logger';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';


@Component({
  selector: 'app-tenant-index',
  templateUrl: './tenant-index.component.html',
  styleUrls: ['./tenant-index.component.scss']
})
export class TenantIndexComponent implements OnInit {

  constructor(
    private store: Store,
    private logger: NGXLogger,
    @Inject(APP_CONFIG)
    public config: IConfig) {
  }

  @Select(TenantEntityState.itemsTotal) numberOfTenants$: Observable<number>;
  @Select(TenantEntityState.loaded) tenantsLoaded$: Observable<boolean>;
  @Select(TenantEntityState.active) activeTenant$: Observable<Tenant>;

  hasTenants$ = combineLatest([this.tenantsLoaded$, this.numberOfTenants$]).pipe(map(([loaded, count]) => {
    return loaded && count > 0;
  }));

  definedColumns: GridColumnDefinition[] = [
    {
      id: 'Name',
      title: 'Name',
      isPrimary: true
    },
    {
      id: 'Role',
      title: 'TenantRole',
    },
    {
      id: 'Identifier',
      title: 'Identifier',
    },
    {
      id: 'DateModified',
      title: 'Date Modified',
      format: 'Date',
      prefixIcon: 'calendar_today'
    },
    {
      id: 'DateCreated',
      title: 'Date Modified',
      format: 'Date',
      prefixIcon: 'calendar_today'
    },
    {
      id: 'CreatedBy',
      title: 'Created By',
      fieldType: 'Reference',
      field: 'Name'
    },
    {
      id: 'Owner',
      title: 'Owner',
      fieldType: 'Reference',
      field: 'Name'
    },
    {
      id: 'Members',
      title: '# Members',
      fieldType: 'Badge',
      field: 'Members@odata.count',
      orderbyField: 'Members/$count',
      badgeIcon: 'person'
    }
  ];

  orderedColumns = ['Select', 'Name', 'Identifier', 'Role', 'DateModified', 'Owner', 'Members'];
  public stateType = TenantEntityState;
  public comparer = new TenantComparer();



  ngOnInit() {
    this.store.dispatch(new ClearFilters(TenantEntityState));
    this.store.dispatch(new AddExpands(TenantEntityState, [
      new Expand('CreatedBy'),
      new Expand('Owner', '$select=Name'),
      new Expand('Members', '$top=0;$select=UserId;$count=true')
    ]));
    this.store.dispatch(new Query(TenantEntityState));
  }

  public activateTenant(tenant: Tenant) {
    this.logger.debug('activate tenant', tenant);
    this.store.dispatch([
      new SetActive(TenantEntityState, tenant.TenantId)
    ]);
  }

  public clearTenant(tenant: Tenant) {
    this.logger.debug('Clear tenant', tenant);
    this.store.dispatch([
      new ClearActive(TenantEntityState)
    ]);
  }

  viewModels() {
    this.navigateToFeature('3DView');
  }

  viewAssets() {
    this.navigateToFeature('assets');
  }


  private navigateToFeature(route: string) {
    const tenant = this.store.selectSnapshot(TenantEntityState.active);
    if (!tenant) {
      return;
    }
    this.store.dispatch(new Navigate([tenant.Identifier || tenant.TenantId, route]));
  }
}
