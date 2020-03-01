const dbConfig=require('./config').Dbconfig ; 
const mysql=require('mysql'); 
const conn=mysql.createConnection(dbConfig); 



 conn.connect(err=>{
    if(err){
        console.log(err); 
    }else
    {
        console.log("connection succes"); 
       
    }
}); 
module.exports = conn ; 


