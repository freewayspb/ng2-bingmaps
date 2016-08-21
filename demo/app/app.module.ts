import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { Ng2BingmapsDemoAppComponent }   from './ng2-bingmaps-demo.component';
import {BingMapsModule} from '../../dist/core';
import { LazyMapsAPILoaderConfig} from '../../dist/core';
import { FormsModule }   from '@angular/forms';

let config = new LazyMapsAPILoaderConfig();
config.apiKey = 'Ag22S8u9otClss0bIlPsBZi9hrOBbvLEa2M8LrD3sTkgZJgiisRJWNeL4sUxOSpf';
config.branch = 'experimental'; // to be able to use custom HTML in descriptions

@NgModule({
    declarations: [Ng2BingmapsDemoAppComponent],
    imports:      [
        BrowserModule,
        FormsModule,
        BingMapsModule.forRoot(config)],
    
    bootstrap:    [Ng2BingmapsDemoAppComponent],
})
export class AppModule {}