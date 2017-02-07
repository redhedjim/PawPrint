import express from 'express';
import User from '../models/user';
import Config from '../../config';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

let router = express.Router();
//Encrypt user password function
let encrypt = (password) =>{
	var cipher = crypto.createCipher(Config.algorithm, password);
	var crypted = cipher.update(password, 'utf8', 'hex');
	cipher += cipher.final('hex');
	return crypted;
};

router.post('/', (req, res) => {
    const { identifier, password } = req.body;

    User.query({
        where: { username: identifier },
        orWhere: { email: identifier}
    }).fetch().then(user => {        
        if (user){
            if (encrypt(password) === user.get('password_digest')){
                const token = jwt.sign({
                    id: user.get('id'),
                    username: user.get('username')
                }, Config.jwtSecret);
                res.json({ token });
            } else {
                res.status(401).json({ errors: { form: 'Invalid credentials'} });
            }
        } else {
            res.status(401).json({ errors: { form: 'Invalid credentials'} });
        }
    });

});

export default router;

