'use strict'

window.Clinic = Backbone.Model.extend({

    urlRoot:"/clinics",

    initialize:function () {
      console.log("Clinic model initialized");
    },
    
    parse: function(response) {
      if(response.data)      {
        return response.data;
      }else{
        return response;
      }
    }
});

window.ClinicCollection = Backbone.Collection.extend({

    model: Clinic,

    url:"/clinics",
    
    initialize: function(response) {

    }
});