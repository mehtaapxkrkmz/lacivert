// models/cart.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, //Ürün id (Product modeline referans)
  size: { type: String, enum: ['S', 'M', 'L'], required: true }, //beden
  quantity: { type: Number, required: true, min: 1 }, //adet
});

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true }, //(User modeline referans)
  items: [cartItemSchema], //Sepetteki tüm ürünler
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;


//const cart = await Cart.findOne({ user: userId }).populate('items.product');
// Bu kod, kullanıcının sepetindeki ürünleri ve ilgili bilgileri getirir.
// Sepet modelini kullanarak, kullanıcıya ait sepeti bulabilir ve içindeki ürünleri çekebilirsiniz.

/*
    Sepet toplamı hesaplama
    
    const totalPrice = cart.items.reduce((sum, item) => {
      const price = item.product.price; // product schema'dan geliyor
      const quantity = item.quantity;
      return sum + price * quantity;
    }, 0);
*/