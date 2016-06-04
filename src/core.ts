import {Provider} from '@angular/core';

import {MapsAPILoader} from './services/maps-api-loader/maps-api-loader';
import {LazyMapsAPILoader} from './services/maps-api-loader/lazy-maps-api-loader';

// main modules
export * from './directives';
export * from './services';

export const NG2_BINGMAPS_PROVIDERS: any[] = [
  new Provider(MapsAPILoader, {useClass: LazyMapsAPILoader}),
];
