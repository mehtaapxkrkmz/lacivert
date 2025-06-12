const mongoose = require('mongoose'); 

const MONGO_URI = process.env.MONGO_URI;

//connect to db
const conn = () => {
   mongoose.connect(MONGO_URI, {
    dbName: "lacivert"
   }).then(()=>{
         console.log("DB connected");
   }).catch((err)=>{ 
         console.log("DB error ", err);
   })
}



module.exports = conn;