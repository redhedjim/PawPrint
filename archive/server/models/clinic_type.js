'use strict';

var Config = require("../config/config.js");
var Bookshelf = require('../config/bookshelf.js')(Config);

var Clinic_type = Bookshelf.Model.extend({
  tableName: 'clinic_types',
  hasTimestamps: true,
});

module.exports = Clinic_type;