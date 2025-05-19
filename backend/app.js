const express = require('express');
const {join} = require('path');
const dbs=require(join(__dirname,'db.js'));
const adminRoutes = require('./routes/admin'); // <- burası yeni

dbs();
const app=express();
app.use(express.json()); 
const PORT = process.env.PORT || 5000;
const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:5000";


app.use('/admin',adminRoutes);







app.listen(PORT, () => {
    console.log(`Server is running on ${BACKEND_URL}`);
});