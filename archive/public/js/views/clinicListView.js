window.ClinicListView = Backbone.View.extend({

    initialize:function (options) {
        console.log('Initializing Clinic List View');
        this.clinics = options.collection.data;
        this.render();
    },

     events: {
        "click .btn-save": "createClinic"
    },

    render:function () {
        $(this.el).html(this.template({clinics: this.clinics})); 
        return this;
    },

    createClinic: function(e) {
      e.preventDefault();
      
      this.clinic = new Clinic();
      //Validate form
      var form = $('.form-clinic')
      $(form).data('formValidation').validate(); 
      //If form is valid, execute the createModel function. If !== valid then form alerts user
      if ($(form).data('formValidation').isValid()){ 
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
        
        this.clinic.save().then(function(response){
            this.response = response;
            if(!response.error){
                var clinicID = response.data.id;
                //Route the user to the newly created record
                location = "#hospitals/" + clinicID;
                // Remove lingering Bootstrap modal removes a prop that keeps the y-scroll from returning after modal close
                $('.modal-backdrop').remove(); 
                $('body').removeClass('modal-open'); 
                //Display success/error messages
                $('.messages').empty();
                _.each(response.message, function(message){
                    $('.messages').append('<div class="alert alert-success text-center message-center">' + message + '</div>');
                });
                $('.message-center').fadeOut(5000)
            }else{
                $('.messages').empty();
                _.each(response.message, function(message){
                    $('.messages').append('<div class="alert alert-danger text-center message-center">' + message + '</div>');
                });
                $('.message-center').fadeOut(5000);
            }    
        });    
      };
    },
  
    paginate: function(){
        var self = this;
        //Begin pagination controls  
        
        //set hrefs of pageinator controls
        var previousURL = "#organizations?page="+Number(self.currentPage-1);
        var nextURL = "#organizations?page="+Number(self.currentPage+1);
        var lastURL = "#organizations?page="+Number(self.pagesTotal);
        var baseURL = "#organizations?page=";
        
        //set hrefs of pageinator controls
        $('#first-page a').attr('href', "#organizations?page=1");
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
    },
    search: function() {
      var q = $("#search").val();
      
      var array = q.split(" ");

      search_results = this.organizations.filter(function(model) {
        //here is where we need to put both search terms
        return _.every(array, function(searchTerm) {
          return _.any(model.attributes, function(val, attr) {
            // do your comparison of the value here, whatever you need
            
            if( ~attr.indexOf("project_id") || 
                ~attr.indexOf("id") ||
                ~attr.indexOf("URI") )
            {
              return false; 
            }
            
            if(val !== null && val !==  undefined)
            {
              if(!_.isString(val)) // Turns all found data into a string if it isn't already a string
              {
                val = val.toString();
              }
              //convert both options to uppercase just in case
              val = val.toUpperCase();
              searchTerm = searchTerm.toUpperCase();
              
              return ~val.indexOf(searchTerm);
            }
            else
            {
              return false;
            }
            
          });
        });
      });
     
     
      this.render(new OrganizationCollection(search_results));
      
    }
    

});