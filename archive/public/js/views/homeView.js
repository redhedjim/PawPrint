window.HomeView = Backbone.View.extend({

    initialize:function () {
        console.log('Initializing Home View');
       
    },

    events:{
    },

    render:function () {
        console.log('Rendering Home View');
        $(this.el).html(this.template());
        return this;
    }
    

});