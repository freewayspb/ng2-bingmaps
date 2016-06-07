import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Ng2BingmapsDemoAppComponent } from '../app/ng2-bingmaps-demo.component';

beforeEachProviders(() => [Ng2BingmapsDemoAppComponent]);

describe('App: Ng2BingmapsDemo', () => {
  it('should create the app',
      inject([Ng2BingmapsDemoAppComponent], (app: Ng2BingmapsDemoAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'ng2-bingmaps-demo works!\'',
      inject([Ng2BingmapsDemoAppComponent], (app: Ng2BingmapsDemoAppComponent) => {
    expect(app.title).toEqual('ng2-bingmaps-demo works!');
  }));
});
