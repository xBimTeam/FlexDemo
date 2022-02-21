import { Component, OnInit, Inject } from '@angular/core';
import { ClearActive, Add, } from '@ngxs-labs/entity-state';
import { Store, Select } from '@ngxs/store';
import { AddExpands, ClearFilters, Expand, Query, SetActive, TenantEntityState, TenantComparer, IConfig, APP_CONFIG } from '@xbim/flex-webkit';
import { Tenant } from '@xbim/flex-identity-api';
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

  // The selects provide is with an Observable portion of the application state. In this case
  // we're interested in the Tenants: if they are loaded, how many the user has, which is active, if we're saving a new one etc.
  @Select(TenantEntityState.itemsTotal) numberOfTenants$: Observable<number>;
  @Select(TenantEntityState.loaded) tenantsLoaded$: Observable<boolean>;
  @Select(TenantEntityState.active) activeTenant$: Observable<Tenant>;
  @Select(TenantEntityState.saving) isSavingTenant$: Observable<boolean>;
  @Select(TenantEntityState.error) error$: Observable<Error>;
  @Select(TenantEntityState.latest) latest$: Observable<Tenant>;

  // If we've loaded the tenants and still have none that means the user has not created any yet. 
  // We might want to extend this logic to only return true when the user is the owner of a tenant
  hasTenants$ = combineLatest([this.tenantsLoaded$, this.numberOfTenants$]).pipe(map(([loaded, count]) => {
    return loaded && count > 0;
  }));


  // The name of any new Tenant to create
  newTenantName: string = undefined;

  // defines the available columns in the Grid. The exact columns displayed and their order is defined separately
  definedColumns: GridColumnDefinition[] = [
    {
      id: 'name',
      title: 'Name',
      isPrimary: true
    },
    {
      id: 'role',
      title: 'TenantRole',
    },
    {
      id: 'identifier',
      title: 'Identifier',
    },
    {
      id: 'regionCode',
      title: 'Region',
    },
    {
      id: 'dateModified',
      title: 'Date Modified',
      format: 'Date',
      prefixIcon: 'calendar_today'
    },
    {
      id: 'dateCreated',
      title: 'Date Created',
      format: 'Date',
      prefixIcon: 'calendar_today'
    },
    {
      id: 'createdBy',
      title: 'Created By',
      fieldType: 'Reference', // Special field type that traverses a relationship
      field: 'name'
    },
    {
      id: 'owner',
      title: 'Owner',
      fieldType: 'Reference',
      field: 'name'
    },
    {
      id: 'members',
      title: '# Members',
      fieldType: 'Badge',   // Special field type providing a badge, typically used to show the number of 'child' items
      field: 'members@odata.count',
      orderbyField: 'members/$count',
      badgeIcon: 'person'
    }
  ];

  additionalColumns = ['regionCode'];

  // The 'ids' of the columns to display. Also defines their initial order
  // 'Select' is a special column that displays the checkbox
  orderedColumns = ['Select', 'name', 'identifier', 'regionCode', 'role', 'dateCreated', 'owner', 'members'];

  // defines the NGXS state that the grid is bound to. The Grid is aware of the OData specific actions in
  // the state, and can drive the API calls through the State actions. e.g. paging, sorting, filtering etc.
  public stateType = TenantEntityState;
  public comparer = new TenantComparer();

  ngOnInit() {
    // When we initialise, clear the filters on Tenants, and ensure we expand the relevant relationships
    // for the grid
    this.store.dispatch(new ClearFilters(TenantEntityState));
    this.store.dispatch(new AddExpands(TenantEntityState, [
      new Expand('createdBy'),
      new Expand('owner', '$select=name'),
      new Expand('members', '$top=0;$select=UserId;$count=true')
    ]));
    // Query actually invokes the API request. Page size and page number have defaulted, but can be amended
    // (with SetPageSize and GotoPage actions) - however the Flex grid handles this for you most of the time.
    this.store.dispatch(new Query(TenantEntityState));
  }

  // Marking a tenant as active connects the user to the Tenant, which opens up access to the full AIM 
  // set of features, based on the user's role in the tenant. A user can only have one active tenant activated
  // at any time.
  public activateTenant(tenant: Tenant) {
    this.logger.debug('activate tenant', tenant);
    this.store.dispatch([
      new SetActive(TenantEntityState, tenant.tenantId)
    ]);
  }

  // Clears the tenant
  public clearTenant(tenant: Tenant) {
    this.logger.debug('Clear tenant', tenant);
    this.store.dispatch([
      new ClearActive(TenantEntityState)
    ]);
  }

  // Here we're creating a new Tenant with the given name. We'll allocate you a GUID and a 'slug' 
  // key behind the scenes that you can use to access this tenancy in any requests.
  public createTenant() {


    // We dispatch a message to the store to initiate this request. 
    // This is an asyncronous operation (i.e. Observable). You could subscribe/await it but we don't need to.
    // Any errors will be returned in TenantEntityState.error and TenantEntityState.lastStatusCode
    // The created tenant will be available in TenantEntityState.latest
    this.store.dispatch(
      new Add(TenantEntityState, { name: this.newTenantName } as Tenant) // Create a new Tenant
    );
  }

  viewModels() {
    this.navigateToTenantFeature('3DView');
  }

  viewAssets() {
    this.navigateToTenantFeature('assets');
  }

  upload() {
    this.navigateToTenantFeature('upload');
  }

  // Navigate to the views under the tenant where the user can upload, view models etc.
  private navigateToTenantFeature(route: string) {
    const tenant = this.store.selectSnapshot(TenantEntityState.active);
    if (!tenant) {
      return;
    }
    // We use the store to navigate. This drives the Angular router for us.
    // 
    this.store.dispatch(new Navigate([tenant.identifier || tenant.tenantId, route]));
  }
}
