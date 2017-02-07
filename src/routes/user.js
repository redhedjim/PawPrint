import express from 'express';
import commonValidations from '../shared/validations/signup';
// import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';
import Config from '../../config';
import User from '../models/user';

let crypto = require('crypto');	

//Encrypt user password function
let encrypt = (password) =>{
	var cipher = crypto.createCipher(Config.algorithm, password);
	var crypted = cipher.update(password, 'utf8', 'hex');
	cipher += cipher.final('hex');
	return crypted;
};

let router = express.Router();

function validateInput(data, otherValidations) {
  let { errors } = otherValidations(data);

  return User.query({
    where: { email: data.email },
    orWhere: { username: data.username }
  }).fetch().then(user => {
    if (user) {
      if (user.get('username') === data.username) {
        errors.username = 'There is user with such username';
      }
      if (user.get('email') === data.email) {
        errors.email = 'There is user with such email';
      }
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  });

}

router.get('/:id', (req, res) => {
  User.query({
    select: [ 'username', 'email' ],
    where: { email: req.params.id },
    orWhere: { username: req.params.id }
  }).fetch().then(user => {
    res.json({ user });
  });
});


router.post('/', (req, res) => {
  validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
    if (isValid) {
      const { username, password, timezone, email } = req.body;
      const password_digest = encrypt(password);

      User.forge({
        username, timezone, email, password_digest
      }, { hasTimestamps: true }).save()
        .then(user => res.json({ success: true }))
        .catch(err => res.status(500).json({ error: err }));

    } else {
      res.status(400).json(errors);
    }
  });

});



export default router;