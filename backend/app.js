const express = require('express');
const cors = require('cors');
const {join} = require('path');

const adminRoutes = require('./routes/admin'); //admin fonksiyonlarının olduğu dosya
const commentRoutes = require('./routes/comments'); //yorum fonksiyonlarının olduğu dosya
const cartRoutes = require('./routes/cart'); //sepet fonksiyonlarının olduğu dosya
const dotenv = require('dotenv');

dotenv.config();
const dbs=require(join(__dirname,'db.js'));
dbs();
const app=express();

// CORS ayarları
/*
app.use(cors({
  origin:[
    
  ] `${process.env.FRONTEND_URL}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
*/
// bu şekilde CORS ayarlarını yaparak, frontend uygulamanızın backend ile iletişim kurmasını sağlıyoruz.
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000', 
    'http://127.0.0.1:3001',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ].filter(Boolean),
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
app.use('/api/comments', commentRoutes);
app.use('/api/cart', cartRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on ${BACKEND_URL}`);
});