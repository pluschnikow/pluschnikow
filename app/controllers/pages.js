
'use strict';

// Module dependencies
var config = require('../../config/config');

// site  index
exports.index = function(req, res){
  res.render('pages/index', {
    title: config.title_prefix + ' Home',
    device: req.device
  });
};

// legal
exports.legal = function(req, res){
  res.render('pages/legal', {
    title: config.title_prefix + ' Legal',
    device: req.device
  });
};

// privacy
exports.privacy = function(req, res){
  res.render('pages/dataPrivacy', {
    title: config.title_prefix + ' Privacy',
    device: req.device
  });
};