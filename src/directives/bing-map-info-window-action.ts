import {Directive, Input, Output, EventEmitter} from '@angular/core';

/**
 * BingMapInfoWindowAction renders an action in an info window {@link BingMapInfoWindow}
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
 *        <bing-map-info-window>
 *          <bing-map-info-window-action [label]="actionlabel" (actionClicked)="actionClicked()></bing-map-info-window-action> 
 *        </bing-map-info-window>
 *      </bing-map-marker>
 *    </bing-map>
 *  `
 * })
 * ```
 */
@Directive({
  selector: 'bing-map-info-window-action'
})
export class BingMapInfoWindowAction {
  /**
   * The label to display on the action
   */
  @Input()
  label: string;

  /**
   * Emits an event when the action has been clicked
   */
  @Output()
  actionClicked: EventEmitter<void> = new EventEmitter<void>();

  // todo: implement on change
}
