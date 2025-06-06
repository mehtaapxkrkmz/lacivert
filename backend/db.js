const mongoose = require('mongoose'); 

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/";

//connect to db
const conn = () => {
   mongoose.connect(DB_URL, {
    dbName: "lacivert"
   }).then(()=>{
         console.log("DB connected");
   }).catch((err)=>{ 
         console.log("DB error ", err);
   })
}



module.exports = conn;