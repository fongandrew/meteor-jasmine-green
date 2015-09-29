Jasmine Green
=============

Server- and client-side Jasmine integration testing for Meteor that doesn't
rely upon Velocity.

Velocity has a lot of nifty features and you should absolutely check it out,
but if you don't want/need things like mirrors and browser automation, or
if you're just having trouble getting Velocity running, this package offers a
fairly barebones Jasmine setup you can use as a starting point. It's not ideal
for maintaining a large, well-tested app, but if you just need the Jasmine
equivalent of TinyTest outside of the package context this could work.

This package includes the console-based test reporter included with Jasine's
NPM package for server-side tests and the HTMLReporter that comes included with
Jasmine for client-side tests. All tests are run in the same context as the
Meteor development server so it's up to you to properly mock your variables
and set up a test database as appropriate.


Getting Started
---------------

Install with `meteor install fongandrew:jasmine-green`.

Then launch Meteor with the following variables in your settings.json. Place
your Jasmine tests in top-level code, and they'll be run when Meteor starts.


Additional Configuration
------------------------

You can pass the following additional options via a settings.json file to
prevent Jasmine tests from running automatically on the server and client
respectively:

```
{
  "jasmine": {
    "serverTestOnStart": false,
  },

  "public": {
    "jasmine": {
      "clientTestOnStart": false
    }
  }
}
```

If you configured tests to not autoamtically start, you can manually trigger
tests for either the client or server by calling `jasmine.run()`. Note that
calling `jasmine.run()` multiple times without restarting the server or
reloading the client may report the same spec multiple times.

Production
----------
This is a "debugOnly" package, by default, so variables added by this package
will not be available in production. Be sure to isolate your tests so they're
also excluded from production or at least not dependent on variables like
"jasmine" and "describe" being available.