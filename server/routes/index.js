const express = require('express');
const db = require('../db');
const router = express.Router();
var cors = require('cors')


router.get('/api/customers/',  cors(), async (req,res,next) => {
        try{
            let results = await db.all();
            res.json(results);
        }catch(e){
            console.log(e);
            res.sendStatus(500)
        }
});

router.get('/api/payments/',  cors(), async (req,res,next) => {
    try{
        let results = await db.tblPayments();
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});

router.get('/api/customers/:customerId',  cors(), async (req,res,next) => {
    try{
        let results = await db.one(req.params.customerId);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});

router.delete('/api/customers/:customerId',  cors(), async (req,res,next) => {
    try{
        let results = await db.delete(req.params.customerId);
        //res.json(results);
        res.send('Delete Successfully!');
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});

router.post('/api/customers', cors(), async (req,res,next) => {
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


router.put('/api/customers/:customerId',  cors(),async (req,res,next) => {
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

router.post('/api/login/staff',  cors(), async (req,res,next) => {

    try{
        let body = req.body
        let results = await db.loginStaff(body.username,body.password);
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(400).json({
                message: 'Incorrect Password/Username!'
            });
        }		
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});

router.post('/api/login',   cors(),async (req,res,next) => {

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

router.get('/api/generateCustomerId',  cors(),async (req,res,next) => {
    try{
        let results = await db.getLastRowCustomer();
        res.json(results[0]);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});

router.get('/api/payments/:customerId',  cors(),async (req,res,next) => {
    try{
        let results = await db.getPaymentsCustomer([req.params.customerId]);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.get('/api/invoices/:customerId',  cors(),async (req,res,next) => {
    try{
        let results = await db.getInvoicesCustomer([req.params.customerId]);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.get('/api/invoices/payments/:invoiceId',  cors(),async (req,res,next) => {
    try{
        let results = await db.getDetailsOfPayment([req.params.invoiceId]);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.get('/api/invoices/count/:customerId', cors(), async (req,res,next) => {
    try{
        let results = await db.getTotalInvoices([req.params.customerId]);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});

router.get('/api/invoices/done/:customerId', cors(), async (req,res,next) => {
    try{
        let results = await db.getCountDone([req.params.customerId]);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});

router.get('/api/invoices/pending/:customerId', cors(), async (req,res,next) => {
    try{
        let results = await db.getCountPending([req.params.customerId]);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.get('/api/invoices/reading/:customerId',  cors(),async (req,res,next) => {
    try{
        let results = await db.getLatestInvoice([req.params.customerId]);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});

router.get('/api/invoices/beforeReading/:customerId',  cors(),async (req,res,next) => {
    try{
        let results = await db.getSecondInvoice([req.params.customerId]);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});



router.post('/api/invoices', cors(), async (req,res,next) => {
    try{
        let body = req.body
        let results = await db.createInvoice([body.staffId,body.customerId,body.previousMeter,body.presentMeter, body.billingStart, body.billingEnd,body.dueDate,body.totalMeter,body.perCubicPrice,body.totalAmount,body.invoiceStatus,body.dateOfReading,body.remarks]);
        res.status(200).json({
            message: 'Successfully Created',
            userDetails: results
        });
    
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});



router.put('/api/invoices/:invoiceId', cors(), async (req,res,next) => {
    try{
        let body = req.body
        let results = await db.UpdateInvoice({"staffId": body.staffId, "presentMeter": body.presentMeter, "totalMeter": body.totalMeter, "dateOfReading": body.dateOfReading, "remarks": body.remarks, "totalAmount": body.totalAmount, "endOfReading": body.endOfReading }, req.params.invoiceId);
        //    res.json(results);   
        res.send('Updated Successfully!');
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});












module.exports = router;