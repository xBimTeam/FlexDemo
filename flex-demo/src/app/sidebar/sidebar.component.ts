import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { TenantEntityState } from '@xbim/flex-webkit';
import { Tenant } from '@xbim/flex-identity-api';
import { combineLatest, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Select(TenantEntityState.active) activeTenant$: Observable<Tenant>;
  @Select(TenantEntityState.active) tenantLoaded$: Observable<boolean>;

  private contextSubscription: Subscription;


  public menuItems = [
    { name: 'Upload', routeLink: 'upload', icon: 'publish' },
    { name: 'Assets', routeLink: 'assets', icon: 'business' },
    { name: 'Asset Models', routeLink: 'models', icon: 'folder_special' },
    { name: '3D Viewer', routeLink: '3DView', icon: '3d_rotation' },
    { type: 'divider' },
    { name: 'Sites', routeLink: 'sites', icon: 'map' },
    { name: 'Facilities', routeLink: 'facilities', icon: 'apartment' },
    { name: 'Levels', routeLink: 'levels', icon: 'layers' },
    { name: 'Spaces', routeLink: 'spaces', icon: 'place' },
    { name: 'Types', routeLink: 'componentTypes', icon: 'emoji_objects' },
    { name: 'Component Items', routeLink: 'componentItems', icon: 'batch_prediction' },
    { name: 'Zones', routeLink: 'zones', icon: 'view_quilt' },
    { name: 'Systems', routeLink: 'systems', icon: 'settings_ethernet' },
    { name: 'Documents', routeLink: 'documents', icon: 'description' },
    // Contacts, Spares, Jobs, Resources, Issues, Impacts etc.
    { name: 'Applications', routeLink: 'applications', icon: 'apps' },
    { type: 'divider' },
    { name: 'Team', routeLink: 'team', icon: 'group' },
    { name: 'Invitations', routeLink: 'invitations', icon: 'how_to_reg' },
  ];

  public tenant: Tenant;
  public tenantLoaded: boolean;

  constructor() { }

  ngOnInit() {
    this.subscribeToTenantState();
  }

  ngOnDestroy() {
    this.contextSubscription.unsubscribe();
  }

  private subscribeToTenantState(): void {
    this.contextSubscription = combineLatest([this.activeTenant$, this.tenantLoaded$]).subscribe(([tenant, isloaded]) => {
      this.tenant = tenant;
      this.tenantLoaded = isloaded;
    });
  }

}
