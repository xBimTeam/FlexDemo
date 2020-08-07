import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ConnectToHub, NotificationEntity, NotificationsState, NotificationsStateSelectors } from '@xbim/flex-webkit';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {


  @Select(NotificationsStateSelectors.assetNotifications) assetNotifications$: Observable<NotificationEntity[]>;
  @Select(NotificationsStateSelectors.assetEventCount) assetCount$: Observable<number>;
  @Select(NotificationsStateSelectors.globalEventCount) globalCount$: Observable<number>;
  @Select(NotificationsStateSelectors.isConnected) isConnected$: Observable<boolean>;
  @Select(NotificationsStateSelectors.isConnecting) isConnecting$: Observable<boolean>;
  @Select(NotificationsState.entities) allNotifications$: Observable<NotificationEntity[]>;
  @Select(NotificationsState.size) allCount$: Observable<number>;

  isDisconnected$ = this.isConnected$.pipe(map(v => !v));

  constructor(private store: Store) { }

  ngOnInit() {
  }

  public connect() {
    this.store.dispatch(new ConnectToHub());
  }

}
