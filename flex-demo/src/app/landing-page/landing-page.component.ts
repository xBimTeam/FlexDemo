import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { Select } from '@ngxs/store';
import { SessionState, APP_CONFIG, IConfig, User } from '@xbim/flex-webkit';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';


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
  public env = environment;
  private contextSubscription: Subscription;

  constructor(@Inject(APP_CONFIG) public config: IConfig) { }

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

}
