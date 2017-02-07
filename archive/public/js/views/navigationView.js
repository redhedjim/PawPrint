window.NavigationView = Backbone.View.extend({
   
    initialize:function() {
     console.log("Nav view iitialized")
    },
    events:{  
        "click .dismiss-alert" : "removeAlert",
        "click .logout": "logout"
    },
    
    render:function() {
        $(this.el).html(this.template());      
        return this;
    },
    parse : function(response, options) {
        return response.data;
    },
     removeAlert: function(n){
        //Remove alerts dismissed by user
        var message = $(n.currentTarget).parent();
        $(message).remove();
    },
    logout: function(){
        Lockr.rm('authToken'); //remove authToken
        app.login({loggedOut: false})
        location = '/#login';
    }
    
   
   
});
