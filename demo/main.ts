import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { Ng2BingmapsDemoAppComponent, environment } from './app/';
import { NG2_BINGMAPS_PROVIDERS, LazyMapsAPILoaderConfig} from '../dist/core';

if (environment.production) {
  enableProdMode();
}

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
