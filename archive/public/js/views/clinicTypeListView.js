window.ClinicTypeListView = Backbone.View.extend({

    initialize:function (options, other) {
        console.log('Initializing Clinic List View');
        this.clinicTypes = options.collection.data;
        this.render();
    },

     events: {
         "click .btn-save": "createClinicType",
         "click .btn-remove": "removeClinicType",
         "click .edit-clinic-type": "editClinicType",
         "click .cancel-input": "cancelClinicTypeEdit",
         "click .update-input": "saveClinicTypeEdit"
    },

    render:function () {
        $(this.el).html(this.template({clinicTypes: this.clinicTypes})); 
        return this;
    },

    createClinicType: function(e) {
      e.preventDefault();
      var self = this;
      this.clinicType = new ClinicType();
      var form = $(this.el).find('.form-clinic-type');
      $(form).data('formValidation').validate();    //validates form
      if ($(form).data('formValidation').isValid()) //if form is valid, execute the createModel function
      {
        this.clinicType.set({
            type : form.find('#type-type').val()          
        }).save(null, {
            success: function(model, response){
                $('.modal-backdrop').remove();       // Remove lingering Bootstrap modal   
                $('body').removeClass('modal-open'); // Removes a prop that keeps the y-scroll from returning after modal close        

                $('.messages').empty();
                _.each(response.message, function(message){
                    $('.messages').append('<div class="alert alert-success text-center message-center">' + message + '</div>');
                });
                $('.message-center').delay(5000).fadeOut(3000);
                app.clinicTypes();
            },
            error: function(model, response){
                console.log(response)
                $('.messages').empty();
                _.each(response.responseJSON.message, function(message){
                    $('.messages').append('<div class="alert alert-danger text-center message-center">' + message + ' <span class="pull-right glyphicon glyphicon-remove dismiss-alert"></span></div>');
                })
            }    
        });
      };
    },

    editClinicType: function(e){
        var currentItemText = $(e.currentTarget).parents('tr').children('.type-name'); 
        var currentItemEdit = $(e.currentTarget).parents('tr').children('.type-edit'); 
        $(currentItemEdit).removeClass('hidden');
        $(currentItemText).addClass('hidden');
    },

    cancelClinicTypeEdit: function(e){
        var currentItemText = $(e.currentTarget).parents('tr').children('.type-name'); 
        var currentItemEdit = $(e.currentTarget).parents('tr').children('.type-edit');
        $(currentItemText).removeClass('hidden');
        $(currentItemEdit).addClass('hidden');     
    },

    saveClinicTypeEdit: function(e){
        var clinicTypeID = (e.currentTarget.id).split('-')[1];
        var updatedText = $(e.currentTarget).parents('div').siblings('.edit-type-input').val();
        var clinicType = new ClinicType({id: clinicTypeID});
        clinicType.set({type: updatedText}).save(null, {
            success: function(model, response){
                $('.messages').empty();
                _.each(response.message, function(message){
                    $('.messages').append('<div class="alert alert-success text-center message-center">' + message + '</div>');
                });
                $('.message-center').delay(5000).fadeOut(3000);
                app.hospitalTypes();
            },
            error: function(model, response){
                console.log(response)
                $('.messages').empty();
                _.each(response.responseJSON.message, function(message){
                    $('.messages').append('<div class="alert alert-danger text-center message-center">' + message + ' <span class="pull-right glyphicon glyphicon-remove dismiss-alert"></span></div>');
                })
            }    

        })
    },
    removeClinicType: function(e){
        e.preventDefault();
        var r = confirm("Remove this clinic type?");
        if(r === true){
            var clinicTypeID = (e.currentTarget.id).split('-')[1]; //Gets id number of clicked item
            if(clinicTypeID != 0 && clinicTypeID !== undefined){
                this.clinicType = new ClinicType({id: clinicTypeID})
                this.clinicType.destroy().then(function(response){
                    $('.messages').empty();
                    _.each(response.message, function(message){
                        $('.messages').append('<div class="alert alert-success text-center message-center">' + message + '</div>');
                    });
                    $('.message-center').delay(5000).fadeOut(3000);
                    app.hospitalTypes();
                }).fail(function(err){
                    $('.messages').empty();
                    _.each(err.responseJSON.message, function(message){
                        $('.messages').append('<div class="alert alert-danger text-center message-center">' + message + ' <span class="pull-right glyphicon glyphicon-remove dismiss-alert"></span></div>');
                    })
                })
            }
        }
    }
});