'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
  root: rootPath,
  port: process.env.PORT || 4000,
  db_options: { server: { socketOptions: { keepAlive: 1 } } },
  title_prefix: 'Konstantin Pluschnikow - Developer - Cologne, Germany | '
};
