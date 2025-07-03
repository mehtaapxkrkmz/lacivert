// Bu script eski yorumlardaki numeric productId değerlerini, ilgili ürünün gerçek _id'si ile günceller.
// Çalıştırmak için: node backend/migrate_comment_product_ids.js

const mongoose = require('mongoose');
const Product = require('./models/product');
const Comment = require('./models/comment');

const MONGO_URI = 'mongodb://127.0.0.1:27017/lacivert'; // Gerekirse kendi bağlantı stringini kullan

async function migrate() {
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB bağlantısı başarılı.');

  // Sadece productId'si Number olan yorumları bul
  const comments = await Comment.find({ productId: { $type: 'number' } });
  console.log(`Güncellenecek yorum sayısı: ${comments.length}`);

  let updatedCount = 0;
  for (const comment of comments) {
    if (!comment.user) {
      await Comment.deleteOne({ _id: comment._id });
      console.warn(`Yorum ${comment._id} silindi: user alanı eksik.`);
      continue;
    }
    // Numeric productId ile ürünü bul
    const product = await Product.findOne({ eskiId: comment.productId }); // Eğer ürünlerde eskiId yoksa, başka bir alanla eşleştir
    if (product) {
      comment.productId = product._id;
      await comment.save();
      updatedCount++;
      console.log(`Yorum ${comment._id} güncellendi: productId -> ${product._id}`);
    } else {
      console.warn(`Yorum ${comment._id} için ürün bulunamadı (eskiId: ${comment.productId})`);
    }
  }

  console.log(`Toplam ${updatedCount} yorum güncellendi.`);
  await mongoose.disconnect();
  console.log('MongoDB bağlantısı kapatıldı.');
}

migrate().catch(err => {
  console.error('Migrasyon hatası:', err);
  process.exit(1);
}); 