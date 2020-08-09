import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { APP_CONFIG } from '@xbim/flex-webkit';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';


if (environment.production) {
  enableProdMode();
}

// when on server, this returns environment variables
fetch('/config.json')
  .then(response => response.json())
  .then(config => {
    platformBrowserDynamic([{ provide: APP_CONFIG, useValue: config }])
      .bootstrapModule(AppModule)
      .catch(err => console.error(err));
  });
