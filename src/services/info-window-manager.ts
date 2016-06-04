import {Injectable, NgZone} from '@angular/core';
import {BingMapInfoWindow} from '../directives/bing-map-info-window';
import {BingMapsAPIWrapper} from './bing-maps-api-wrapper';
import {InfoWindow, InfoWindowOptions} from './bing-maps-types';

@Injectable()
export class InfoWindowManager {
  private _infoWindows: Map<BingMapInfoWindow, Promise<InfoWindow>> =
      new Map<BingMapInfoWindow, Promise<InfoWindow>>();

  constructor(private _mapsWrapper: BingMapsAPIWrapper, private _zone: NgZone) {}

  deleteInfoWindow(infoWindow: BingMapInfoWindow): Promise<void> {
    const iWindow = this._infoWindows.get(infoWindow);
    if (iWindow == null) {
      // info window already deleted
      return Promise.resolve();
    }
    return iWindow.then((i: InfoWindow) => {
      return this._zone.run(() => {
        i.close();
        this._infoWindows.delete(infoWindow);
      });
    });
  }

  setPosition(infoWindow: BingMapInfoWindow): Promise<void> {
    return this._infoWindows.get(infoWindow).then((i: InfoWindow) => i.setPosition({
      lat: infoWindow.latitude,
      lng: infoWindow.longitude
    }));
  }

  open(infoWindow: BingMapInfoWindow): Promise<void> {
    return this._infoWindows.get(infoWindow).then((w) => {
      w.open();
    });
  }

  close(infoWindow: BingMapInfoWindow): Promise<void> {
    return this._infoWindows.get(infoWindow).then((w) => w.close());
  }

  setOptions(infoWindow: BingMapInfoWindow, options: InfoWindowOptions) {
    return this._infoWindows.get(infoWindow).then((i: InfoWindow) => i.setOptions(options));
  }

  addInfoWindow(infoWindow: BingMapInfoWindow) {
    const options: InfoWindowOptions = {
      title: infoWindow.title,
      description: infoWindow.description
    };
    if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
      options.position = {lat: infoWindow.latitude, lng: infoWindow.longitude};
    }

    if (typeof infoWindow.infoWindowActions !== 'undefined' && infoWindow.infoWindowActions.length > 0) {
      options.actions = [];
      infoWindow.infoWindowActions.forEach((infoWindowAction) => {
        options.actions.push({
          label: infoWindowAction.label,
          eventHandler: () => { infoWindowAction.actionClicked.emit(null); }
        });
      });
    }
    const infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
    this._infoWindows.set(infoWindow, infoWindowPromise);
  }
}
