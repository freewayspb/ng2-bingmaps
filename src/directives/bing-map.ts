import {Component, ElementRef, EventEmitter, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {BingMapsAPIWrapper} from '../services/bing-maps-api-wrapper';
import {MarkerManager} from '../services/marker-manager';
import {InfoWindowManager} from '../services/info-window-manager';
import {LatLngLiteral} from '../services/bing-maps-types';

/**
 * BingMap renders a Bing Map.
 * **Important note**: To be able see a map in the browser, you have to define a height for the CSS
 * class `bing-map-container`.
 *
 * ### Example
 * ```typescript
 * import {Component} from '@angular/core';
 * import {BingMap} from 'ng2-bingmaps/directives';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [BingMap],
 *  styles: [`
 *    .bing-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
@Component({
  selector: 'bing-map',
  providers: [BingMapsAPIWrapper, MarkerManager, InfoWindowManager],
  inputs: [
    'longitude', 'latitude', 'zoom', 'disableDoubleClickZoom', 'disableDefaultUI', 'scrollwheel',
    'backgroundColor', 'draggableCursor', 'draggingCursor', 'keyboardShortcuts', 'zoomControl', 'nativeMap'
  ],
  outputs: ['mapClick', 'mapRightClick', 'mapDblClick', 'centerChange', 'nativeMapChange'],
  host: {'[class.bing-map-container]': 'true'},
  styles: [`
    .bing-map-container-inner {
      width: inherit;
      height: inherit;
    }
    .bing-map-content {
      display:none;
    }
  `],
  template: `
    <div class='bing-map-container-inner'></div>
    <div class='bing-map-content'>
      <ng-content></ng-content>
    </div>
  `
})
export class BingMap implements OnChanges,
    OnInit {
  private _longitude: number = 0;
  private _latitude: number = 0;
  private _zoom: number = 8;
  /**
   * Enables/disables zoom and center on double click. Enabled by default.
   */
  disableDoubleClickZoom: boolean = false;

  /**
   * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
   */
  scrollwheel: boolean = true;

  /**
   * Color used for the background of the Map div. This color will be visible when tiles have not
   * yet loaded as the user pans. This option can only be set when the map is initialized.
   */
  backgroundColor: string;

  /**
   * The name or url of the cursor to display when mousing over a draggable map. This property uses
   * the css  * cursor attribute to change the icon. As with the css property, you must specify at
   * least one fallback cursor that is not a URL. For example:
   * [draggableCursor]="'url(http://www.example.com/icon.png), auto;'"
   */
  draggableCursor: string;

  /**
   * The name or url of the cursor to display when the map is being dragged. This property uses the
   * css cursor attribute to change the icon. As with the css property, you must specify at least
   * one fallback cursor that is not a URL. For example:
   * [draggingCursor]="'url(http://www.example.com/icon.png), auto;'"
   */
  draggingCursor: string;

  /**
   * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
   * enabled by default.
   */
  keyboardShortcuts: boolean = true;

  /**
   * The enabled/disabled state of the Zoom control.
   */
  zoomControl: boolean = true;

  /**
   * Map option attributes that can change over time
   */
  private static _mapOptionsAttributes: string[] = [
    // todo
    // 'disableDoubleClickZoom', 'scrollwheel', 'draggableCursor', 'draggingCursor',
    // 'keyboardShortcuts', 'zoomControl'
  ];

  /**
   * This event emitter gets emitted when the user clicks on the map (but not when they click on a
   * marker or infoWindow).
   */
  mapClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event emitter gets emitted when the user right-clicks on the map (but not when they click
   * on a marker or infoWindow).
   */
  mapRightClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event emitter gets emitted when the user double-clicks on the map (but not when they click
   * on a marker or infoWindow).
   */
  mapDblClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * This event emitter is fired when the map center changes.
   */
  centerChange: EventEmitter<LatLngLiteral> = new EventEmitter<LatLngLiteral>();

  /**
   * A reference to the native Microsoft.Maps.Map element
   */
  nativeMap: Microsoft.Maps.Map = null;

  nativeMapChange: EventEmitter<Microsoft.Maps.Map> = new EventEmitter<Microsoft.Maps.Map>();

  constructor(private _elem: ElementRef, private _mapsWrapper: BingMapsAPIWrapper) {}

  /** @internal */
  ngOnInit() {
    const container = this._elem.nativeElement.querySelector('.bing-map-container-inner');
    this._initMapInstance(container);
  }

  private _initMapInstance(el: HTMLElement) {
    this._mapsWrapper.createMap(el, {
      center: {lat: this._latitude, lng: this._longitude},
      zoom: this._zoom
    }).then(map => {
      this.nativeMap = map;
      this.nativeMapChange.emit(map);
    });
  }

  /* @internal */
  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    // if (changes['latitude']) {
    //   this.latitude = changes['latitude'];
    //   this._markerManager.updateMarkerPosition(this);
    // }
    this._updateMapOptionsChanges(changes);
  }

  private _updateMapOptionsChanges(changes: {[propName: string]: SimpleChange}) {
    let options: {[propName: string]: any} = {};
    let optionKeys =
        Object.keys(changes).filter(k => BingMap._mapOptionsAttributes.indexOf(k) !== -1);
    optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
    // todo this._mapsWrapper.setMapOptions(options);
  }

  /**
   * Triggers a resize event on the google map instance.
   * Returns a promise that gets resolved after the event was triggered.
   */
  triggerResize(): Promise<void> {
    // Note: When we would trigger the resize event and show the map in the same turn (which is a
    // common case for triggering a resize event), then the resize event would not
    // work (to show the map), so we trigger the event in a timeout.
    return new Promise<void>((resolve) => {
      setTimeout(
          () => { return this._mapsWrapper.triggerMapEvent('resize').then(() => resolve()); });
    });
  }

  /**
   * Sets the zoom level of the map. The default value is `8`.
   */
  set zoom(value: number|string) {
    this._zoom = this._convertToDecimal(value, 8);
    if (typeof this._zoom === 'number') {
      this._mapsWrapper.setZoom(this._zoom);
    }
  }

  /**
   * The longitude that sets the center of the map.
   */
  set longitude(value: number|string) {
    this._longitude = this._convertToDecimal(value);
    this._updateCenter();
  }

  /**
   * The latitude that sets the center of the map.
   */
  set latitude(value: number|string) {
    this._latitude = this._convertToDecimal(value);
    this._updateCenter();
  }

  private _convertToDecimal(value: string|number, defaultValue: number = null): number {
    if (typeof value === 'string') {
      return parseFloat(value);
    } else if (typeof value === 'number') {
      return <number>value;
    }
    return defaultValue;
  }

  private _updateCenter() {
    if (typeof this._latitude !== 'number' || typeof this._longitude !== 'number') {
      return;
    }
    this._mapsWrapper.setCenter({
      lat: this._latitude,
      lng: this._longitude,
    });
  }
}
