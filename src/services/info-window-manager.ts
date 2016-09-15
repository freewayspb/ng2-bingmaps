import {Injectable, NgZone} from '@angular/core';
import {BingMapInfoWindow} from '../directives/bing-map-info-window';
import {BingMapsAPIWrapper} from './bing-maps-api-wrapper';
import {InfoWindow, InfoWindowOptions} from './bing-maps-types';

@Injectable()
export class InfoWindowManager {
  constructor(private _mapsWrapper: BingMapsAPIWrapper, private _zone: NgZone) {}

  setPosition(infoWindow: BingMapInfoWindow): Promise<void> {
    return this._mapsWrapper.getInfoWindow().then((i: InfoWindow) => i.setPosition({
      lat: infoWindow.latitude,
      lng: infoWindow.longitude
    }));
  }

  // open(infoWindow: BingMapInfoWindow): Promise<void> {
  //   return this._infoWindows.get(infoWindow).then((w) => {
  //     w.open();
  //   });
  // }

  close(): Promise<void> {
    return this._mapsWrapper.getInfoWindow().then((w) => w.close());
  }

  setOptions(options: InfoWindowOptions) {
    return this._mapsWrapper.getInfoWindow().then((w) => w.setOptions(options));
  }

  open(infoWindow: BingMapInfoWindow) {
    const options: InfoWindowOptions = {
      title: infoWindow.title,
      description: infoWindow.description,
      height: infoWindow.height,
      width: infoWindow.width
    };
    if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
      options.position = {lat: infoWindow.latitude, lng: infoWindow.longitude};
    }
    if (typeof infoWindow.height === 'number') {
      options.height = infoWindow.height;
    }
    if (typeof infoWindow.width === 'number') {
      options.width = infoWindow.width;
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
    return this._mapsWrapper.getInfoWindow(options).then(i => {
      i.open();
    });
  }
}
