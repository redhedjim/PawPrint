'use strict';
window.LoginView = Backbone.View.extend({

    initialize:function () {
        $('#navigation').html('');
    },

    events:{
        "click .btn-login": "login"
    },

    render:function () {
        $(this.el).html(this.template());
    },
    login: function(e) {
        e.preventDefault();
        var self = this;
        //do manual call to get an authToken and save in local storage
        $.ajax({
            type: "POST",
            url: "/login",
            dataType: 'json',
            data: {
                email:    $('#email').val(),
                password: $('#password').val()
            },
            success: function(response) {
                if(response.authToken){
                    //Set authoken to the localStorage
                    Lockr.set('authToken', response.authToken); 

                    //Navigate to app                  
                    location = '/#hospitals';

                    //Manually call the navigation bar to the DOM
                    var navigationView = new NavigationView();
                    navigationView.render();
                    $('#navigation').html(navigationView.el);

                    //Display success/error messages
                    $('.messages').empty();
                    _.each(response.message, function(message){
                        $('.messages').append('<div class="alert alert-success text-center message-center">' + message + '</div>');
                    });
                    $('.message-center').fadeOut(5000)
                    
                }else{
                    $('.login-messages').empty();
                    _.each(response.message, function(message){
                        $('.login-messages').append('<div class="alert alert-danger text-center message-center">' + message + '</div>');
                    });
                    $('.message-center').fadeOut(5000);
                }               
            },
            error: function(err){
                $('.login-messages').empty();
                _.each(err.responseJSON.message, function(message){
                    $('.login-messages').append('<div class="alert alert-danger text-center message-center">' + message + '</div>');
                });
                $('.message-center').fadeOut(5000);
            },
            
        });
        
    }
    

});