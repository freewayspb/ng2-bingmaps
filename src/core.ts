import {Provider, NgModule, ModuleWithProviders} from '@angular/core';

import {NG2_BINGMAPS_DIRECTIVES} from './directives';
import {MarkerManager} from './services';
import {MapsAPILoader} from './services/maps-api-loader/maps-api-loader';
import {LazyMapsAPILoader, LazyMapsAPILoaderConfig} from './services/maps-api-loader/lazy-maps-api-loader';

// main modules
export * from './directives';
export * from './services';

/* deprecated */
export const NG2_BINGMAPS_PROVIDERS: any[] = [ {
  provide: MapsAPILoader,
  useClass: LazyMapsAPILoader
}];



/**
 * The ng2-bing-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `BingMapsModule.forRoot(config)` in your app module.
 *
 * @experimental
 */
@NgModule({ declarations: NG2_BINGMAPS_DIRECTIVES, exports: NG2_BINGMAPS_DIRECTIVES})
export class BingMapsModule {
  static forRoot(config: LazyMapsAPILoaderConfig): ModuleWithProviders {    
    return {
      ngModule: BingMapsModule,
      providers:        [
        NG2_BINGMAPS_PROVIDERS,     
        {
          provide: LazyMapsAPILoaderConfig,
          useValue: config
        }
      ],
    };
  }
}