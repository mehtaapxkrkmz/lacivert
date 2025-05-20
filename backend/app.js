const express = require('express');
const cors = require('cors');
const {join} = require('path');
const dbs=require(join(__dirname,'db.js'));
const adminRoutes = require('./routes/admin'); // <- burası yeni

dbs();
const app=express();

// CORS ayarları
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Request boyut limitini artır
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 5000;
const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:5000";

app.use('/admin',adminRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${BACKEND_URL}`);
});