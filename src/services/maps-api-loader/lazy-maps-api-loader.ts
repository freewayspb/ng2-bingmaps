import {Injectable, Optional} from '@angular/core';
import {MapsAPILoader} from './maps-api-loader';

export enum ScriptProtocol {
  HTTP,
  HTTPS,
  AUTO
}

export class LazyMapsAPILoaderConfig {
  /**
   * The Bing Maps API Key (see:
   * https://developers.google.com/maps/documentation/javascript/get-api-key)
   */
  apiKey: string = null;

  /**
   * The Google Maps client ID (for premium plans).
   * When you have a Google Maps APIs Premium Plan license, you must authenticate
   * your application with either an API key or a client ID.
   * The Google Maps API will fail to load if both a client ID and an API key are included.
   */
  clientId: string = null;

  /**
   * The Google Maps channel name (for premium plans).
   * A channel parameter is an optional parameter that allows you to track usage under your client
   * ID by assigning a distinct channel to each of your applications.
   */
  channel: string = null;

  /**
   * Google Maps API version.
   */
  apiVersion: string = '3';

  /**
   * Host and Path used for the `<script>` tag.
   */
  hostAndPath: string = 'www.bing.com/api/maps/mapcontrol';

  /**
   * Protocol used for the `<script>` tag.
   */
  protocol: ScriptProtocol = ScriptProtocol.HTTPS;

  /**
   * The branch to use: Release, Experimental, or Frozen.
   * Set to Experimental to use the newest features, or if it contains a bug fix you require. Otherwise leave blank or set to Release.
   */
  branch: string = 'release';
}

const DEFAULT_CONFIGURATION = new LazyMapsAPILoaderConfig();

@Injectable()
export class LazyMapsAPILoader extends MapsAPILoader {
  private _scriptLoadingPromise: Promise<void>;

  constructor(@Optional() private _config: LazyMapsAPILoaderConfig) {
    super();
    if (this._config === null || this._config === undefined) {
      this._config = DEFAULT_CONFIGURATION;
    }
  }

  load(): Promise<void> {
    if (this._scriptLoadingPromise) {
      return this._scriptLoadingPromise;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    const callbackName: string = `angular2bingmaps${new Date().getMilliseconds() }`;
    script.src = this._getScriptSrc(callbackName);

    this._scriptLoadingPromise = new Promise<void>((resolve: Function, reject: Function) => {
      (<any>window)[callbackName] = () => { resolve(); };

      script.onerror = (error: Event) => { reject(error); };
    });

    document.body.appendChild(script);
    return this._scriptLoadingPromise;
  }

  private _getScriptSrc(callbackName: string): string {
    let protocolType: ScriptProtocol =
        (this._config && this._config.protocol) || DEFAULT_CONFIGURATION.protocol;
    let protocol: string;

    switch (protocolType) {
      case ScriptProtocol.AUTO:
        protocol = '';
        break;
      case ScriptProtocol.HTTP:
        protocol = 'http:';
        break;
      case ScriptProtocol.HTTPS:
        protocol = 'https:';
        break;
    }

    const hostAndPath: string = this._config.hostAndPath || DEFAULT_CONFIGURATION.hostAndPath;    
    const branch: string = this._config.branch || DEFAULT_CONFIGURATION.branch;
    const queryParams: {[key: string]: string} = {
      callback: callbackName
    };

    if (branch) {
      queryParams['branch'] = branch;
    }
    const params: string = Object.keys(queryParams)
                               .map((k: string, i: number) => {
                                 let param = (i === 0) ? '?' : '&';
                                 return param += `${k}=${queryParams[k]}`;
                               })
                               .join('');
    return `${protocol}//${hostAndPath}${params}`;
  }
}
