'use strict';

var Config = require("../config/config.js");
var Bookshelf = require('../config/bookshelf.js')(Config);

var Contact = Bookshelf.Model.extend({
  tableName: 'contacts',
  hasTimestamps: true
  
});

module.exports = Bookshelf.model('Contact', Contact);