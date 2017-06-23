/**
 * Module dependencies.
 */
var config = require('nconf'),
  path = require('path');

// Set up config
config.use('user', { type: 'file', file: path.join(__dirname, 'config', 'development', 'config.json') });
config.use('global', { type: 'file', file: path.join(__dirname, 'config', 'config.json') });
module.exports = config;
