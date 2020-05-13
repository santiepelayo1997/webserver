const express = require('express');
const db = require('../db');
const router = express.Router();
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: '',
    user: 'root',
    database: 'primewaterdb',
    host: 'localhost',
    port: '3306',
    multipleStatements: true
});

router.get('/customers/', async (req,res,next) => {
        try{
            let results = await db.all();
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
        let results = await db.insert([body.customerId,body.image,body.meterNo,body.startMeter, body.startDate, body.firstName, 
                       body.middleName,body.lastName,body.gender,body.birthDate,body.address,body.locationCode,body.contactNo,
                  body.email,body.password,body.status]);
        //    res.json(results);   
        res.send('Inserted Successfully!');
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


module.exports = router;