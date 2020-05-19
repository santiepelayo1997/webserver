const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 10,
    password: '',
    user: 'root',
    database: 'primewaterdb',
    host: 'localhost',
    port: '3306'
});



let primewaterdb = {};

primewaterdb.all = () => {

     return new Promise((resolve, reject) =>{
        pool.query('SELECT * FROM tbl_customers', (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
     });

};

primewaterdb.tblPayments = () => {

    return new Promise((resolve, reject) =>{
       pool.query('SELECT * FROM tbl_payments', (err, results)=>{
           if(err){
               return reject(err);
           }
           return resolve(results);
       });
    });

};



primewaterdb.one = (customerId)=>{

    return new Promise((resolve, reject) =>{
        pool.query('SELECT * FROM tbl_customers WHERE customerId = ?',[customerId], (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
     });

};

primewaterdb.delete = (customerId)=>{

    return new Promise((resolve, reject) =>{
        pool.query('DELETE FROM tbl_customers WHERE customerId = ?',[customerId], (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
     });

};


primewaterdb.registerCustomer = (customers)=>{

    return new Promise((resolve, reject) =>{
        pool.query("INSERT INTO tbl_customers (customerId,image,meterNo,startMeter,startDate,firstName,middleName,lastName,gender,birthDate,address,locationCode,contactNo,email,password,status) VALUES (?)",[customers], (err, results)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(results);
        });
     });

};



primewaterdb.update = (test, customerId)=>{

    console.log(test)

    return new Promise((resolve, reject) =>{
    
            pool.query("UPDATE tbl_customers SET ? WHERE customerId = ? ",[test, customerId], (err, results)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            console.log(results);  
            return resolve(results);
        });
     });

};

primewaterdb.loginCustomer = (email, password)=>{

    return new Promise((resolve, reject) =>{
    
            pool.query("SELECT * FROM tbl_customers WHERE email = ? AND password = ?  ",[email, password ], (err, results)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(results);
        });
     });

};

primewaterdb.checkCustomerIfAlreadyExist = (email)=>{

    return new Promise((resolve, reject) =>{
    
            pool.query("SELECT * FROM tbl_customers WHERE email = ? ",[email], (err, rows)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(rows);
        });
     });

};


primewaterdb.getLastRowCustomer = ()=>{

    return new Promise((resolve, reject) =>{
    
            pool.query("SELECT * FROM tbl_customers ORDER BY customerId DESC LIMIT 1", (err, rows)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(rows);
        });
     });

};


primewaterdb.getPaymentsCustomer = (customerId)=>{

    return new Promise((resolve, reject) =>{
    
            pool.query('SELECT * FROM tbl_payments WHERE customerId = ?',[customerId], (err, rows)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(rows);
        });
     });

};


primewaterdb.getInvoicesCustomer = (customerId)=>{

    return new Promise((resolve, reject) =>{
    
            pool.query('SELECT * FROM tbl_invoices LEFT JOIN tbl_customers ON tbl_invoices.customerId = tbl_customers.customerId WHERE tbl_customers.customerId = ?',[customerId], (err, rows)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(rows);
        });
     });

};


primewaterdb.getDetailsOfPayment = (invoiceId)=>{

    return new Promise((resolve, reject) =>{
    
            pool.query('SELECT * FROM tbl_payments LEFT JOIN tbl_invoices ON tbl_invoices.invoiceId = tbl_payments.invoiceId LEFT JOIN tbl_customers ON tbl_customers.customerId = tbl_payments.customerId WHERE tbl_invoices.invoiceId = ?',[invoiceId], (err, rows)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(rows);
        });
     });

};





















module.exports = primewaterdb;