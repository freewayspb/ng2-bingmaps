/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
 /* tslint:disable */

import * as import0 from '@angular/core/src/linker/ng_module_factory';
import * as import1 from './core';
import * as import2 from '@angular/core/src/di/injector';
import * as import3 from '@angular/core/src/i18n/tokens';
class BingMapsModuleInjector extends import0.NgModuleInjector<import1.BingMapsModule> {
  _BingMapsModule_0:import1.BingMapsModule;
  __LOCALE_ID_1:any;
  __TRANSLATIONS_FORMAT_2:any;
  constructor(parent:import2.Injector) {
    super(parent,[],[]);
  }
  get _LOCALE_ID_1():any {
    if ((this.__LOCALE_ID_1 == (null as any))) { (this.__LOCALE_ID_1 = (null as any)); }
    return this.__LOCALE_ID_1;
  }
  get _TRANSLATIONS_FORMAT_2():any {
    if ((this.__TRANSLATIONS_FORMAT_2 == (null as any))) { (this.__TRANSLATIONS_FORMAT_2 = (null as any)); }
    return this.__TRANSLATIONS_FORMAT_2;
  }
  createInternal():import1.BingMapsModule {
    this._BingMapsModule_0 = new import1.BingMapsModule();
    return this._BingMapsModule_0;
  }
  getInternal(token:any,notFoundResult:any):any {
    if ((token === import1.BingMapsModule)) { return this._BingMapsModule_0; }
    if ((token === import3.LOCALE_ID)) { return this._LOCALE_ID_1; }
    if ((token === import3.TRANSLATIONS_FORMAT)) { return this._TRANSLATIONS_FORMAT_2; }
    return notFoundResult;
  }
  destroyInternal():void {
  }
}
export const BingMapsModuleNgFactory:import0.NgModuleFactory<import1.BingMapsModule> = new import0.NgModuleFactory(BingMapsModuleInjector,import1.BingMapsModule);