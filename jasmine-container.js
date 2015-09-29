/* global callbackReporter: true */
callbackReporter = {};

(function() {
  'use strict';

  // Reactive vars used by template below -- implicit assumption is that there
  // is only one instance of the jasmineReporterContainer template
  var jasmineStarted = new ReactiveVar(false);
  var jasmineDone = new ReactiveVar(false);
  var hasFailures = new ReactiveVar(false);

  // Callback reporter to set reactive vars during jasmine execution
  callbackReporter = {
    jasmineStarted: function() {
      jasmineStarted.set(true);
    },

    jasmineDone: function() {
      jasmineDone.set(true);
    },

    suiteDone: function(result) {
      if (result.status === "failed") {
        hasFailures.set(true);
      }
    },

    specDone: function(result) {
      if (result.status === "failed") {
        hasFailures.set(true);
      }
    }
  };


  //////

  Template.jasmineReporterContainer.onCreated(function() {
    this.getContainer = function() {
      return this.$('#jasmine-reporter-container');
    };

    var self = this;
    this.autorun(function() {
      if (jasmineDone.get() && hasFailures.get()) {
        self.getContainer().show();
      }
    });
  });

  Template.jasmineReporterContainer.helpers({
    jasmineStarted: function() {
      return jasmineStarted.get();
    },

    hasFailures: function() {
      return hasFailures.get();
    }
  });

  Template.jasmineReporterContainer.events({
    'click #jasmine-reporter-toggle': function(e, instance) {
      var container = instance.getContainer();
      if (container.is(":visible")) {
        container.hide();
      } else {
        container.show();
      }
    }
  });

})();
