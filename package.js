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

  // Config
  api.addFiles('boot.js', ['client', 'server']);

  api.export(['jasmine',
              'describe',
              'xdescribe',
              'fdescribe',
              'it',
              'xit',
              'fit',
              'beforeEach',
              'afterEach',
              'beforeAll',
              'afterAll',
              'expect',
              'pending',
              'fail',
              'spyOn',
              'jsApiReporter'], ['client', 'server']);
});
