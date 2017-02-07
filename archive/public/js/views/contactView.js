window.ContactView = Backbone.View.extend({

    initialize:function (options) {
        console.log('Initializing Contact View', options);
        this.contact = options.model;
        this.render();
    },

    events: {
         "click .btn-save": "updateContact",
         "click .archive-contact": "archiveContact"
    },

    render:function () {
        $(this.el).html(this.template({contact: this.contact.toJSON()})); 
        return this;
    },

    updateContact: function(e){
        var self = this;
        e.preventDefault();
        this.contact.set({
            prefix : $('#contact-prefix').val(),
            first : $('#contact-first').val(),
            last : $('#contact-last').val(),
            job_title: $('#contact-title').val(),
            phone1 : $('#contact-phone1').val(),
            phone2 : $('#contact-phone2').val(),
            email: $("#contact-email").val()          
        });
        
        this.contact.save(null, {
            success: function(model, response){
                $('.messages').empty();
                _.each(response.message, function(message){
                    $('.messages').append('<div class="alert alert-success text-center message-center">' + message + '</div>');
                });
                $('.message-center').delay(5000).fadeOut(3000);
                self.render();
            },
            error: function(model, response){
                $('.messages').empty();
                _.each(response.message, function(message){
                    $('.messages').append('<div class="alert alert-danger text-center message-center">' + message + '</div>');
                })
                $('.message-center').delay(5000).fadeOut(3000);
            }    
        });    

        return false;
        
    },
    archiveContact: function(e){
        e.preventDefault();
        var r = confirm("Are you sure you want to archive this contact?");
        if(r === true){
            this.contact.destroy().then(function(response){
                if(response.error){
                    $('.messages').empty();
                    _.each(response.message, function(message){
                        $('.messages').append('<div class="alert alert-danger text-center message-center">' + message + '</div>');
                    });
                    $('.message-center').fadeOut(5000)
                }else{
                    location = "#contacts" //Route the user to the list of records
                    $('.messages').empty();
                    _.each(response.message, function(message){
                        $('.messages').append('<div class="alert alert-success text-center message-center">' + message + '</div>');
                    });
                    $('.message-center').fadeOut(5000)
                }                
            })
        }  
    }
});