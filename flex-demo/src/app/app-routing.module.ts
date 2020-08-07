import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionComponent } from './session/session.component';
import { AuthGuard, TenantGuard } from '@xbim/flex-webkit';
import { LandingPageComponent } from './landing-page/landing-page.component';


export const routes: Routes = [
  {
    path: '',
    component: SessionComponent,
    pathMatch: 'full',
  },
  {
    path: 'landing',
    component: LandingPageComponent,
  },
  {
    path: 'tenants',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/tenant-index/tenant-index.module').then(m => m.TenantIndexModule),
    pathMatch: 'full'
  },
  // {
  //   path: ':tenantId/invitations',
  //   canActivate: [AuthGuard, TenantGuard],
  //   loadChildren: () => import('./components/invitations/invitations.module').then(m => m.InvitationsModule),
  //   pathMatch: 'full'
  // },
  // {
  //   path: ':tenantId/team',
  //   canActivate: [AuthGuard, TenantGuard],
  //   loadChildren: () => import('./components/team/team.module').then(m => m.TeamModule),
  //   pathMatch: 'full'
  // },
  {
    path: ':tenantId/3DView',
    canActivate: [AuthGuard, TenantGuard],
    loadChildren: () => import('./components/viewer/viewer.module').then(m => m.ViewerModule),
    pathMatch: 'full'
  },
  {
    path: ':tenantId/assets',
    canActivate: [AuthGuard, TenantGuard],
    loadChildren: () => import('./components/asset-index/asset-index.module').then(m => m.AssetIndexModule),
    pathMatch: 'full'
  },
  {
    path: ':tenantId/models',
    canActivate: [AuthGuard, TenantGuard],
    loadChildren: () => import('./components/asset-models/asset-models.module').then(m => m.AssetModelsModule),
    pathMatch: 'full'
  },
  {
    path: ':tenantId/sites',
    canActivate: [AuthGuard, TenantGuard],
    loadChildren: () => import('./components/site-index/site-index.module').then(m => m.SiteIndexModule),
    pathMatch: 'full'
  },
  {
    path: ':tenantId/facilities',
    canActivate: [AuthGuard, TenantGuard],
    loadChildren: () => import('./components/facility-index/facility-index.module').then(m => m.FacilityIndexModule),
    pathMatch: 'full'
  },
  {
    path: ':tenantId/levels',
    canActivate: [AuthGuard, TenantGuard],
    loadChildren: () => import('./components/level-index/level-index.module').then(m => m.LevelIndexModule),
    pathMatch: 'full'
  },
  {
    path: ':tenantId/spaces',
    canActivate: [AuthGuard, TenantGuard],
    loadChildren: () => import('./components/space-index/space-index.module').then(m => m.SpaceIndexModule),
    pathMatch: 'full'
  },
  {
    path: ':tenantId/zones',
    canActivate: [AuthGuard, TenantGuard],
    loadChildren: () => import('./components/zone-index/zone-index.module').then(m => m.ZoneIndexModule),
    pathMatch: 'full'
  },
  {
    path: ':tenantId/componentTypes',
    canActivate: [AuthGuard, TenantGuard],
    loadChildren: () => import('./components/component-type-index/component-type-index.module').then(m => m.ComponentTypeIndexModule),
    pathMatch: 'full'
  },
  {
    path: ':tenantId/componentItems',
    canActivate: [AuthGuard, TenantGuard],
    loadChildren: () => import('./components/component-item-index/component-item-index.module').then(m => m.ComponentItemIndexModule),
    pathMatch: 'full'
  },
  {
    path: ':tenantId/documents',
    canActivate: [AuthGuard, TenantGuard],
    loadChildren: () => import('./components/document-index/document-index.module').then(m => m.DocumentIndexModule),
    pathMatch: 'full'
  },
  {
    path: ':tenantId/systems',
    canActivate: [AuthGuard, TenantGuard],
    loadChildren: () => import('./components/system-index/system-index.module').then(m => m.SystemIndexModule),
    pathMatch: 'full'
  },
  {
    path: ':tenantId/applications',
    canActivate: [AuthGuard, TenantGuard],
    loadChildren: () => import('./components/application-index/application-index.module').then(m => m.ApplicationIndexModule),
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {

  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
