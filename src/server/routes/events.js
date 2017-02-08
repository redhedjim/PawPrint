import express from 'express';
import authenticate from '../middlewares/authenticate';
import Hospital from '../models/hospital';

let router = express.Router();

router.post('/', authenticate, (req, res) => {   
    res.status(201).json({ 
        success: true, 
        message: "Event created successfully, but not really." 
    });
});

router.get('/', (req, res) => {

    Hospital.forge().fetchAll().then((results) =>{        
        res.status(201).json(results);

    })

});

export default router;