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


primewaterdb.insert = (customers)=>{

    return new Promise((resolve, reject) =>{
        pool.query("INSERT INTO tbl_customers (customerId,image,meterNo,startMeter,startDate,firstName,middleName,lastName,gender,birthDate,address,locationCode,contactNo,email,password,status) VALUES (?)",[customers], (err, results)=>{
            if(err){
                console.log("error: ", err);
                return reject(err);
            }
            console.log(results);  
            return resolve(results);
        });
     });

};



primewaterdb.update = (test, customerId)=>{

    console.log(test)

    return new Promise((resolve, reject) =>{
    //     pool.query("UPDATE tbl_customers SET image = ?, meterNo =? , startMeter = ? , startDate = ?, firstName = ?, middleName =? , lastName=?, gender=?, birthDate=?, addres=?, locationCode=?, contactNo=?, email=?,password=?,status=?WHERE customerId = ? ",[body.customerId,body.image,body.meterNo,body.startMeter, body.startDate, body.firstName, 
    //         body.middleName,body.lastName,body.gender,body.birthDate,body.address,body.locationCode,body.contactNo,
    //    body.email,body.password,body.status, customerId], (err, results)=>{
           
        // pool.query("UPDATE tbl_customers SET  ? WHERE customerId = ? ", [{ image: test.image ,meterNo: test.meterNo}, customerId], (err, results)=>{
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











module.exports = primewaterdb;