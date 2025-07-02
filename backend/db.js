const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';

const conn = () => {
   mongoose.connect(MONGO_URI, {
    dbName: "lacivert",
    useNewUrlParser: true,
    useUnifiedTopology: true
   }).then(()=>{
         console.log("DB connected");
   }).catch((err)=>{ 
         console.log("DB error ", err);
   });
}

module.exports = conn;
