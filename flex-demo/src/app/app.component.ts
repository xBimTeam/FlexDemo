import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ConnectToHub, ConnectToTenant, NotificationsStateSelectors, SessionState, TenantEntityState, AssetEntityState } from '@xbim/flex-webkit';
import { Asset } from '@xbim/flex-api';
import { NGXLogger } from 'ngx-logger';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Tenant } from '@xbim/flex-identity-api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  @Select(TenantEntityState.active) activeTenant$: Observable<Tenant>;
  @Select(TenantEntityState.loaded) tenantsLoaded$: Observable<boolean>;
  @Select(AssetEntityState.active) activeAsset$: Observable<Asset>;
  @Select(NotificationsStateSelectors.isConnected) isConnected$: Observable<boolean>;
  @Select(SessionState.isLoggedIn) loggedIn$: Observable<boolean>;
  @Select(SessionState.loading) loading$: Observable<boolean>;
  @Select(SessionState.userInitials) initials$: Observable<string>;

  tenantChanging$ = this.activeTenant$
    .pipe(distinctUntilChanged((prev, curr) => (prev && curr && prev.tenantId === curr.tenantId)));

  tenantsubscription: Subscription;
  loggedInSubscription: Subscription;
  title = 'app';
  loading = true;

  constructor(private store: Store,
    private logger: NGXLogger) { }

  ngOnInit() {

    this.tenantsubscription = combineLatest([this.isConnected$, this.tenantsLoaded$, this.tenantChanging$])
      .subscribe(([isConnected, tenantsLoaded, latestTenant]) => {
        if (isConnected && tenantsLoaded) {
          if (latestTenant) {
            this.logger.debug('Connecting tenant to hub', latestTenant.tenantId);
            this.store.dispatch(new ConnectToTenant(latestTenant));
          }
        }

      });
    this.loggedInSubscription = this.loggedIn$.subscribe((loggedIn) => {
      if (loggedIn) {
        this.store.dispatch(new ConnectToHub());
      } else {
        // this.store.dispatch(new DisconnectHub());
      }
    });
    this.loading = false;
  }



  ngOnDestroy(): void {
    if (this.tenantsubscription) {
      this.tenantsubscription.unsubscribe();
    }
    if (this.loggedInSubscription) {
      this.loggedInSubscription.unsubscribe();
    }
  }
}
