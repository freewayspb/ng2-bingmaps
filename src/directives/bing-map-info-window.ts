import {Component, SimpleChange, OnDestroy, OnChanges, EventEmitter, ContentChildren, QueryList} from '@angular/core';
import {InfoWindowManager} from '../services/info-window-manager';
import {BingMapMarker} from './bing-map-marker';
import {BingMapInfoWindowAction} from './bing-map-info-window-action';

let infoWindowId = 0;

/**
 * BingMapInfoWindow renders a info window inside a {@link BingMapMarker} or standalone.
 *
 * ### Example
 * ```typescript
 * import {Component} from '@angular/core';
 * import {NG2_BINGMAPS_DIRECTIVES} from 'ng2-bingmaps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [NG2_BINGMAPS_DIRECTIVES],
 *  styles: [`
 *    .bing-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <bing-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <bing-map-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        <bing-map-info-window [disableAutoPan]="true">
 *          Hi, this is the content of the <strong>info window</strong>
 *        </bing-map-info-window>
 *      </bing-map-marker>
 *    </bing-map>
 *  `
 * })
 * ```
 */
@Component({
  selector: 'bing-map-info-window',
  inputs: ['latitude', 'longitude', 'disableAutoPan', 'title', 'description'],
  directives: [BingMapInfoWindowAction],
  template: '',
  outputs: ['infoWindowClose']
})
// onclick="console.log(window.infoWindow); window.infoWindow.close();return false;"
export class BingMapInfoWindow implements OnDestroy,
    OnChanges {
  /**
   * The latitude position of the info window (only usefull if you use it ouside of a {@link
   * SebmGoogleMapMarker}).
   */
  latitude: number;

  /**
   * The longitude position of the info window (only usefull if you use it ouside of a {@link
   * SebmGoogleMapMarker}).
   */
  longitude: number;

  /**
   * The title to display in the info window
   */
  title: string;

  /**
   * The description to display in the info window. 
   */
  description: string;

  /**
   * Disable auto-pan on open. By default, the info window will pan the map so that it is fully
   * visible when it opens.
   */
  disableAutoPan: boolean;

  /**
   * Maximum width of the infowindow, regardless of content's width. This value is only considered
   * if it is set before a call to open. To change the maximum width when changing content, call
   * close, update maxWidth, and then open.
   */
  maxWidth: number;

  /**
   * Holds the marker that is the host of the info window (if available)
   */
  hostMarker: BingMapMarker;

  /**
   * Emits an event when the info window is closed.
   */
  infoWindowClose: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Zero or more actions to show on the info window
   */
  @ContentChildren(BingMapInfoWindowAction) infoWindowActions: QueryList<BingMapInfoWindowAction>;

  private static _infoWindowOptionsInputs: string[] = ['disableAutoPan', 'maxWidth', 'title', 'description'];
  private _infoWindowAddedToManager: boolean = false;
  private _id: string = (infoWindowId++).toString();

  constructor(private _infoWindowManager: InfoWindowManager) {}

  ngAfterContentInit() {
    this._infoWindowManager.addInfoWindow(this);
    this._infoWindowAddedToManager = true;
  }

  /** @internal */
  ngOnChanges(changes: {[key: string]: SimpleChange}) {
    if (!this._infoWindowAddedToManager) {
      return;
    }
    if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
        typeof this.longitude === 'number') {
      this._infoWindowManager.setPosition(this);
    }
    this._setInfoWindowOptions(changes);
  }

  private _setInfoWindowOptions(changes: {[key: string]: SimpleChange}) {
    let options: {[propName: string]: any} = {};
    let optionKeys = Object.keys(changes).filter(
        k => BingMapInfoWindow._infoWindowOptionsInputs.indexOf(k) !== -1);
    optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
    this._infoWindowManager.setOptions(this, options);
  }

  /**
   * Opens the info window.
   */
  open(): Promise<void> {
    return this._infoWindowManager.open(this);
  }

  /**
   * Closes the info window.
   */
  close(): Promise<void> {
    return this._infoWindowManager.close(this).then(() => { this.infoWindowClose.emit(void 0); });
  }

  /** @internal */
  id(): string { return this._id; }

  /** @internal */
  toString(): string { return 'BingMapInfoWindow-' + this._id.toString(); }

  /** @internal */
  ngOnDestroy() { this._infoWindowManager.deleteInfoWindow(this); }
}
