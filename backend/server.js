//backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // MongoDB bağlantı fonksiyonunu içe aktar
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); // ✅ Sadece bunu çağırmak yeterli

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', authRoutes);

// Basit test endpoint
app.get('/', (req, res) => {
  res.send('Backend çalışıyor!');
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor.`);
});