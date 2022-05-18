var mysql = require('mysql');

const conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'lunch'
})

conn.connect(err =>{
  if(!err){
    console.log("Successfully connected to Database... THANK YOU JESUS");
  }else{
    console.log('Database failed to connected, Thank Him anyhow!!',JSON.stringify(err,undefined,2));
  }
})

module.exports = conn