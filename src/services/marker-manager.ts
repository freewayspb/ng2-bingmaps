import {Injectable, NgZone} from '@angular/core';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {BingMapMarker} from '../directives/bing-map-marker';
import {BingMapsAPIWrapper} from './bing-maps-api-wrapper';
import {Marker} from './bing-maps-types';

@Injectable()
export class MarkerManager {
  private _markers: Map<BingMapMarker, Promise<Marker>> =
      new Map<BingMapMarker, Promise<Marker>>();

  constructor(private _mapsWrapper: BingMapsAPIWrapper, private _zone: NgZone) {}

  deleteMarker(marker: BingMapMarker): Promise<void> {
    const m = this._markers.get(marker);
    if (m == null) {
      // marker already deleted
      return Promise.resolve();
    }
    return m.then((m: Marker) => {
      return this._zone.run(() => {
        m.deleteMarker();
        this._markers.delete(marker);
      });
    });
  }

  updateMarkerPosition(marker: BingMapMarker): Promise<void> {
    return this._markers.get(marker).then(
        (m: Marker) => m.setPosition({lat: marker.latitude, lng: marker.longitude}));
  }

  updateTitle(marker: BingMapMarker): Promise<void> {
    return this._markers.get(marker).then((m: Marker) => m.setTitle(marker.title));
  }

  updateLabel(marker: BingMapMarker): Promise<void> {
    return this._markers.get(marker).then((m: Marker) => { m.setLabel(marker.label); });
  }

  updateDraggable(marker: BingMapMarker): Promise<void> {
    return this._markers.get(marker).then((m: Marker) => m.setDraggable(marker.draggable));
  }

  updateIcon(marker: BingMapMarker): Promise<void> {
    return this._markers.get(marker).then((m: Marker) => m.setIcon(marker.iconUrl));
  }

  addMarker(marker: BingMapMarker) {
    const markerPromise = this._mapsWrapper.createMarker({
      position: {lat: marker.latitude, lng: marker.longitude},
      label: marker.label,
      draggable: marker.draggable,
      icon: marker.iconUrl
    });
    this._markers.set(marker, markerPromise);
  }

  getNativeMarker(marker: BingMapMarker): Promise<Marker> {
    return this._markers.get(marker);
  }

  createEventObservable<T>(eventName: string, marker: BingMapMarker): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this._markers.get(marker).then((m: Marker) => {
        m.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }
}
