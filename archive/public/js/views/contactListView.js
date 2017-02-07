window.ContactListView = Backbone.View.extend({

    initialize:function (options, contact) {
        console.log('Initializing contact List View');
        this.contacts = options.collection.data;
        //If contact view passes contact info along it will be assigned here
        if(contact){ 
          this.contacts.contact = contact;
        }else{
          this.contacts.contact = null;
        }
        this.render();
    },

     events: {
         "click .btn-save": "createContact"
    },

    render:function () {
        $(this.el).html(this.template({contacts: this.contacts, contact: this.contacts.contact})); 
        return this;
    },

    createContact: function(e) {
      e.preventDefault();
      
      this.contact = new Contact();
      var form = $(this.el).find('.form-contact');
      $(form).data('formValidation').validate(); //validates form
      if ($(form).data('formValidation').isValid()) //if form is valid, execute the createModel function
      {
        this.contact.set({
            prefix : form.find('#contact-prefix').val(),
            first : form.find('#contact-first').val(),
            last : form.find('#contact-last').val(),
            job_title: form.find('#contact-title').val(),
            phone1 : form.find('#contact-phone1').val(),
            phone2 : form.find('#contact-phone2').val(),
            email: form.find("#contact-email").val()           
        });
        
        this.contact.save().then(function(response){
            if(!response.error){
                var contactID = response.data.id;
                location = "#contacts/" + contactID; //Route the user to the newly created record
                $('.modal-backdrop').remove();       // Remove lingering Bootstrap modal 
                $('body').removeClass('modal-open'); //Removes a prop that keeps the y-scroll from returning after modal close

                //Display success/error messages
                $('.messages').empty();
                console.log(response.message)
                _.each(response.message, function(message){
                    $('.messages').append('<div class="alert alert-success text-center message-center">' + message + '</div>');
                });
                $('.message-center').fadeOut(5000)
            }else{
                //Will make this error message better soon  
                alert('There was an error creating this contact. Please check the input and try again.')
            }    
        });    

        $(this.el).find('.alert-success').removeClass('hidden');   
        return false;
      };
    },

    paginate: function(){
        var self = this;
        //Begin pagination controls  
        
        //set hrefs of pageinator controls
        var previousURL = "#contacts?page="+Number(self.currentPage-1);
        var nextURL = "#contacts?page="+Number(self.currentPage+1);
        var lastURL = "#contacts?page="+Number(self.pagesTotal);
        var baseURL = "#contacts?page=";
        
        //set hrefs of pageinator controls
        $('#first-page a').attr('href', "#contacts?page=1");
        $('#previous-page a').attr('href', previousURL);
        $('#next-page a').attr('href', nextURL);
        $('#last-page a').attr('href', lastURL);  

        //If there are less than 9 paginated pages 
        if(self.pagesTotal <= 8){
            $('.page-link').each(function(i) { 
                if(i+1 <= self.pagesTotal){
                    $('a', this).html(i+1);
                    $('a', this).attr('href', baseURL+(i+1))
                    $('.page-link a:contains('+self.currentPage+')').parent('li').addClass('active'); 
                    //If on last page 
                    if(self.currentPage === self.pagesTotal){
                        $('#next-page').addClass('disabled'); //disable next button
                        $('#next-page a').removeAttr('href');
                    };
                    //On first page
                    if(self.currentPage == 1){
                        $('#previous-page').addClass('disabled'); //disable back button
                        $('#previous-page a').removeAttr('href'); 
                    };                                
                }else{
                    this.remove();   
                }
            });
        }else{
        //If there are 9 pages or more
        
            //If on page 1-4
            if(self.currentPage < 5){
                $('.page-link').each(function(i) {
                    $('a', this).html(i+1);
                    $('a', this).attr('href', baseURL+(i+1))
                    $('.page-link a:contains('+self.currentPage+')').parent('li').addClass('active');                   
                }); 
                //On first page
                if(self.currentPage == 1){
                    $('#previous-page').addClass('disabled'); //disable back button
                    $('#previous-page a').removeAttr('href'); 
                }; 
                
            //If between page 5 and before last 5 pages             
            }else if(self.currentPage >= 5 && self.currentPage <= self.pagesTotal-4){ 
                $('.page-link').each(function(i) {
                    $('a', this).html((self.currentPage-4)+i);
                    $('a', this).attr('href', baseURL+(self.currentPage-4+i));
                    $('.page-link a:contains('+self.currentPage+')').parent('li').addClass('active');
                }); 
                
            //If on last 5 pages
            }else if(self.currentPage > self.pagesTotal-4){
                $('.page-link').each(function(i) {
                    $('a', this).html((self.pagesTotal-8)+(i));
                    console.log("pages total: ", (self.currentPage-8)+(i));
                    $('a', this).attr('href', baseURL+(self.pagesTotal-8+i));
                    $('.page-link a:contains('+self.currentPage+')').parent('li').addClass('active');                      
                }); 
                //If on last page
                if(self.currentPage === self.pagesTotal){
                    $('#next-page').addClass('disabled'); //disable next button
                    $('#next-page a').removeAttr('href');
                };          
            };
        //End pagination controls 
        };
    }    
});