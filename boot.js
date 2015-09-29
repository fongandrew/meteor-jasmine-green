// Initialize Jasmine
/* jshint strict: false */
/* global jasmine: true */

// Get settings from the jasmine object
var getSetting = function(name, defaultVal) {
  var settingsObj;
  if (Meteor.isServer) {
    settingsObj = Meteor.settings.jasmine;
  } else if (Meteor.isClient) {
    settingsObj = Meteor.settings.public.jasmine;
  }
  var ret = settingsObj && settingsObj[name];
  if (typeof ret === "undefined") {
    return defaultVal;
  }
  return ret;
};

// Client - jasmineRequire loaded already
/* global jasmineRequire: true */

// Server - Get Jasmine core files, not what's loaded by Jasmine's Node
// runner (which is configured to fetch tests itself, rather than use Meteor)
if (Meteor.isServer) {
  jasmineRequire = Npm.require("jasmine-core");
}

jasmine = jasmineRequire.core(jasmineRequire);

var env = jasmine.getEnv();
var jasmineInterface = jasmineRequire.interface(jasmine, env);

// Since this is a debug package, we can't make Jasmine's helpers available
// via a normal export, so let's modify the global and window object directly
// (the horror!).
jasmine.addToGlobal = function(globalObj) {
  if (! globalObj) {
    if (Meteor.isServer) {
      globalObj = global;
    } else {
      globalObj = window;
    }
  }

  /* jshint forin: false */
  for (var property in jasmineInterface) {
    globalObj[property] = jasmineInterface[property];
  }
};

if (Meteor.isClient) {

  /**
   *  Since this is being run in a browser and the results should populate to
   *  an HTML page, require the HTML-specific Jasmine code, injecting the same
   *  reference.
   */
  jasmineRequire.html(jasmine);

  /**
   * ## Runner Parameters
   *
   * Browser specific code - wrap the query string in an object and to allow for
   * getting/setting parameters from the runner user interface.
   *
   */
  var queryString = new jasmine.QueryString({
    getWindowLocation: function() { return window.location; }
  });

  var catchingExceptions = queryString.getParam("catch");
  env.catchExceptions(
    typeof catchingExceptions === "undefined" ? true : catchingExceptions);

  var throwingExpectationFailures = queryString.getParam("throwFailures");
  env.throwOnExpectationFailure(throwingExpectationFailures);

  /**
   * ## Reporters
   * The `HtmlReporter` builds all of the HTML UI for the runner page. This
   * reporter paints the dots, stars, and x's for specs, as well as all spec
   * names and all failures (if any).
   */
  var htmlReporter = new jasmine.HtmlReporter({
    env: env,
    onRaiseExceptionsClick: function() {
      queryString.navigateWithNewParam("catch", !env.catchingExceptions());
    },
    onThrowExpectationsClick: function() {
      queryString.navigateWithNewParam("throwFailures",
        !env.throwingExpectationFailures());
    },
    addToExistingQueryString: function(key, value) {
      return queryString.fullStringWithNewParam(key, value);
    },
    getContainer: function() {
      return document.getElementById('jasmine-reporter-container');
    },
    createElement: function() {
      return document.createElement.apply(document, arguments);
    },
    createTextNode: function() {
      return document.createTextNode.apply(document, arguments);
    },
    timer: new jasmine.Timer()
  });

  // Add a simple wrapper that adds callbacks when jasmine is done


  /**
   * The `jsApiReporter` also receives spec results, and is used by any
   * environment that needs to extract the results  from JavaScript.
   */
  env.addReporter(jasmineInterface.jsApiReporter);

  /* global callbackReporter: false */
  // Defined in the jasmine-container.js file. Used to update reactive vars.
  env.addReporter(callbackReporter);

  env.addReporter(htmlReporter);

  /**
   * Filter which specs will be run by matching the start of the full name
   *  against the `spec` query param.
   */
  var specFilter = new jasmine.HtmlSpecFilter({
    filterString: function() { return queryString.getParam("spec"); }
  });

  env.specFilter = function(spec) {
    return specFilter.matches(spec.getFullName());
  };

  /**
   * Setting up timing functions to be able to be overridden. Certain browsers
   *  (Safari, IE 8, phantomjs) require this hack.
   */
  window.setTimeout = window.setTimeout;
  window.setInterval = window.setInterval;
  window.clearTimeout = window.clearTimeout;
  window.clearInterval = window.clearInterval;

  /**
   * ## Execution
   *
   * Function to run all of the loaded specs. App or dev user should call.
   * This function includes initializing the `HtmlReporter` instance and then
   * executing the loaded Jasmine environment. All of this should happen after
   * all of the specs are loaded.
   */
  jasmine.run = function() {
    htmlReporter.initialize();
    env.execute();
  };

  if (getSetting("clientTestOnStart", true)) {
    Meteor.startup(function() {
      jasmine.run();
    });
  }
}

else if (Meteor.isServer) { // Use console reporter
  var jasmineCore = Npm.require('jasmine-core'),
      jasmineNpm = Npm.require('jasmine'),
      path = Npm.require('path'),
      util = Npm.require('util');

  var consoleReporter = new jasmineNpm.ConsoleReporter({
    timer: new jasmine.Timer(),
    jasmineCorePath: path.join(jasmineCore.files.path, 'jasmine.js'),
    print: function() {
      process.stdout.write(util.format.apply(this, arguments));
    },
    showColors: true
  });
  env.addReporter(consoleReporter);

  // Jasmine.run waits a tick before running because execute can block the
  // rest of the app from starting if it's called during startup
  jasmine.run = function() {
    Meteor.setTimeout(function() {
      env.execute();
    });
  };

  if (getSetting("serverTestOnStart", true)) {
    Meteor.startup(function() {
      jasmine.run();
    });
  }
}

if (getSetting("addToGlobal", true)) {
  jasmine.addToGlobal();
}
