'use strict';

// Module dependencies
var express = require('express'),
    _ = require('underscore'),
    config = require('./config/config');

// initialize Express
var app = express();

// Express settings
require('./config/express')(app, config);

// Bootstrap routes
require('./config/routes')(app);

// Start the app by listening on <port>
var port = process.env.PORT || 4000
app.listen(port);

// console log info
console.log('Express app started on port '+port);
