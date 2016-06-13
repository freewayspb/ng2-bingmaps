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
  title: string = 'ng2-bingmaps-demo works!';
  lat: number = -41.2865;
  lng: number = 174.7762;
  zoom: number = 15;

  latMarker: number = -40.2865;
  lngMarker: number = 173.7762;

  latMarker2: number = -40.1865;
  lngMarker2: number = 173.1762;
  infoWindowTitle: string = 'Title info';
  infoWindowHeight: number = 400;
  infoWindowWidth: number = 500;
  infoWindowDescription: string = `<div class="description">This is the description. It can contain HTML (requires branch experimental at the moment!!), like links: <a href="http://bing.com">BING</a><br/>
  and images: <img src="https://showtheway.io/img/showtheway-bing-maps.png" alt="bing map icon"/>
  </div>`;
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
