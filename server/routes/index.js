const express = require('express');
const db = require('../db');
const router = express.Router();
var cors = require('cors')


router.get('/api/customers/',  cors(), async (req,res,next) => {
        try{
            let results = await db.tblCustomers();
            res.json(results);
        }catch(e){
            console.log(e);
            res.sendStatus(500)
        }
});

// router.get('/api/payments/',  cors(), async (req,res,next) => {
//     try{
//         let results = await db.tblPayments();
//         res.json(results);
//     }catch(e){
//         console.log(e);
//         res.sendStatus(500)
//     }
// });

router.get('/api/customers/:customerId',  cors(), async (req,res,next) => {

    try{
        let results = await db.selectSpecificCustomer(req.params.customerId);
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


router.put('/api/customers/:customerId' ,async (req,res,next) => {
   
    try{
        let body = req.body
        let results = await db.updateCustomer({"firstName": body.firstName, "middleName": body.middleName , "lastName": body.lastName, "gender": body.gender, "birthDate": body.birthDate,"address": body.address,"contactNo": body.contactNo, "email": body.email,"password": body.password, "status": 1}, req.params.customerId);
        //    res.json(results);   
         res.send('Updated Successfully!');
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.post('/api/customers/deactivate/:customerId',  cors(),async (req,res,next) => {
    try{
        let body = req.body
        let results = await db.deactivateCustomer(req.params.customerId);
        //    res.json(results);   
        res.send('Customer Deactivated Successfully!');
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.post('/api/customers/activate/:customerId',  cors(),async (req,res,next) => {
    try{
        let body = req.body
        let results = await db.activateCustomer(req.params.customerId);
        //    res.json(results);   
        res.send('Customer Activated Successfully!');
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

router.post('/api/login',async (req,res,next) => {

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

router.get('/api/getPending', cors(), async (req,res,next) => {
    try{
        let results = await db.getPendingInvoices();
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

router.get('/api/invoices',  cors(),async (req,res,next) => {
    try{
        let results = await db.getAllInvoice();
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});

router.get('/api/payments',  cors(),async (req,res,next) => {
    try{
        let results = await db.getPaymentDetails();
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.get('/api/payments/getSpecific/:paymentId',  cors(),async (req,res,next) => {
    try{
        let results = await db.getSpecificPayment(req.params.paymentId);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.delete('/api/payments/:paymentId',  cors(),async (req,res,next) => {
    try{
        let results = await db.deletePayment(req.params.paymentId);
        res.send('Deleted Successfully!');
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});

router.post('/api/payments', cors(), async (req,res,next) => {
    try{
        let body = req.body
        let results = await db.insertNewPayment([body.invoiceId,body.customerId,body.staffId,body.pricePerMeter, body.cashReceived, body.totalBillingAmount,body.discount,body.penaltyFee,body.status]);
        res.status(200).json(results);
    
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});





router.get('/api/staffs',  cors(),async (req,res,next) => {
    try{
        let results = await db.getAllStaffs();
        res.status(200).json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.get('/api/staffs/:staffId',  cors(),async (req,res,next) => {
    try{
        let results = await db.getSpecificStaff(req.params.staffId);
        res.status(200).json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});





router.post('/api/invoices', cors(), async (req,res,next) => {
    try{
        let body = req.body
        let results = await db.createInvoice([body.staffId,body.customerId,body.previousMeter,body.presentMeter, body.billingStart, body.billingEnd,body.dueDate,body.totalMeter,body.perCubicPrice,body.totalAmount,body.invoiceStatus,body.dateOfReading,body.remarks, body.invoiceStatus]);
        res.status(200).json({
            message: 'Successfully Created',
            userDetails: results
        });
    
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.put('/api/invoices/updatemeter/:invoiceId',async (req,res,next) => {
    try{
        let body = req.body
        let results = await db.UpdateMeter({"presentMeter": body.presentMeter, "totalMeter": body.totalMeter, "totalAmount": body.totalAmount}, req.params.invoiceId);
        //    res.json(results);   
        res.send('Updated Successfully!');
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});

router.put('/api/invoices/updateInvoice/:invoiceId', async (req,res,next) => {
    try{
        let body = req.body
        let results = await db.UpdateInvoice({"staffId": body.staffId, "presentMeter": body.presentMeter, "totalMeter": body.totalMeter, "dateOfReading": body.dateOfReading, "remarks": body.remarks, "totalAmount": body.totalAmount, "endOfReading": body.endOfReading , "invoiceStatus": body.invoiceStatus}, req.params.invoiceId);
        //    res.json(results);   
        res.send('Updated Successfully!');
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.put('/api/staffs/:staffId', async (req,res,next) => {
    try{
        let body = req.body
        let results = await db.UpdateStaff({"image": body.image, "firstName": body.firstName, "lastName": body.lastName, "userName": body.userName, "password": body.password, "birthDate": body.birthDate, "address": body.address, "gender": body.gender, "contactNo": body.contactNo,"email": body.email, "status": 1 }, req.params.staffId);
        //    res.json(results);   
        res.send('Updated Successfully!');
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});



router.post('/api/staff/deactivate/:staffId', cors(), async (req,res,next) => {
    try{
        let body = req.body
        let results = await db.deactivateStaff(req.params.staffId);
        res.send('Deactivated Successfully!');
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.post('/api/staff/activate/:staffId', cors(), async (req,res,next) => {
    try{
        let body = req.body
        let results = await db.activateStaff(req.params.staffId);
        res.send('Activated Successfully!');
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.post('/api/staffs', async (req,res,next) => {
    try{
        let body = req.body
        let results = await db.createNewStaff([body.image,body.firstName,body.lastName,body.userName, body.password, body.birthDate,body.address,body.gender,body.contactNo,body.email,body.status]);
        res.status(200).json({
            message: 'Successfully Created',
            userDetails: results
        });
    
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.get('/api/invoices/specific/:invoiceId',  cors(),async (req,res,next) => {
    try{
        let results = await db.getSpecificInvoice(req.params.invoiceId);
        res.status(200).json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});

router.get('/api/invoices/unpaid/:customerId',  cors(),async (req,res,next) => {
    try{
        let results = await db.getUnpaidBills(req.params.customerId);
        res.status(200).json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.post('/api/checkPayment',  async (req,res,next) => {
    try{
        let ifValid = await db.checkIfPaymentIsAlreadyExist(req.body.invoiceId);
        if (!ifValid.length) {
            let body = req.body
            let results = await db.insertNewPayment([body.invoiceId,body.customerId,body.staffId,body.pricePerMeter, body.cashReceived, body.totalBillingAmount,body.discount,body.penaltyFee, body.remarks, body.status]);
            res.status(200).json(results);
        }else{
            res.status(400).json({
                message: 'Payment Already Exist!'
            });
        }
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});

router.get('/api/customerCount',  cors(),async (req,res,next) => {
    try{
        let results = await db.countCustomer();
        res.status(200).json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.get('/api/staffCount',  cors(),async (req,res,next) => {
    try{
        let results = await db.countStaff();
        res.status(200).json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.get('/api/countPendingInvoiceCustomer/:customerId', async (req,res,next) => {
    try{
        let results = await db.countPendingInvoiceCustomer(req.params.customerId);
        res.status(200).json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.get('/api/totalInvoice/:customerId', async (req,res,next) => {
    try{
        let results = await db.countTotalInvoices(req.params.customerId);
        res.status(200).json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});


router.get('/api/pendingInvoiceCount',  cors(),async (req,res,next) => {
    try{
        let results = await db.countPendingInvoice();
        res.status(200).json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});




router.get('/api/getTotalSales',  cors(),async (req,res,next) => {
    try{
        let results = await db.getTotalSales();
        res.status(200).json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});



router.get('/api/getTotalBillingCustomer/:customerId',  cors(),async (req,res,next) => {
    try{
        let results = await db.getTotalBillingCustomer(req.params.customerId);
        res.status(200).json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500)
    }
});

router.post('/api/login/admin',  async (req,res,next) => {

    try{
        let body = req.body
        let results = await db.adminLogin(body.username,body.password);
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























module.exports = router;