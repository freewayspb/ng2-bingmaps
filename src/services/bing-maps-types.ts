export interface LatLng {
  constructor(lat: number, lng: number): void;
  lat(): number;
  lng(): number;
}

export class Marker {
  constructor(public map: Microsoft.Maps.Map, private pushpin: Microsoft.Maps.Pushpin){}
  setPosition(latLng: LatLngLiteral): void{
    this.pushpin.setLocation(new Microsoft.Maps.Location(latLng.lat, latLng.lng));
  }
  deleteMarker() {
    this.pushpin.setOptions({ visible: false });
  }
  setTitle(title: string): void{
    console.log('set title');
    this.pushpin.setOptions({text: title});
  }
  setLabel(label: string): void{
    // title does not exist on the TSD.
    this.pushpin.setOptions(<any> {title: label});
  }
  setDraggable(draggable: boolean): void{
    this.pushpin.setOptions({draggable: draggable});
  }
  setIcon(icon: string): void{
    this.pushpin.setOptions({icon: icon});
  }
  getLabel(): string{
    return null;
  }
  addListener(eventType: string, fn: Function): void{
    Microsoft.Maps.Events.addHandler(this.pushpin, eventType, (e) => {
      fn(e);
    });
  }
}

export interface MarkerOptions {
  position: LatLngLiteral;
  title?: string;
  label?: string;
  draggable?: boolean;
  icon?: string;
}

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface MouseEvent { latLng: LatLng; }

export enum MapTypeId {
    aerial,
    auto,
    birdseye,
    collinsBart,
    mercator,
    ordnanceSurvey,
    road
}
export interface MapOptions {
  center?: LatLngLiteral;
  zoom?: number;
  mapTypeId?: MapTypeId;
}

export class InfoWindow {
  constructor(private map: Microsoft.Maps.Map, private infoBox: Microsoft.Maps.Infobox) {}
  close(): void {
    (<any> this.infoBox).setMap(null);
    this.infoBox.setOptions({visible: false});
  };
  getPosition(): LatLngLiteral{
    return  {
      lat: this.infoBox.getLocation().latitude,
      lng: this.infoBox.getLocation().longitude
    };
  };

  open(): void{
    // when using custom HTML, you have to do setMap.
    (<any> this.infoBox).setMap(this.map);
    this.infoBox.setOptions({visible: true});
  };
  setOptions(options: InfoWindowOptions): void{
    this.infoBox.setOptions({
      title: options.title,
      description: options.title
    });
  };
  setPosition(position: LatLngLiteral): void{
    this.infoBox.setLocation(new Microsoft.Maps.Location(position.lat, position.lng));
  };
}

export interface MVCObject { constructor(): void; }

export interface Size {
  height: number;
  width: number;
  constructor(width: number, height: number, widthUnit?: string, heightUnit?: string): void;
  equals(other: Size): boolean;
  toString(): string;
}

export interface InfoWindowOptions {
  title?: string;
  description?: string;
  disableAutoPan?: boolean;
  maxWidth?: number;
  pixelOffset?: Size;
  position?: LatLngLiteral;
  zIndex?: number;
  actions?: InfoWindowAction[];
}

export interface InfoWindowAction {
  label: string;
  eventHandler: (args?: any) => void;
}
