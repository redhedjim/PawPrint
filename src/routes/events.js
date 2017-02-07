import express from 'express';
import authenticate from '../middlewares/authenticate';
import LDAP from 'ldapjs';

let router = express.Router();

router.post('/', authenticate, (req, res) => {
    /*Test route for LDAP*/
    var client = ldap.createClient({
        url: 'ldap01.vcaantech.com'
    });
    // res.status(201).json({ 
    //     success: true, 
    //     message: "Event created successfully" 
    // });
});

export default router;