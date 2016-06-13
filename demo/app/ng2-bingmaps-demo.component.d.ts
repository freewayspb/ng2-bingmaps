/**
 * ng2-bingmaps - Angular 2 components for Bing Maps
 * @version v0.1.0
 * @link https://github.com/youjustgo/ng2-bingmaps
 * @license MIT
 */
export declare class Ng2BingmapsDemoAppComponent {
    title: string;
    lat: number;
    lng: number;
    zoom: number;
    latMarker: number;
    lngMarker: number;
    latMarker2: number;
    lngMarker2: number;
    infoWindowTitle: string;
    infoWindowHeight: number;
    infoWindowWidth: number;
    infoWindowDescription: string;
    nativeMap: Microsoft.Maps.Map;
    nativeMapChange(): void;
    actionClicked(): void;
    actionClicked2(): void;
    calculateRoute(): void;
}
