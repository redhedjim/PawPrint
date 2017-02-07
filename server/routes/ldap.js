import express from 'express';
import authenticate from '../middlewares/authenticate';
import LDAP from 'ldapjs';

let router = express.Router();

router.post('/', authenticate, (req, response) => {
    console.log('Route hit');
    
    /*Test route for LDAP*/
    var client = LDAP.createClient({
        url: 'ldaps://ldap01.vcaantech.com',
        timeout: 300,
        connectTimeout: 1000
    });

    client.bind('cn=Leo Tucker,ou=Contractor Accounts,ou=AVC,DC=vcaantech,DC=com', '!QAZ2wsx', function(err, res) {

    });

    var opts = {
        scope: 'sub',
        attributes: ['givenName', 'sn']
    }

    let results;

    let search = new Promise((resolve, reject) => {
        client.search('ou=Corp Users,ou=AVC,DC=vcaantech,DC=com', opts, function(err, res){        
            res.on('searchEntry', function(entry) {
                console.log('entry: ' + JSON.stringify(entry.object));                     
                results = JSON.stringify(entry.object);
            });
            res.on('searchReference', function(referral) {
                console.log('referral: ' + referral.uris.join());
            });
            res.on('error', function(err) {
                console.log('searchFailed') ;
                console.error('error: ' + err.message);
            });
            res.on('end', function(result) {
                console.log('4') ;
                console.log('status: ' + result.status);
            });
        });
    }).then(() => { response.send(results); });
        
    


    // res.status(201).json({ 
    //     success: true, 
    //     message: "Event created successfully" 
    // });
});

export default router;