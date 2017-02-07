'use strict'

window.Contact = Backbone.Model.extend({

    urlRoot:"/contacts",

    initialize:function () {
      console.log("Contact model initialized");
    },
    
    parse: function(response) {
      if(response.data)      {
        return response.data;
      }else{
        return response;
      }
    }
});

window.ContactCollection = Backbone.Collection.extend({

    model: Contact,

    url:"/contacts",
    
    initialize: function(response) {
    }
});