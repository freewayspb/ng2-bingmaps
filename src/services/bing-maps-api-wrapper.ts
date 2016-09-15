import {Injectable, NgZone} from '@angular/core';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {MapsAPILoader} from './maps-api-loader/maps-api-loader';
import * as mapTypes from './bing-maps-types';
import {LazyMapsAPILoaderConfig} from './maps-api-loader/lazy-maps-api-loader';

/**
 * Wrapper class that handles the communication with the Bing Maps Javascript
 * API v8
 */
@Injectable()
export class BingMapsAPIWrapper {
  public nativeMap: Promise<Microsoft.Maps.Map>;
  public infoBox: Promise<Microsoft.Maps.Infobox> = null;
  private _infoBoxResolver: (value?: Microsoft.Maps.Infobox) => void;
  private _mapResolver: (value?: Microsoft.Maps.Map) => void = null;

  constructor(private _loader: MapsAPILoader, private _zone: NgZone, private _config: LazyMapsAPILoaderConfig) {
    this.nativeMap = new Promise<Microsoft.Maps.Map>((resolve: () => void) => { this._mapResolver = resolve; });
  }

  createMap(el: HTMLElement, mapOptions: mapTypes.MapOptions): Promise<Microsoft.Maps.Map> {
    return this._loader.load().then(() => {
      // todo other options
      let map = new Microsoft.Maps.Map(el, {
        credentials: this._config.apiKey,
        center: new Microsoft.Maps.Location(mapOptions.center.lat, mapOptions.center.lng),
        zoom: mapOptions.zoom,
        mapTypeId: mapOptions.mapTypeId
      });
      this._mapResolver(map);

      /**
       * Create one infobox which is reused.
       */
      this.infoBox = new Promise<Microsoft.Maps.Infobox>((resolve: () => void) => { this._infoBoxResolver = resolve; });
      var infoBox = new Microsoft.Maps.Infobox(
        new Microsoft.Maps.Location(0, 0), {});
      this._infoBoxResolver(infoBox);

      return map;
    });
  }

  setMapOptions(options: mapTypes.MapOptions) {
    this.nativeMap.then((m: Microsoft.Maps.Map) => {
      m.setOptions({
        center: new Microsoft.Maps.Location(options.center.lat, options.center.lng),
        zoom: options.zoom,
        mapTypeId: options.mapTypeId
      });
      // todo other options
    });
  }

  /**
   * Creates a Bing map marker with the map context
   */
  createMarker(options: mapTypes.MarkerOptions = <mapTypes.MarkerOptions>{}):
      Promise<mapTypes.Marker> {
    return this.nativeMap.then((map: Microsoft.Maps.Map) => {
      var loc = new Microsoft.Maps.Location(options.position.lat, options.position.lng);
      var pushpin = new Microsoft.Maps.Pushpin(loc);
      map.entities.push(pushpin);
      return new mapTypes.Marker(map, pushpin);
    });
  }

  getInfoWindow(options?: mapTypes.InfoWindowOptions): Promise<mapTypes.InfoWindow> {
    return this.nativeMap.then((map: Microsoft.Maps.Map) => {
      return this.infoBox.then((infoBox: Microsoft.Maps.Infobox) => {
        var nativeOptions: Microsoft.Maps.InfoboxOptions = {
          visible: false,
          title: options.title, 
          location: new Microsoft.Maps.Location(options.position.lat, options.position.lng),
          description: options.description,
          actions: options.actions
        };

        if (options.height > 0) {
          (<any>nativeOptions).maxHeight = options.height;
        }

        if (options.width > 0) {
          (<any>nativeOptions).maxWidth = options.width;          
        }
        infoBox.setOptions(nativeOptions);
        return new mapTypes.InfoWindow(map, infoBox);
      });
    });
  }

  subscribeToMapEvent<E>(eventName: string): Observable<E> {
    return Observable.create((observer: Observer<E>) => {
      this.nativeMap.then((m: Microsoft.Maps.Map) => {
        Microsoft.Maps.Events.addHandler(m, eventName, (e: any) => {
          this._zone.run(() => observer.next(e));
        });
      });
    });
  }

  setCenter(latLng: mapTypes.LatLngLiteral): Promise<void> {
    return this.nativeMap.then((map: Microsoft.Maps.Map) => map.setView({
      center: new Microsoft.Maps.Location(latLng.lat, latLng.lng)
    }));
  }

  getZoom(): Promise<number> {
    return this.nativeMap.then((map: Microsoft.Maps.Map) => map.getZoom());
  }

  setZoom(zoom: number): Promise<void> {
    return this.nativeMap.then((map: Microsoft.Maps.Map) => map.setView({zoom: zoom}));
  }

  getCenter(): Promise<mapTypes.LatLngLiteral> {
    return this.nativeMap.then((map: Microsoft.Maps.Map) => {
      let center = map.getCenter();
      return {
        lat: center.latitude,
        lng: center.longitude
      };
    });
  }

  /**
   * Triggers the given event name on the map instance.
   */
  triggerMapEvent(eventName: string): Promise<void> {
    return this.nativeMap.then((m) => Microsoft.Maps.Events.invoke(m, eventName, null));
  }
}
