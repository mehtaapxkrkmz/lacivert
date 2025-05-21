const express = require('express');
const cors = require('cors');
const {join} = require('path');
const dbs=require(join(__dirname,'db.js'));
const adminRoutes = require('./routes/admin'); //admin fonksiyonlarının olduğu dosya
const dotenv = require('dotenv');

dotenv.config();

dbs();
const app=express();

// CORS ayarları
app.use(cors({
  origin: `${process.env.FRONTEND_URL}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Request boyut limiti
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//uploads klasörünü static olarak sun
app.use('/uploads', express.static(join(__dirname, 'uploads')));

//Port ve backend yapılandırması
const PORT = process.env.PORT || 5000;
const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:5000";


//yönlendirmeler
app.use('/admin',adminRoutes);





app.listen(PORT, () => {
    console.log(`Server is running on ${BACKEND_URL}`);
});