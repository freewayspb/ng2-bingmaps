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
  nativeMap: Microsoft.Maps.Map = null;

  nativeMapChange() {
     Microsoft.Maps.loadModule('Microsoft.Maps.Directions', () => {
       this.calculateRoute();
     });
  }
  actionClicked() {
    alert('CLICK!');
  }
  actionClicked2() {
    alert('CLICK 2!');
  }

  calculateRoute() {
    var directionsManager = new Microsoft.Maps.Directions.DirectionsManager(this.nativeMap);
        // Set Route Mode to driving
        directionsManager.setRequestOptions({
          routeMode: Microsoft.Maps.Directions.RouteMode.driving,
          routeDraggable: false
        });
    Microsoft.Maps.Events.addHandler(directionsManager, 'directionsError', function (args) {
      console.log(args.message);
    });
    let waypoint = new Microsoft.Maps.Directions.Waypoint(
      {
        address: 'Wellington',
        location: new Microsoft.Maps.Location(this.lat, this.lng)
      });

    directionsManager.addWaypoint(waypoint);
    let waypoint2 = new Microsoft.Maps.Directions.Waypoint(
      {
        address: 'Taupo',
        location: new Microsoft.Maps.Location(-38.6857, 176.0702)
      });
    directionsManager.addWaypoint(waypoint2);
    directionsManager.calculateDirections();

  }
}
