//event management
Backbone.pubSub = _.extend({}, Backbone.Events);

//Recurrsive function on .toJSON()
Backbone.Model.prototype.toJSON = function() {
    return JSON.parse(JSON.stringify(this.attributes));
}

//Overwrite Backbone.sync() to force token to be passed in each request
var _sync = Backbone.sync;
Backbone.sync = function(method, model, options) {

    if( model && (method === 'create' || method === 'update' || method === 'patch') ) {
        options.contentType = 'application/json';
        options.data = JSON.stringify(options.attrs || model.toJSON());
    }

    var authToken = Lockr.get('authToken');
    
    if(authToken !== undefined && authToken !== null){
        options.headers = {
            "x-auth-token" : authToken
        };
    }
    
    return _sync.call( this, method, model, options );
}


$(function(){  
    $(document).ajaxComplete(function(response, err) { 
        if(err && err.status == 401){
            location = '/#login';
            $('.messages').empty();
            _.each(err.responseJSON.message, function(message){
                $('.messages').append('<div class="alert alert-danger text-center message-center">' + message + ' <span class="pull-right glyphicon glyphicon-remove dismiss-alert"></span></div>');
            });
            $('.message-center').fadeOut(5000);
        }
    })
})

window.Router = Backbone.Router.extend({
	routes: {
		"": "login",   
        "login": "login",
        "hospitals": "hospitals",
        "hospitals/:id": "hospitalDetails",
        "contacts": "contacts",
        "contacts/:id": "contactDetails",
        "hospital_types": "hospitalTypes",
        "hospital_types/:id": "hospitalTypeDetails"
	},

    initialize: function() {
        this.navigationView = new NavigationView();
        this.navigationView.render();
        $('#navigation').html(this.navigationView.el);      
	},

    login: function(){
        // console.log(options)
        this.loginView = new LoginView();
        this.loginView.render({loggedOut: true});
        $('#content').html(this.loginView.el);
    },

    home: function(){
        console.log('home')
    },
    
    hospitals: function(p){
        var self = this;

        //Instantiate/fetch collection
        this.clinicCollection = new ClinicCollection();
        this.clinicCollection.fetch({data: $.param({extend: true})}).done(function(response){
            //Instantiate view
            clinicListView = new ClinicListView({collection: response});
            $("#content").html(clinicListView.el);  
        // }).then(function(){
        //     timeListView.paginate(selectedUser);  //Paginate view with selected user, if present 
        }).fail(function(err){
            console.log("There was an issue loading data from the server. Please contact IT.");
        });
    },
    
    hospitalDetails: function(id){
        var self = this;
        //Instantiate/fetch model
        this.clinic = new Clinic({id: id});        
        this.clinic.fetch({data: $.param({extend: true})}).done(function(response){
            //Instantiate view
            var clinicView = new ClinicView({model: self.clinic});
            $("#content").html(clinicView.el);
        });    
    },

    contacts: function(p){
        var self = this;

        //Instantiate/fetch collection
        this.contactCollection = new ContactCollection();
        this.contactCollection.fetch({data: $.param({extend: true})}).done(function(response){
            //Instantiate view
            contactListView = new ContactListView({collection: response});
            $("#content").html(contactListView.el);  
        }).fail(function(err){
            if(err.status == 401){
                
            }
        });
    },
    contactDetails: function(id){
        var self = this;
        //Instantiate/fetch model
        this.contact = new Contact({id: id});        
        this.contact.fetch({data: $.param({extend: true})}).done(function(response){
            //Instantiate view
            var contactView = new ContactView({model: self.contact});
            $("#content").html(contactView.el);
        });    
    },
    hospitalTypes: function(p){
        var self = this;

        //Instantiate/fetch collection
        var clinicTypeCollection = new ClinicTypeCollection();
       
        clinicTypeCollection.fetch().done(function(response){
            //Instantiate view
            clinicTypeListView = new ClinicTypeListView({collection: response});
            $("#content").html(clinicTypeListView.el); 

        }).fail(function(err){
            console.log("There was an issue loading data from the server. Please contact IT.");
        });
    },
    
    hospitalTypeDetails: function(id){
        var self = this;
        //Instantiate/fetch model
        this.clinicType = new ClinicType({id: id});        
        this.clinicType.fetch({data: $.param({extend: true})}).done(function(response){
            //Instantiate view
            var clinicTypeView = new ClinicTypeView({model: self.clinicType});
            $("#content").html(clinicTypeView.el);
        });    
    },

});

templateLoader.load([
    "HomeView" ,
    "LoginView",
    "NavigationView",
    "ClinicListView",
    "ClinicView",
    "ContactView",
    "ContactListView",
    "ClinicTypeListView"
    ],
	function () {
		app = new Router();
		Backbone.history.start();

	});