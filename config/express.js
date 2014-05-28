'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    config = require('./config'),
    engine = require('ejs-locals'),
    device = require('express-device');

module.exports = function(app, config) {

  app.set('showStackError', true);

  // Prettify HTML
  app.locals.pretty = true;

  // Should be placed before express.static
  // To ensure that all assets and data are compressed (utilize bandwidth)
  app.use(express.compress({
    filter: function(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    // Levels are specified in a range of 0 to 9, where-as 0 is
    // no compression and 9 is best compression, but slowest
    level: 9
  }));

  // Only use logger for development environment
  if (process.env.NODE_ENV === 'development') {
    app.use(express.logger('dev'));
  }

  // enable ejs-locals
  app.engine('ejs', engine);
  // Set views path, template engine and default layout
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'ejs');

  // Enable jsonp
  app.enable("jsonp callback");

  app.configure(function() {
    // The cookieParser should be above session
    app.use(express.cookieParser());

    // Request body parsing middleware should be above methodOverride
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.methodOverride());

    // Enable Device-Detection for Express
    app.use(express.bodyParser());
    app.use(device.capture());

    // Throws an internal 'has no method' error, wtf?
    // app.enableDeviceHelpers();
    // app.enableViewRouting();

    // Routes should be at the last
    app.use(app.router);

    // Setting the static folder
    app.use(express.static(config.root + '/public'));

    // Assume "not found" in the error msgs is a 404. this is somewhat
    // silly, but valid, you can do whatever you like, set properties,
    // use instanceof etc.
    app.use(function(err, req, res, next) {
      // Treat as 404
      if (~err.message.indexOf('not found')) {
        return next();
      }

      // Log it
      console.error(err.stack);

      // Error page
      res.status(500).render('pages/errors/500', {
        error: err.stack
      });
    });

    // Assume 404 since no middleware responded
    app.use(function(req, res, next) {
      res.status(404).render('pages/errors/404', {
        url: req.originalUrl,
        title: config.title_prefix + ' 404',
        error: 'Not found'
      });
    });

  });
};
