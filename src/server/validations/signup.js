import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export default function validateInput(data){
    let errors = {};

    if(Validator.isEmpty(data.username)) {
        errors.username = 'A username is required';
    }
    if(!Validator.isEmail(data.email)){
        errors.email = "Email is not valid";
    }
    if(!Validator.isLength(data.password, {min: 3, max: 20})) {
        errors.password = 'A password is required';
    }
    if(Validator.isEmpty(data.passwordConfirmation)) {
        errors.passwordConfirmation = 'You must confirm your password';
    }
    if(!Validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = "Passwords must match";
    }
    if(Validator.isEmpty(data.timezone)) {
        errors.timezone = 'Timezone is required';
    }
   
    return {
        errors,
        isValid: isEmpty(errors)
    }
}