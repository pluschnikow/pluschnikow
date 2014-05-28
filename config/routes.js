'use strict';

/**
 * Controllers
 */
var pages = require('../app/controllers/pages');


/**
 * Expose routes
 */
module.exports = function (app) {

  // home route
  app.get('/', pages.index);
  // legal
  app.get('/legal.html', pages.legal);
  // privacy
  app.get('/privacy.html', pages.privacy);
};
