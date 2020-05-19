const express = require('express');
const db = require('../db');
const router = express.Router();




router.get('/customers/', async (req,res,next) => {
        try{
            let results = await db.all();
            res.json(results);
        }catch(e){
            console.log(e);
            res.sendStatus(500)
        }
});

router.get('/payments/', async (req,res,next) => {
    try{
        let results = await db.tblPayments();
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});

router.get('/customers/:customerId', async (req,res,next) => {
    try{
        let results = await db.one(req.params.customerId);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});

router.delete('/customers/:customerId', async (req,res,next) => {
    try{
        let results = await db.delete(req.params.customerId);
        //res.json(results);
        res.send('Delete Successfully!');
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});

router.post('/customers', async (req,res,next) => {
    try{
        let body = req.body
        let ifValid = await db.checkCustomerIfAlreadyExist(req.body.email);
        if (!ifValid.length) {
            let results = await db.registerCustomer([body.customerId,body.image,body.meterNo,body.startMeter, body.startDate, body.firstName,body.middleName,body.lastName,body.gender,body.birthDate,body.address,body.locationCode,body.contactNo,body.email,body.password,body.status]);
            res.status(200).json({
                message: 'Successfully Registered',
                userDetails: results
            });
        }else{
            res.status(400).json({
                message: 'Email Already Exist!'
            });
        }
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.put('/customers/:customerId', async (req,res,next) => {
    try{
        let body = req.body
        let results = await db.update({"image": body.image, "meterNo": body.meterNo}, req.params.customerId);
        //    res.json(results);   
        res.send('Updated Successfully!');
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.post('/login',  async (req,res,next) => {

    try{
        let body = req.body
        let results = await db.loginCustomer(body.email,body.password);
        if (results.length > 0) {
            res.status(200).json({
                message: 'Successfully Login',
                userDetails: results
            });
        } else {
            res.status(400).json({
                message: 'Incorrect Password/Email!'
            });
        }		
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }

});

router.get('/generateCustomerId', async (req,res,next) => {
    try{
        let results = await db.getLastRowCustomer();
        res.json(results[0].customerId);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});

router.get('/payments/:customerId', async (req,res,next) => {
    try{
        let results = await db.getPaymentsCustomer([req.params.customerId]);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.get('/invoices/:customerId', async (req,res,next) => {
    try{
        let results = await db.getInvoicesCustomer([req.params.customerId]);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});






module.exports = router;