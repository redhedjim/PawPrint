'use strict'

window.ClinicType = Backbone.Model.extend({

    urlRoot:"/clinic_types",

    initialize:function () {
    }
    
    // parse: function(response) {
    //   if(response.data)      {
    //     return response.data;
    //   }else{
    //     return response;
    //   }
    // }
});

window.ClinicTypeCollection = Backbone.Collection.extend({

    model: ClinicType,

    url:"/clinic_types",
    
    initialize: function(response) {
    }
});