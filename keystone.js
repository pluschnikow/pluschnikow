// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv')().load();

// Require keystone
var keystone = require('keystone'),
	engine = require('ejs-locals');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	
	'name': 'pluschnikow.de',
	'brand': 'pluschnikow.de',
	
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	
	'views': 'templates/views',
	'view engine': 'ejs',
	'custom engine' : engine,
	
	'auto update': true,
	
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': 'IVbEb[ol@osM_!peQUe52Sd9|iQI)-JIa8(u[<a_iVkl+g#ToZtw*MVby^hL_$2('
	
});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
	'galleries': 'galleries',
	'enquiries': 'enquiries',
	'users': 'users'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
