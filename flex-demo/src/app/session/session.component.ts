import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Login, Logout, SessionState, User } from '@xbim/flex-webkit';
import { combineLatest, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit, OnDestroy {

  constructor(private store: Store) { }

  public loading = false;
  public isLoggedIn = false;
  public user: User = undefined;
  public error: string = undefined;

  @Select(SessionState.loading) loading$: Observable<boolean>;
  @Select(SessionState.isLoggedIn) isLoggedIn$: Observable<boolean>;
  @Select(SessionState.user) user$: Observable<User>;
  @Select(SessionState.userInitials) initials$: Observable<string>;
  @Select(SessionState.error) error$: Observable<Error>;

  private contextSubscription: Subscription;

  ngOnInit() {
    this.subscribeToContextState();
  }

  ngOnDestroy() {
    this.contextSubscription.unsubscribe();
  }

  public toggleLogin(isLoggedIn: boolean) {
    if (isLoggedIn === true) {
      this.store.dispatch(new Logout());
    } else {
      this.store.dispatch(new Login());
    }
  }

  private subscribeToContextState(): void {
    this.contextSubscription = combineLatest([this.loading$, this.isLoggedIn$, this.user$, this.error$])
      .subscribe(([loading, isLoggedIn, user, error]) => {
        this.loading = loading;
        this.isLoggedIn = isLoggedIn;
        this.user = user;
        if (error) {
          this.error = error.message;
        }
      });
  }

  public getDate(epochDate: number): Date {
    return new Date(epochDate);
  }

}
