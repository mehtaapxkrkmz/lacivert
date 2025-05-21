const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sizeSchema = new mongoose.Schema({
  S: { type: Number, required: true, min: 0 },
  M: { type: Number, required: true, min: 0 },
  L: { type: Number, required: true, min: 0 },
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: [{ type: String, required: true }], // resim dosya yolları ya da URL'ler
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0 }, // stok alanı varsa (formda yok ama eklenebilir)
    category: { type: String, enum: ['woman', 'man', 'child'], required: true },
    sizes: { type: sizeSchema, required: true }, // formda size bilgisi için
    score: { type: Number, default: 1.0, min: 1.0, max: 5.0 }, // puan 0-5 arası varsayım
    isDiscounted: { type: Boolean, default: false },
  });
  
  const Product = mongoose.model('Product', productSchema);
  module.exports = Product;