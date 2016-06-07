import { Component } from '@angular/core';
import { NG2_BINGMAPS_DIRECTIVES } from '../../dist/directives';

@Component({
  moduleId: module.id,
  selector: 'ng2-bingmaps-demo-app',
  templateUrl: 'ng2-bingmaps-demo.component.html',
  styleUrls: ['ng2-bingmaps-demo.component.css'],
  directives: [NG2_BINGMAPS_DIRECTIVES]
})
export class Ng2BingmapsDemoAppComponent {
  title = 'ng2-bingmaps-demo works!';
  lat: number = -41.2865;
  lng: number = 174.7762;

  latMarker: number = -40.2865;
  lngMarker: number = 173.7762;
  infoWindowTitle: string = 'Title info';
  infoWindowDescription: string = 'Info description';
  actionClicked() {
    alert('CLICK!');
  }
  actionClicked2() {
    alert('CLICK 2!');
  }
}
