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

primewaterdb.tblCustomers = () => {

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



primewaterdb.selectSpecificCustomer = (customerId)=>{

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



primewaterdb.updateCustomer = (test, customerId)=>{

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


primewaterdb.deactivateCustomer = (customerId)=>{


    return new Promise((resolve, reject) =>{
    
            pool.query("UPDATE tbl_customers SET status = 0 WHERE customerId = ? ",[customerId], (err, results)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            console.log(results);  
            return resolve(results);
        });
     });

};

primewaterdb.activateCustomer = (customerId)=>{

    return new Promise((resolve, reject) =>{
    
            pool.query("UPDATE tbl_customers SET status = 1 WHERE customerId = ? ",[customerId], (err, results)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            console.log(results);  
            return resolve(results);
        });
     });

};



primewaterdb.loginStaff = (username, password)=>{

    return new Promise((resolve, reject) =>{
    
            pool.query("SELECT * FROM tbl_staffs WHERE userName = ? AND password = ?  ",[username, password ], (err, results)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
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
    
            pool.query('SELECT tbl_customers.firstName, tbl_payments.status, tbl_invoices.invoiceStatus, tbl_customers.lastName, tbl_customers.middleName, tbl_customers.locationCode, tbl_customers.meterNo,tbl_payments.pricePerMeter, tbl_invoices.dueDate, tbl_invoices.previousMeter, tbl_invoices.presentMeter, tbl_invoices.totalMeter, tbl_payments.cashReceived,tbl_payments.totalBillingAmount,tbl_payments.discount,tbl_payments.penaltyFee, tbl_payments.remarks, tbl_payments.customerId FROM tbl_payments LEFT JOIN tbl_invoices ON tbl_invoices.invoiceId = tbl_payments.invoiceId LEFT JOIN tbl_customers ON tbl_customers.customerId = tbl_payments.customerId WHERE tbl_payments.invoiceId = ?',[invoiceId], (err, rows)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(rows);
        });
     });

};


primewaterdb.getTotalInvoices = (customerId)=>{

    return new Promise((resolve, reject) =>{
    
            pool.query('SELECT count(*) FROM tbl_invoices WHERE customerId = ?',[customerId], (err, rows)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(rows);
        });
     });

};


primewaterdb.getTotalInvoices = (customerId)=>{

    return new Promise((resolve, reject) =>{
    
            pool.query('SELECT count(*) as total FROM tbl_invoices WHERE customerId = ?',[customerId], (err, rows)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(rows);
        });
     });

};

primewaterdb.getCountPending = (customerId)=>{

    return new Promise((resolve, reject) =>{
    
            pool.query('SELECT count(*) as totalPending FROM tbl_invoices WHERE customerId = ? AND invoiceStatus = 0',[customerId], (err, rows)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(rows);
        });
     });

};

primewaterdb.getCountDone = (customerId)=>{

    return new Promise((resolve, reject) =>{
    
            pool.query('SELECT count(*) as totalDone FROM tbl_invoices WHERE customerId = ? AND invoiceStatus = 1',[customerId], (err, rows)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(rows);
        });
     });

};

primewaterdb.getLatestInvoice = (customerId)=>{

    return new Promise((resolve, reject) =>{
    
            pool.query('SELECT * FROM tbl_invoices WHERE customerId = ? ORDER BY createdAt DESC LIMIT 1',[customerId], (err, rows)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(rows);
        });
     });

};



primewaterdb.createInvoice = (invoice)=>{

    return new Promise((resolve, reject) =>{
        pool.query("INSERT INTO tbl_invoices (staffId,customerId,previousMeter,presentMeter,billingStart,billingEnd,dueDate,totalMeter,perCubicPrice,totalAmount,invoiceStatus,dateOfReading,remarks) VALUES (?)",[invoice], (err, results)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(results);
        });
     });

};

primewaterdb.UpdateInvoice = (array, invoiceId)=>{

    return new Promise((resolve, reject) =>{
    
            pool.query("UPDATE tbl_invoices set ? WHERE invoiceId = ?",[array, invoiceId], (err, results)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            console.log(results);  
            return resolve(results);
        });
     });

};

primewaterdb.getSecondInvoice = (customerId)=>{

    return new Promise((resolve, reject) =>{
    
            pool.query('SELECT * FROM (SELECT * from tbl_invoices WHERE customerId = ? ORDER BY createdAt DESC LIMIT 2) AS x ORDER BY createdAt LIMIT 1',[customerId], (err, rows)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(rows);
        });
     });

};

primewaterdb.getAllInvoice = ()=>{

    return new Promise((resolve, reject) =>{
    
            pool.query('SELECT tbl_invoices.invoiceId, tbl_invoices.staffId, tbl_invoices.previousMeter,tbl_invoices.presentMeter, tbl_invoices.dueDate, tbl_invoices.billingStart, tbl_invoices.billingEnd, tbl_invoices.totalMeter, tbl_invoices.perCubicPrice, tbl_invoices.totalAmount, tbl_invoices.invoiceStatus, tbl_invoices.dateOfReading, tbl_invoices.endOfReading, tbl_invoices.remarks,tbl_invoices.createdAt, tbl_customers.firstName, tbl_customers.customerId, tbl_customers.lastName, tbl_customers.middleName, tbl_customers.address FROM tbl_invoices LEFT JOIN tbl_customers ON tbl_invoices.customerId = tbl_customers.customerId', (err, rows)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(rows);
        });
     });

};


primewaterdb.getPaymentDetails = ()=>{

    return new Promise((resolve, reject) =>{
    
            pool.query('SELECT * FROM tbl_payments LEFT JOIN tbl_invoices ON tbl_invoices.invoiceId = tbl_payments.invoiceId LEFT JOIN tbl_customers ON tbl_customers.customerId = tbl_payments.customerId LEFT JOIN tbl_staffs ON tbl_staffs.staffId = tbl_payments.staffId', (err, rows)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(rows);
        });
     });

};



primewaterdb.insertNewPayment = ()=>{

    return new Promise((resolve, reject) =>{
    
            pool.query('INSERT INTO tbl_payments (invoiceId, customerId, staffId, pricePerMeter, cashReceived, totalBillingAmount ,discount, penaltyFee, status ) VALUES (?)', (err, rows)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(rows);
        });
     });

};

primewaterdb.deletePayment = (paymentId)=>{

    return new Promise((resolve, reject) =>{
    
            pool.query('DELETE FROM tbl_payments where paymentId = ?', [paymentId], (err, rows)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(rows);
        });
     });
};

//STAFF API
primewaterdb.getAllStaffs = ()=>{

    return new Promise((resolve, reject) =>{
    
            pool.query('SELECT * FROM tbl_staffs', (err, rows)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            return resolve(rows);
        });
     });

};

primewaterdb.UpdateStaff = (array, staffId)=>{

    return new Promise((resolve, reject) =>{
    
            pool.query("UPDATE tbl_staffs set ? WHERE staffId = ?",[array, staffId], (err, results)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            console.log(results);  
            return resolve(results);
        });
     });

};

primewaterdb.deactivateStaff = (staffId)=>{

    return new Promise((resolve, reject) =>{
    
            pool.query("UPDATE tbl_staffs SET status = 0 WHERE staffId = ?",[staffId], (err, results)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            console.log(results);  
            return resolve(results);
        });
     });

};

primewaterdb.activateStaff = (staffId)=>{

    return new Promise((resolve, reject) =>{
    
            pool.query("UPDATE tbl_staffs SET status = 1 WHERE staffId = ?",[staffId], (err, results)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            console.log(results);  
            return resolve(results);
        });
     });

};
































module.exports = primewaterdb;