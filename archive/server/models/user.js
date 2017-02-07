'use strict';

var Config = require("../config/config.js");
var Bookshelf = require('../config/bookshelf.js')(Config);
var crypto = require('crypto');	

var User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  encrypt: function(password) {
    password = password.toString(); 
    var cipher = crypto.createCipher(Config.algorithm, password);
    var crypted = cipher.update(password, 'utf8', 'hex');
    cipher += cipher.final('hex');
    return crypted;
  }
});

module.exports = User;