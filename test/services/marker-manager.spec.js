"use strict";
var testing_1 = require('@angular/core/testing');
var core_1 = require('@angular/core');
var marker_manager_1 = require('../../src/services/marker-manager');
var bing_maps_api_wrapper_1 = require('../../src/services/bing-maps-api-wrapper');
var bing_map_marker_1 = require('../../src/directives/bing-map-marker');
function main() {
    testing_1.describe('MarkerManager', function () {
        testing_1.beforeEachProviders(function () { return [
            core_1.provide(core_1.NgZone, { useFactory: function () { return new core_1.NgZone({ enableLongStackTrace: true }); } }),
            marker_manager_1.MarkerManager,
            bing_map_marker_1.BingMapMarker,
            core_1.provide(bing_maps_api_wrapper_1.BingMapsAPIWrapper, { useValue: jasmine.createSpyObj('BingMapsAPIWrapper', ['createMarker']) })
        ]; });
        testing_1.describe('Create a new marker', function () {
            testing_1.it('should call the mapsApiWrapper when creating a new marker', testing_1.inject([marker_manager_1.MarkerManager, bing_maps_api_wrapper_1.BingMapsAPIWrapper], function (markerManager, apiWrapper) {
                var newMarker = new bing_map_marker_1.BingMapMarker(markerManager);
                newMarker.latitude = 34.4;
                newMarker.longitude = 22.3;
                newMarker.label = 'A';
                markerManager.addMarker(newMarker);
                testing_1.expect(apiWrapper.createMarker)
                    .toHaveBeenCalledWith({ position: { lat: 34.4, lng: 22.3 }, label: 'A', draggable: false, icon: undefined });
            }));
        });
        testing_1.describe('Delete a marker', function () {
            testing_1.it('should set the map to null when deleting a existing marker', testing_1.inject([marker_manager_1.MarkerManager, bing_maps_api_wrapper_1.BingMapsAPIWrapper], function (markerManager, apiWrapper) {
                var newMarker = new bing_map_marker_1.BingMapMarker(markerManager);
                newMarker.latitude = 34.4;
                newMarker.longitude = 22.3;
                newMarker.label = 'A';
                var markerInstance = jasmine.createSpyObj('Marker', ['setMap']);
                apiWrapper.createMarker.and.returnValue(Promise.resolve(markerInstance));
                markerManager.addMarker(newMarker);
                markerManager.deleteMarker(newMarker)
                    .then(function () { testing_1.expect(markerInstance.setMap).toHaveBeenCalledWith(null); });
            }));
        });
        testing_1.describe('set marker icon', function () {
            testing_1.it('should update that marker via setIcon method when the markerUrl changes', testing_1.async(testing_1.inject([marker_manager_1.MarkerManager, bing_maps_api_wrapper_1.BingMapsAPIWrapper], function (markerManager, apiWrapper) {
                var newMarker = new bing_map_marker_1.BingMapMarker(markerManager);
                newMarker.latitude = 34.4;
                newMarker.longitude = 22.3;
                newMarker.label = 'A';
                var markerInstance = jasmine.createSpyObj('Marker', ['setMap', 'setIcon']);
                apiWrapper.createMarker.and.returnValue(Promise.resolve(markerInstance));
                markerManager.addMarker(newMarker);
                testing_1.expect(apiWrapper.createMarker)
                    .toHaveBeenCalledWith({ position: { lat: 34.4, lng: 22.3 }, label: 'A', draggable: false, icon: undefined });
                var iconUrl = 'http://angular-maps.com/icon.png';
                newMarker.iconUrl = iconUrl;
                return markerManager.updateIcon(newMarker).then(function () {
                    testing_1.expect(markerInstance.setIcon).toHaveBeenCalledWith(iconUrl);
                });
            })));
        });
    });
}
exports.main = main;
