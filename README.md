Jasmine Green
=============

Server- and client-side Jasmine integration testing for Meteor that doesn't
rely upon Velocity.

Velocity has a lot of nifty features and you should absolutely check it out,
but if you don't want/need things like mirrors and browser automation, or
if you're just having trouble getting Velocity running, this package offers a
fairly barebones Jasmine setup you can use as a starting point. It's not ideal
for maintaining a large, well-tested app, but if you just need the Jasmine
equivalent of TinyTest, but for your app, this could work.

This package includes the console-based test reporter included with Jasine's
NPM package for server-side tests and the HTMLReporter that comes included with
Jasmine for client-side tests. All tests are run in the same context as the
Meteor development server so it's up to you to properly mock your variables
and set up a test database as appropriate.


Getting Started
---------------

Install with `meteor install fongandrew:jasmine-green`.

Then launch Meteor with the following variables in your settings.json.

```
"jasmine": {
  "serverTestOnStart": true,
  "addToGlobal": true
},

"public": {
  "jasmine": {
    "clientTestOnStart": true,
    "addToGlobal": true
  }
}
```

Place your Jasmine tests in top-level code, and they'll be run when Meteor
starts.


Additional Configuration
------------------------

The `jasmine` object in the settings.json file controls tests on the server,
whereas settinggs on `public.jasmine` are used to configure client tests.

If `serverTestOnStart` or `clientTestOnTest` is set to true, this package
will run tests on start. You can  also manually trigger tests for either
the client or server by calling `jasmine.run()`. Note that calling
`jasmine.run()` multiple times without restarting the server or reloading the
client may report the same spec multiple times.

Because this is a "debugOnly" package, by default, exported Jasmine interface
variables like "it" and "describe" are namespaced under the
`Package['fongandrew:jasmine-green']` object. Setting "addToGlobal" to true
will cause the package to add Jasmine's interface variables to the global
or window object so you can write tests like your normally do.
