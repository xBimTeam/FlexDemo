
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { FlexWebkitModule } from '@xbim/flex-webkit';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { TenantIndexModule } from './components/tenant-index/tenant-index.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SessionComponent } from './session/session.component';
import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SessionComponent,
    LandingPageComponent,
    NotificationsComponent
  ],
  imports: [
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({ name: environment.appName }),
    LoggerModule.forRoot({
      level: environment.production ? NgxLoggerLevel.INFO : NgxLoggerLevel.DEBUG,
      enableSourceMaps: true
    }),
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    FlexWebkitModule.forRoot(environment),
    HttpClientModule,
    TenantIndexModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

