'use strict'

module.exports = function(app, express, jwt, bodyParser, Bookshelf, _, Config) {
 
//get an instance of the express router
var apiRouter = express.Router();

var requireAuth = function(req, res, next) {
	if (!req.user) {
		res.end('Not authorized', 401)
	}	else {
		next()
	}
}



apiRouter.get('/', function(req, res){
   res.json(
	   { message: "Welcome to the Clinic Tron API. You can see the docs at https://hospitals.associatevets.com/docs" }
	);

}); 

//========================
//  Authenticate login
//   Upon valid email and password this 
//   function returns an authToken to the client
//   that must be sent with every request
//========================
apiRouter.post('/login', (req, res) => {
	let User = require('../models/user.js');
	let messages = [];
	let promises = [];
	let email = trim(req.body.email);
	let password = trim(req.body.password);
	let authToken,
		error = true,
		status = 401;

	//check if login is @vca, then we'll do an AD auth, otherwise we'll do a DB auth
	if(email.split("@")[1] === "vca.com")
	{
		//we are looking at a vca account
		res.json({email: email, password: password});
	}
	else
	{
		
		/*promises.push(new Promise((resolve, reject) => {
			User.forge({email: email}).fetch().then(function(user, err) {
				if(user) 
				{
					if(user.get('password') === user.encrypt(password))
					{
						//everything matches
						authToken = jwt.sign(user, app.get('superSecret'), {
							expiresIn: '7d'
						});
						messages.push("Login Success");
						status = 200;
						resolve();
					}
					else
					{
						messages.push("The username or password you entered is invalid. Please try again.");
						resolve();
					}
				}
				else
				{
					messages.push("No user found with that email, please try again!");
					resolve();
				}
			}).catch(err => {
				messages.push("There was a database error. Contact your administrator");
				status = 500;
				reject();
			});
		}));*/
	}

	Promise.all(promises).then(values => {
		res.status(status).send({
			error: error,
			message: messages,
			authToken: authToken
		});
	}).catch(err => {
		res.status(status).send({
			error: error,
			message: messages
		});
	});
});

apiRouter.route('/clinics').get(function(req,res){	
	var Clinic = require('../models/clinic.js') //Include model
	var clinics = new Bookshelf.Collection([], {model: Clinic}) //instantiate model
	var clinic_name = req.query.name; //Take search parameter
	
  	//Start search and extend
	var extend = req.query.extend;
	var opts = {}; //Create empty array
	if(extend !== undefined && extend !== null && extend.toUpperCase() === "TRUE"){
		opts.withRelated = ["type", "regional_director", "medical_director", "clinic_manager"]
	}	
  //End seach and extend
  
  //Show only unarchived records
  clinics.query(function(qb){
		qb.where({archived: null}).orWhere({archived: 0});
  });
  //Fetch clinics
	clinics.fetch(opts).then(function(collection){
		if (clinic_name !== undefined && clinic_name !== null && clinic_name !== ""){
			var clinic_search = collection.filter(function(model){
				if (model.attributes.name === null){
					return false;
				}else{
					var name = ~model.attributes.name.toUpperCase().indexOf(clinic_name.toUpperCase());
					return name;
				}
			});
			var clinic_results = clinic_search; //If search parameters are present st the collection to returned search results
		}else{
			var clinic_results = collection; //If search parametes are empty, return full collection
		};	
		if(collection != null){ //Checks if model is null(there is no data in the table) and let's the user know.
			res.status(200).send({
				error:false,
				message: null,
				data: clinic_results
			});
		}else{
			res.status(200).send({
				error:true,
				message: "Sorry, no clinics were found.",
				data: null
			});
		}
	}).catch(function(err){
		res.status(400).send({
			error: true,
			title: "Bad request",
			details: {"error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
			data: null
		});
	})
})

//============================
//  Middleware to verify authToken
//  - Checks every request for token below this point
//============================

apiRouter.use(function(req, res, next){
	//Checks the header, url params, or POST params for token
	var authToken = req.body.authToken || req.query.authToken || req.headers['x-auth-token'];
	var messages = [];
	if(authToken){
		//Verify secret and checks token validity
		jwt.verify(authToken, app.get('superSecret'), function(err, decoded) {			
			if(err){
				//If there is an invalid authToken, redirect user to login screen 
				// res.status(401).redirect('/login')
					messages.push('Failed to authenticate token. Please login and try again.')
					res.status(401).send({
						error: true,
						message: messages			
					});
			}else{
				req.decoded = decoded; //If token checks out, save to request for use in other routes
				next();			
			}	
		});
	}else{
		//If there is no authToken, redirect user to login screen 
		messages.push('Your session has expired. Please login again.')
		res.status(401).send({
			error: true,
			message: messages
		})
	}
});

//========================
//  USERS
//========================
apiRouter.route('/users')

//Get list of all users
.get(function(req, res) {
	var User = require('../models/user.js');

	var users = User.forge();

	//start of searching code
	var first = req.query.first;
	var last = req.query.last;

	var name = req.query.name; //<-- special field for searching first OR last name

	if (first !== undefined && first !== null){
		users.where("first", "LIKE", "%"+first+"%");
	}

	if (last !== undefined && last !== null){
		users.where("last", "LIKE", "%"+last+"%");
	}

	if (name !== undefined && name !== null){
		users.query(function(qb){
			qb.where('last', 'LIKE', '%'+name+'%').orWhere('first', 'LIKE', '%'+name+'%');
		});
	}

	//end of search code

	users.query(function(qb){
		qb.where({archived: null}).orWhere({archived: 0});
	});
	users.fetchAll().then(function(model){
			//Checks if model is null(there is no data in the table) and let's the user know.
			if(model != null){
				res.status(200).send({
					error:false,
					message: null,
					data: model
				});
			}else{
				res.status(404).send({
					error:true,
					message: "Sorry, no users were found. Please check your input and try again.",
					data: null
				});
			}
	}).catch(function(err) {
		res.status(400).send({
			error: true,
			title: "Bad request",
			error_message: err_msg,
			details: {"error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
			data: null
		});
	});
})

//Create new user
.post(function(req, res, bodyParser) {
	var User = require('../models/user.js');
	
	//Stringify the user passsword because...reasons (encrypt function needs this to work properly)
	var password = req.body.password;


	
	/*
	=============Test variables ===================
	Use these to test the POST route. These will ultimately be collected from user input
	Past the following example into Postman in BODY as raw JSON(application/json)

		{
			"first": "Bob",
			"last": "Sacramento",
			"email": "bob@sacramento.ca",
			"admin": 1
		}
	=============================================
	*/
	var messages = [];
	User.forge({
		password: 	encrypt(password),
		first: 		req.body.first,
		last: 		req.body.last,
		email: 		req.body.email,
		admin:		req.body.admin

	}).save().then(function(model){
		var user =  {user: {"first": model.attributes.first, "last": model.attributes.last, "email": model.attributes.email, "admin": model.attributes.admin}}
		messages.push("User '" + user.user.first + " " + user.user.last + "' has been created successfully");
		res.status(201).send({
			error:false,
			message: messages,
			data: user
		});

	}).catch(function(err) {
		if(err.code == "ER_DUP_ENTRY"){
			messages.push("The email address you entered is already in the database. Please login as that user or register a new email address.")
		}else{
			messages.push("There was an error creating the user.");
			messages.push(err.message);
		}		
		res.status(400).send({
			error: true,
			message: messages,
			data: null
		});
	});

})

apiRouter.route('/users/:id')
	
.get(function(req, res) { //Returns a single user's info

	var User = require('../models/user.js');
	User.forge({id: req.params.id}).fetch().then(function(model){
		//This checks for an entry with the requested parameter in the table and throws an error if it is not found
		if(model != null){
			res.status(200).send({
				error:false,
				message: null,
				data: model
			});
		}else{
			res.status(404).send({
				error:true,
				message: "A user with the id of " + req.params.id + " could not be found. Please check your input and try again.",
				data: null
			});
		}
	}).catch(function(err) {
		res.status(400).send({
			error: true,
			title: "Bad request",
			status: 400,
			error_message: err_msg,
			details: {"error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
			data: null

		});
	});
})

.patch(function(req, res, bodyParser) {  //Edit an existing user (!!PUT & PATCH METHODS ARE IDENTICAL!!)
	updateUser(req, res)
})
.put(function(req, res, bodyParser) {   //Edit an existing user (!!PUT & PATCH METHODS ARE IDENTICAL!!)
	updateUser(req, res)
})
.delete(function(req, res) { //Delete a specific user
	
	var User = require('../models/user.js');
	User.forge({id: req.params.id}).save({archived: 1}, {patch: true}).then(function(model){ //sets inactive to true instead of destroying record
		res.status(200).send({
			error:false,
			message: "User " + req.params.id + " was archived successfully.",
			data: model
		});
	}).catch(function(err){
		res.status(400).send({
			error: true,
			title: "Bad request",
			details: {"error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
			data: null
		});
	});
})

//===========================
// Contacts
//===========================
apiRouter.route('/contacts')

//Get all records
.get(function(req,res){
	
    var Contact = require('../models/contact.js'); //Reference in model
	
	var contacts = Contact.forge(); //Instantiate the model
	
	//Start of searching code
	var first = req.query.first; //Set first name to var
	var last = req.query.last; //Set last name to var
	var name = req.query.name; //<-- special field for searching first OR last name
	var clinic = req.query.clinic; //If contact list belongs to a clinic subview, this will only send those contacts belonging to a clinic

	if (first !== undefined && first !== null){
		contacts.where("first", "LIKE", "%"+first+"%");
	}

	if (last !== undefined && last !== null){
		contacts.where("last", "LIKE", "%"+last+"%");
	}

	if (name !== undefined && name !== null){
		console.log("Name sent")
		contacts.query(function(qb){
			qb.where('last', 'LIKE', '%'+name+'%').orWhere('first', 'LIKE', '%'+name+'%');
		});
	}

	if (clinic){
		contacts.query(function(qb){
			qb.where('clinic_id', '=', clinic);
		});
	}
	//End of search code

	// //If user requests to view archived records from settings, they will be shown
	// //Not active yet
	// contacts.query(function(qb){
		// 	if(showArchivedRecords){
		// 		qb.where({archived: 1})
		// 	}else{
		// 		qb.where({archived: null}).orWhere({archived: 0});
		// 	}
	// });

	contacts.query(function(qb){
		qb.where({archived: null}).orWhere({archived: 0});
	});

	contacts.fetchAll().then(function(model){
		//Checks if model is null(there is no data in the table) and returns appropriate response.
		if(model != null){
			res.status(200).send({
				error:false,
				message: null,
				data: model
			});
		}else{
			res.status(200).send({
				error:true,
				message: "Sorry, no users were found. Please check your input and try again.",
				data: null
			});
		}	
	}).catch(function(err){
		res.status(400).send({
			error: true,
			title: "Bad request",
			details: {"error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
			data: null
		});	
	});		
})

//Create new record
.post(function(req,res){
	var Contact = require('../models/contact.js');

	/*
	=============Test variables ===================
	Use these to test the POST route. These will ultimately be collected from user input
	Past the following example into Postman in BODY as raw JSON(application/json)

		{
			"first": "Jenny",
			"last" : "Ovadair",
			"email"     : "toronto@pete.ca",
			"phone1"    : "403-867-5309",
			"phone2"    : "1800-551-8900",
			"prefix"    : "Dr.",
			"job_title": "IT Director"
		}
	=============================================
	*/
	var messages = [];
	Contact.forge({
		prefix: 	req.body.prefix,
		first: 		req.body.first,
		last: 		req.body.last,
		email: 		req.body.email,
		phone1: 	req.body.phone1,
		phone2: 	req.body.phone2,
		job_title: 	req.body.job_title

	}).save().then(function(model){
		messages.push("" + req.body.first + " " + req.body.last + " has been added as a contact");
		res.status(201).send({
			error:false,
			message: messages,
			data: model
		});
	}).catch(function(err) {
		messages.push('There was an error creating this contact. Please try again.');
		messages.push(err.message)
		res.status(400).send({
			error: true,
			message: messages,
			details: {"error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
			data: null
		});
	});
})

apiRouter.route('/contacts/:id') //Acts upon a single record

.get(function(req,res){    //GET single record info
	var Contact = require('../models/contact.js');

	Contact.forge({id: req.params.id}).fetch().then(function(model){
		//This checks for an entry with the requested parameter in the table and throws an error if it is not found
		if(model != null){
			res.status(200).send({
				error:false,
				message: null,
				data: model
			});
		}else{
			res.status(404).send({
				error:true,
				message: "A contact with the id of " + req.params.id + " could not be found.",
				data: null
			});
		}
	}).catch(function(err) {
		res.status(400).send({
			error: true,
			title: "Bad request",
			details: {"Error": err, "error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
			data: null
		});
	});
})
.put(function(req,res){    //Update single record
	updateContact(req,res);
})
.patch(function(req,res){  //Update single record
	updateContact(req,res);
})
.delete(function(req,res){ //Delete single record
	
	var Contact = require('../models/contact.js');
	var messages = [];
	Contact.forge({id: req.params.id}).save({archived: 1}, {patch: true}).then(function(model){ //sets inactive to true instead of destroying record
		messages.push("Contact has been archived.");
		res.status(200).send({
			error: false,
			message: messages,
			data: null
		});
	}).catch(function(err){
		messages.push("The was an error archiving your contact.");
		messages.push(err.message);
		res.status(400).send({
			error: true,
			message: messages,
			details: {"error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
			data: null
		});
	});
})
//===========================
// Clinics
//===========================
apiRouter.route('/clinics')

.post(function(req,res){ //Create new record
    	var Clinic = require('../models/clinic.js');

	/*
	=============Test variables ===================
	Use these to test the POST route. These will ultimately be collected from user input
	Past the following example into Postman in BODY as raw JSON(application/json)
		{
			"name": "Super Fancy Clinic",
			"clinic_code" : "SFCC",
			"accounting_number"    : "1234",
			"conversion_date"    : "2015-01-12",
			"pms": "Cornerstone"
			"type"    : "1",
			"regional_director"    : "1",
			"medical_director"    : "2",
			"clinic_manager"    : "3",
			"email1"     : "guy@place.com",
			"email2"    : "lady@thing.com",
			"phone1"    : "403-867-5309",
			"phone2"    : "1800-551-8900",
			"address"  : "123 Easy St SW",
			"city"      : "Calgary",
			"province"  : "Alberta",
			"country"   : "Canada",
			"postal"    : "T2R1H9",
		}
	=============================================
	*/
	var messages = [];
	Clinic.forge({
		name: 				req.body.name,
		clinic_code: 		req.body.clinic_code,
		accounting_number: 	req.body.accounting_number,
		conversion_date: 	req.body.conversion_date,
		pms: 				req.body.pms,
		type: 				req.body.type,
		regional_director: 	req.body.regional_director,
		clinic_manager: 	req.body.clinic_manager,
		medical_director: 	req.body.medical_director,
		phone1: 			req.body.phone1,
		phone2: 			req.body.phone2,
		email1: 			req.body.email1,
		email2: 			req.body.email2,
		address: 			req.body.address,
		city: 				req.body.city,
		province: 			req.body.province,
		country: 			req.body.country,
		postal: 			req.body.postal
		
	}).save().then(function(model){
		messages.push("'" + req.body.name + "' has been added as a hospital");
		res.status(201).send({
			error:false,
			message: messages,
			data: model
		});
	}).catch(function(err) {
		messages.push("There was an issue creating this hospital. Check your input and try again.");
		messages.push(err.message);
		res.status(400).send({
			error: true,
			message: messages,
			details: {"error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
			data: null
		});
	});
})

apiRouter.route('/clinics/:id')
.get(function(req,res){    //GET single record info
	var Clinic = require('../models/clinic.js');

	//Extend model
	var opts = {}; //Create empty array
	opts.withRelated = ["type", "regional_director", "medical_director", "clinic_manager"]
	// End extend model

	Clinic.forge({id: req.params.id}).fetch(opts).then(function(model){
		//This checks for an entry with the requested parameter in the table and throws an error if it is not found
		if(model != null){
			res.status(200).send({
				error:false,
				message: null,
				data: model
			});
		}else{
			res.status(404).send({
				error:true,
				message: " '" + req.params.id + "' could not be found.",
				data: null
			});
		}
	}).catch(function(err) {
		res.status(400).send({
			error: true,
			title: "Bad request",
			details: {"error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
			data: null
		});
	});
})
.put(function(req,res){    //Update single record
	updateClinic(req,res);
})
.patch(function(req,res){  //Update single record
	updateClinic(req,res);
})
.delete(function(req,res){ //Delete single record
	
	var Clinic = require('../models/clinic.js');
	var messages = [];
	Clinic.forge({id: req.params.id}).save({archived: 1}, {patch: true}).then(function(model){ //sets inactive to true instead of destroying record
		messages.push("Clinic has been archived.");
		res.status(200).send({
			error: false,
			message: messages,
			data: null
		});
	}).catch(function(err){
		messages.push("The was an error archiving your clinic.");
		messages.push(err.message);
		res.status(400).send({
			error: true,
			message: messages,
			details: {"error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
			data: null
		});
	});
})
//===========================
// Clinic Types
//===========================
apiRouter.route('/clinic_types')

//Get all records
.get(function(req,res){
    var Clinic_type = require('../models/clinic_type.js'); //Reference in model	
	var clinic_types = Clinic_type.forge(); //Instantiate the model
	
	var type = req.query.type; //For searching by type

	//Show only unarchived records
	clinic_types.query(function(qb){
		qb.where({archived: null}).orWhere({archived: 0});
	});

	clinic_types.fetchAll().then(function(collection){
		if (type !== undefined && type !== null && type !== ""){
			var type_search = collection.filter(function(model){
				if(model.attributes.type === null){
					return false;
				}else{
					var type_name = ~model.attributes.type.toUpperCase().indexOf(type.toUpperCase());
					return type_name;
				}
			});
			var typeData = type_search;
		}else{
			var typeData = collection;
		};
		//Checks if model is null(there is no data in the table) and returns appropriate response.
		if(collection != null){
			res.status(200).send({
				error:false,
				message: "Behold! Clinic Types!",
				data: typeData
			});
		}else{
			res.status(200).send({
				error:true,
				message: "Sorry Guv'na, no contact types were found.",
				data: null
			});
		}	
	}).catch(function(err){
		res.status(400).send({
			error: true,
			title: "Bad request",
			details: {"error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
			data: null
		});	
	});		
})

//Create new record
.post(function(req,res){
	var Clinic_type = require('../models/clinic_type.js');
	var messages = []; // To hold error/success messages to client

	/*
	=============Test variables ===================
	Use these to test the POST route. These will ultimately be collected from user input
	Past the following example into Postman in BODY as raw JSON(application/json)
			{
			"type"    : "Flagship"
			}			
	=============================================
	*/

		Clinic_type.forge({			
			type: 	req.body.type
								
		}).save().then(function(model){			
			messages.push("Clinic type '<strong>" + req.body.type + "</strong>' has been added, successfully.")
			res.status(201).send({
				error:false,
				message: messages,
				data: model
			});
		}).catch(function(err) {
			messages.push("There was an error adding this clinic type.");
			messages.push(err.message);			
			res.status(400).send({
				error: true,
				message: messages,
				details: {"error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
				data: null
			});
		});
})

apiRouter.route('/clinic_types/:id')

.get(function(req,res){    //GET single record info	
	var Clinic_type = require('../models/clinic_type.js');
	Clinic_type.forge({id: req.params.id}).fetch().then(function(model){
		//This checks for an entry with the requested parameter in the table and throws an error if it is not found
		if(model != null){
			res.status(200).send({
				error:false,
				message: null,
				data: model
			});
		}else{
			res.status(404).send({
				error:true,
				message: " '" + req.params.id + "' could not be found.",
				data: null
			});
		}
	}).catch(function(err) {
		res.status(400).send({
			error: true,
			title: "Bad request",
			details: {"error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
			data: null
		});
	});
})
.put(function(req,res){    //Update single record
	updateClinicType(req,res);
})
.patch(function(req,res){  //Update single record
	updateClinicType(req,res);
})
.delete(function(req,res){ //Delete single record
	var Clinic_type = require('../models/clinic_type.js');
	var messages = [];
	Clinic_type.forge({id: req.params.id}).save({archived: 1}, {patch: true}).then(function(model){ //sets inactive to true instead of destroying record
		messages.push("Clinic type removed.")
		res.status(200).send({
			error: false,
			message: messages,
			data: null
		});
	}).catch(function(err){
		messages.push("There was an error removing this clinic type.");
		messages.push(err.message);			
		res.status(400).send({
			error: true,
			message: messages,
			details: {"error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
			data: null
		});
	});
})
return apiRouter;   
};

//=====================================================================================
//   PUT & PATCH FUNCTIONS
//=====================================================================================
//   PUT & PATCH functions in this API are identical. Their functions are declared here
//   for all routes
//=====================================================================================
var updateUser = function(req, res, bodyParser) {
	
	var User = require('../models/user.js');
	var crypto = require('crypto');
	var Config = require('../config/config.js');

	var hash = crypto
		.createHash("md5")
		.update(req.body.password)
		.digest('hex');
	/*
	=============Test variables ===================
	Use these to test the POST route. These will ultimately be collected from user input
	Past the following example into Postman in BODY as raw JSON(application/json)

		{
			"first": "Bob",
			"last": "Sacramento",
			"email": "bob@sacramento.ca",
			"admin": 1
		}
	=============================================
	*/

	User.forge({id: req.params.id}).save({
		password: 	req.body.password,
		first: 		req.body.first,
		last: 		req.body.last,
		email: 		req.body.email,
		admin:		req.body.admin

	}, {patch: true}).then(function(model) {
		res.status(200).send({
			error: false,
			message: "User " + req.params.id + " has been updated.",
			data: null
		});
	}).catch(function(err){
		res.status(400).send({
			error: true,
			title: "Bad request",
			details: {"error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
			data: null
		});
	});
}
var updateContact = function(req, res) {
	var Contact = require('../models/contact.js');
	/*
	=============Test variables ===================
	Use these to test the PUT/PATCH routes. These will ultimately be collected from user input
	Past the following example into Postman in BODY as raw JSON(application/json)
		{
			"first"     : "Jenny",
			"last"      : "Ovadair",
			"email"     : "toronto@pete.ca",
			"phone1"    : "403-867-5309",
			"phone2"    : "1800-551-8900",
			"prefix"    : "Dr.",
			"job_title" : "IT Director"
		}
	=============================================
	*/

	Contact.forge({id: req.params.id}).save({
		prefix: 	req.body.prefix,
		first: 		req.body.first,
		last: 		req.body.last,
		email: 		req.body.email,
		phone1: 	req.body.phone1,
		phone2: 	req.body.phone2,
		job_title: 	req.body.job_title

	}, {patch: true}).then(function(model) {
		var messages = [];
		messages.push("Contact updated successfully");
		res.status(200).send({
			error: false,
			message: messages,
			data: null
		});
	}).catch(function(err){
		messages.push("There was an error updating this contact");
		messages.push(err.message);
		res.status(400).send({
			error: true,
			message: messages,
			details: {"error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
			data: null
		});
	});
};

var updateClinic = function(req, res) {
	var Clinic = require('../models/clinic.js');
	/*
	=============Test variables ===================
	Use these to test the PUT/PATCH routes. These will ultimately be collected from user input
	Past the following example into Postman in BODY as raw JSON(application/json)
		{
			"name": "Super Fancy Clinic",
			"clinic_code" : "SFCC",
			"accounting_number"    : "1234",
			"conversion_date"    : "2015-01-12",
			"pms": "Cornerstone"
			"type"    : "1",
			"regional_director"    : "1",
			"medical_director"    : "2",
			"clinic_manager"    : "3",
			"email1"     : "guy@place.com",
			"email2"    : "lady@thing.com",
			"phone1"    : "403-867-5309",
			"phone2"    : "1800-551-8900",
			"address"  : "123 Easy St SW",
			"city"      : "Calgary",
			"province"  : "Alberta",
			"country"   : "Canada",
			"postal"    : "T2R1H9",
		}
	=============================================
	*/

	Clinic.forge({id: req.params.id}).save({
		name: 				req.body.name,
		clinic_code: 		req.body.clinic_code,
		accounting_number: 	req.body.accounting_number,
		conversion_date: 	req.body.conversion_date,
		pms: 				req.body.pms,
		type: 				req.body.type,
		regional_director: 	req.body.regional_director,
		clinic_manager: 	req.body.clinic_manager,
		medical_director: 	req.body.medical_director,
		phone1: 			req.body.phone1,
		phone2: 			req.body.phone2,
		email1: 			req.body.email1,
		email2: 			req.body.email2,
		address: 			req.body.address,
		city: 				req.body.city,
		province: 			req.body.province,
		country: 			req.body.country,
		postal: 			req.body.postal

	}, {patch: true}).then(function(model) {
		var messages = [];
		messages.push("Clinic updated successfully");
		res.status(200).send({
				error: false,
				message: messages,
				data: null
		});
	}).catch(function(err){
		messages.push("There was an error updating this clinic");
		messages.push(err.message);
			res.status(400).send({
				error: true,
				messge: messages,
				details: {"error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
				data: null
		});
	});
};
var updateClinicType = function(req, res) {
	var ClinicType = require('../models/clinic_type.js');
	/*
	=============Test variables ===================
	Use these to test the PUT/PATCH routes. These will ultimately be collected from user input
	Past the following example into Postman in BODY as raw JSON(application/json)
		{
	
			"type"    : "1"
		
		}
	=============================================
	*/
	var messages = [];
	console.log(req.body.type)
	ClinicType.forge({id: req.params.id}).save({
		type: 	req.body.type

	}, {patch: true}).then(function(model) {
		messages.push("Clinic type has been updated to '<strong>" + model.attributes.type + "</strong>'")
		res.status(200).send({
				error: false,
				message: messages,
				data: model
		});
	}).catch(function(err){
		messages.push("There was an error updating this clinic type");
		messages.push(err.message);
		res.status(400).send({
			error: true,
			message: messages,
			details: {"error_code" : err.code, "error_number" :err.errno, "error_message": err.message},
			data: null
		});
	});
};