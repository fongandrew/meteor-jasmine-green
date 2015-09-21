/* jshint strict: false */
/* global jasmineRequire: true */

// jasmine.js installs jasmineRequire into global (window) scope
// so let's grab it from window and make it available in package scope
jasmineRequire = window.jasmineRequire;

// clean up window
delete window.jasmineRequire;
