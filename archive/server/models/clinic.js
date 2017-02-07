'use strict';

var Config = require("../config/config.js");
var Bookshelf = require('../config/bookshelf.js')(Config);
var Contact = require('../models/contact.js')
var Clinic_type = require('../models/clinic_type.js')

var Clinic = Bookshelf.Model.extend({
  tableName: 'clinics',
  hasTimestamps: true,
  regional_director: function() {
      return this.belongsTo(Contact, 'regional_director');
  },
  type: function(){
      return this.belongsTo(Clinic_type, "type");
  },
  clinic_manager:  function(){
      return this.belongsTo(Contact, "clinic_manager");
  },
  medical_director: function(){
      return this.belongsTo(Contact, "medical_director");
  }
});

module.exports = Bookshelf.model('Clinic', Clinic);