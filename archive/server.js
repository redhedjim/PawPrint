/* jshint undef: true, unused: false */
/* globals require: true */

var express = require('express'); //call express
var app = express(); //define our app using express
var bodyParser = require('body-parser'); //get body-parser
var morgan = require('morgan'); //used to see requests in console
var path = require('path');
var Config = require('./server/config/config.js'); //Config file to hold settings
var Bookshelf = require('./server/config/bookshelf')(Config); //For talking with our database
var _ = require("underscore"); //Underscore
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var crypto = require('crypto'); //Encryptes passwords


//helper functions
isJSON = function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};
trim  = function trim(str) {
    if(str)
    {
        str = str.trim();
        str.replace(/\\/g, "\\\\")
            .replace(/\$/g, "\\$")
            .replace(/'/g, "\\'")
            .replace(/"/g, "\\\"");
    }
    return str;
};

//end of helper functions

// set up our express application
app.use(morgan(Config.env)); // log every request to the console

// get information from POST and/or URL params
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));    

app.use(express.static(__dirname + '/public'));//expose public directory
app.set('superSecret', Config.secret); //Secret variable
// set headers  (required for passport)
app.use(function(req,res,next) {   
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
});

//Passport config
//==================
var passport = require('./passport.js');

//API ROUTES 
//---------------------------------
var apiRoutes = require('./server/routes/api_v1.js')(app, express, jwt, bodyParser, Bookshelf, _, Config);
app.use('/api/v1', apiRoutes);

//START THE SERVER
//=================================
app.listen(Config.port);
console.log('Magic happens on port ' + Config.port);