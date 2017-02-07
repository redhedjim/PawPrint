window.ClinicView = Backbone.View.extend({

    initialize:function (options) {
        console.log('Initializing Clinic View');
        this.clinic = options.model;
        this.render();
    },

     events: {
         "click .btn-save": "updateClinic",
         "click .archive-clinic": "archiveClinic"
    },

    render:function () {
        console.log('Rendering View');
        $(this.el).html(this.template({clinic: this.clinic.toJSON()})); 
        // this.renderStaff();
        return this;
    },
     updateClinic: function(e) {   
        e.preventDefault();
        this.clinic.set({
            name : $('#clinic-name').val(),
            type : $('#clinic-type').val(),
            clinic_code : $('#clinic-code').val(),
            pms : $('#clinic-pms').val(),
            accounting_number : $('#clinic-accounting-number').val(),
            conversion_date : moment($('#clinic-conversion').val()).format('YYYY-MM-DD'),
            regional_director : $('#clinic-regional-director').val(),
            medical_director : $('#clinic-medical-director').val(),
            clinic_manager : $('#clinic-manager').val(),
            phone1 : $('#clinic-phone1').val(),
            phone2 : $('#clinic-phone2').val(),
            address : $('#clinic-address').val(),
            city: $('#clinic-city').val(),
            province: $('#clinic-province').val(),
            country: $('#clinic-country').val(),       
            postal: $("#clinic-postal").val(),
            email1: $("#clinic-email1").val(),
            email2: $("#clinic-email2").val()              
        });

        this.clinic.save(null, {
            success: function(model, response){
                $('.messages').empty();
                _.each(response.message, function(message){
                    $('.messages').append('<div class="alert alert-success text-center message-center">' + message + '</div>');
                });
                $('.message-center').delay(5000).fadeOut(3000);
                return false;  
            },
            error: function(model, response){
                $('.messages').empty();
                _.each(response.message, function(message){
                    $('.messages').append('<div class="alert alert-danger text-center message-center">' + message + '</div>');
                });
                $('.message-center').delay(5000).fadeOut(3000);            
            }
        });    
    },
    archiveClinic: function(e){
        e.preventDefault();
        var r = confirm("Are you sure you want to archive this hospital?");
        if(r === true){
            this.clinic.destroy().then(function(response){
                if(response.error){
                    $('.messages').empty();
                    _.each(response.message, function(message){
                        $('.messages').append('<div class="alert alert-danger text-center">' + message + '</div>');
                    });
                    $('.messages').fadeOut(5000)
                }else{
                    location = "#clinics" //Route the user to the list of records
                    $('.messages').empty();
                    _.each(response.message, function(message){
                        $('.messages').append('<div class="alert alert-success text-center">' + message + '</div>');
                    });
                    $('.messages').fadeOut(5000)
                }                
            })
        }  
    }
});