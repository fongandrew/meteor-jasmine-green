Package.describe({
  name: 'fongandrew:jasmine-green',
  summary: 'Jasmine tests without Velocity',
  version: '0.1.0',
  debugOnly: true
});

/* jshint strict: false */
var npmDeps = {
  jasmine: "2.3.2"
};
npmDeps['jasmine-core'] = "2.3.4";
Npm.depends(npmDeps);

Package.onUse(function(api) {
  'use strict';
  api.versionsFrom('METEOR@1.1.0.3');
  api.use('templating', 'client');
  api.use('reactive-var', 'client');

  // Add client files manually (for server, use Npm.require)
  api.addFiles([
    'jasmine-container.html',
    'jasmine-container.js',
    'jasmine.js',
    'jasmine-global-hack.js',
    'jasmine-html.js',
    'jasmine.css',
    'jasmine-container.css' // Goes after jasmine.css to override some things
  ], 'client');

  // Config, boot Jasmine into globals
  api.addFiles('boot.js', ['client', 'server']);

  // NB: Because this is a "debugOnly" package, exported variables would only
  // be available under the `Package['fongandrew:jasmine-green']` object. That
  // makes for some ugly test code, so in boot.js, we directly modify the
  // window and global object for client and server respectively.
});
