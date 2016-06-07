import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { Ng2BingmapsDemoAppComponent, environment } from './app/';
import { NG2_BINGMAPS_PROVIDERS, LazyMapsAPILoaderConfig} from '../dist/core';

if (environment.production) {
  enableProdMode();
}

bootstrap(Ng2BingmapsDemoAppComponent,
  [NG2_BINGMAPS_PROVIDERS,
    provide(LazyMapsAPILoaderConfig, {useFactory: () => {
      let config = new LazyMapsAPILoaderConfig();
      config.apiKey = 'Ag22S8u9otClss0bIlPsBZi9hrOBbvLEa2M8LrD3sTkgZJgiisRJWNeL4sUxOSpf';
      return config;
    }}),
  ]);
