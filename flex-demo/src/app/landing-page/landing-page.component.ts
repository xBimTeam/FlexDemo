import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SessionState, APP_CONFIG, IConfig, User, Logout, Login } from '@xbim/flex-webkit';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {

  @Select(SessionState.isLoggedIn) loggedIn$: Observable<boolean>;
  @Select(SessionState.user) user$: Observable<User>;

  public user: User = undefined;
  public loggedIn = false;
  public env: any = environment;
  private contextSubscription: Subscription;

  public loginText$ = this.loggedIn$.pipe(map(l => l ? 'Sign out' : 'Sign in'));

  public dataSource$ = combineLatest([this.loggedIn$, this.user$]).pipe(map(([loggedin, user]) =>
    [
      { label: 'Base URL', value: this.config.baseUrl },
      { label: 'Flex Client ID', value: this.config.clientId },
      { label: 'App Name', value: this.env.appName },
      { label: 'Current User', value: loggedin ? user.username : '[No one]' },
      { label: 'Demo version', value: this.env.versions.app },
      { label: 'Angular version', value: this.env.versions.angular },
      { label: 'Material version', value: this.env.versions.material },
      { label: 'xbim Flex Webkit version', value: this.env.versions.flexWebkit },
      { label: 'xbim Flex API version', value: this.env.versions.flexApi },
      { label: 'xbim Viewer version', value: this.env.versions.xbimViewer },
    ]
  ));

  displayedColumns: string[] = ['label', 'value'];

  constructor(
    @Inject(APP_CONFIG)
    public config: IConfig,
    public store: Store) { }

  ngOnInit() {
    this.subscribeToContextState();
  }

  ngOnDestroy() {
    this.contextSubscription.unsubscribe();
  }

  private subscribeToContextState(): void {
    this.contextSubscription = combineLatest([this.user$, this.loggedIn$])
      .subscribe(([user, isLoggedIn]) => {

        this.loggedIn = isLoggedIn;
        this.user = user;

      });
  }

  public toggleLogin() {
    if (this.loggedIn === true) {
      this.store.dispatch(new Logout());
    } else {
      this.store.dispatch(new Login());
    }
  }

}
