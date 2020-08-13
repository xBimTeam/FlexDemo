import { Component, OnInit, Inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Login, Logout, SessionState, User, APP_CONFIG, IConfig, TenantEntityState } from '@xbim/flex-webkit';
import { Observable, } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tenant } from '@xbim/flex-api';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  constructor(
    private store: Store,
    @Inject(APP_CONFIG)
    public config: IConfig
  ) { }

  // NGXS selectors provide an observable of the 'selected' state. 
  // As the Authentication process completes the values will automatically be updated and can be bound to the template
  @Select(SessionState.loading) loading$: Observable<boolean>;
  @Select(SessionState.isLoggedIn) isLoggedIn$: Observable<boolean>;
  @Select(SessionState.user) user$: Observable<User>;
  @Select(SessionState.userInitials) initials$: Observable<string>;
  @Select(SessionState.error) error$: Observable<Error>;

  public env: any = environment;

  ngOnInit() {

  }

  public toggleLogin() {
    // Get the current login state explicitly from the store.
    const isLoggedIn = this.store.selectSnapshot(SessionState.isLoggedIn);

    // We sign in and out simply by sending an action to the 'store'
    if (isLoggedIn === true) {
      // Triggers an action to sign out
      this.store.dispatch(new Logout());
    } else {
      // Senfd the Login action to start the Sign in process using the current OAuth2 config
      this.store.dispatch(new Login());
    }
  }

  public getDate(epochDate: number): Date {
    return new Date(epochDate);
  }

}
