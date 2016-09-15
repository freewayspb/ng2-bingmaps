/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  '@angular' :'vendor/@angular',
};

/** User packages configuration. */
const packages: any = {
  'vendor/rxjs'                             : {main: 'Rx'},
  'vendor/@angular/core'                    : {main: 'bundles/core.umd.min.js'},
  'vendor/@angular/forms'                   : {main: 'bundles/forms.umd.min.js'},
  'vendor/@angular/common'                  : {main: 'bundles/common.umd.min.js'},
  'vendor/@angular/compiler'                : {main: 'bundles/compiler.umd.min.js'},
  'vendor/@angular/router'                  : {main: 'bundles/router.umd.min.js'},
  'vendor/@angular/platform-browser'        : {main: 'bundles/platform-browser.umd.min.js'},
  'vendor/@angular/platform-browser-dynamic': {main: 'bundles/platform-browser-dynamic.umd.min.js'},
  'vendor/@angular/http' : {main: 'bundles/http.umd.min.js'}
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Thirdparty barrels.
  '../dist',  


  // App specific barrels.
  'app',
  'demo',
  'demo/app',
  'app/shared',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': '../node_modules/@angular',
    'rxjs': '../node_modules/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
