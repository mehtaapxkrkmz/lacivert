const express = require('express');
const {join} = require('path');
const dbs=require(join(__dirname,'db.js'));

dbs();
const app=express();
const PORT = process.env.PORT || 5000;
const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:5000";

app.listen(PORT, () => {
    console.log(`Server is running on ${BACKEND_URL}`);
});