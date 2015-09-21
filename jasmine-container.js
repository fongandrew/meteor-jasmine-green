(function() {
  'use strict';

  Template.jasmineReporterContainer.events({
    'click #jasmine-reporter-toggle': function(e, instance) {
      var container = instance.$('#jasmine-reporter-container');
      if (container.is(":visible")) {
        container.hide();
      } else {
        container.show();
      }
    }
  });

})();
