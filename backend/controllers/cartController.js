// controllers/cartController.js
const Cart = require('../models/cart');
const Product = require('../models/product');

const cartController = {
    // POST /api/cart/add/:userId - Sepete ürün ekleme
    // Kullanıcı kimliği req.user._id üzerinden alınır
    addToCart : async (req, res) => {
        try{
            //const userId = req.user._id;
            const {userId} = req.params; //gecici
            const { productId, size, quantity } = req.body;

            // Gerekli alanları kontrol et
            if (!productId || !size || !quantity) {
                return res.status(400).json({ 
                    message: 'ProductId, size ve quantity alanları zorunludur' 
                });
            }

            // Ürünün var olup olmadığını kontrol et
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Ürün bulunamadı' });
            }

            let cart = await Cart.findOne({ user: userId });
            if (!cart) {
                cart = new Cart({ user: userId, items: [] });
                await cart.save();
            }
            //Kullanıcının daha önce bir sepeti varsa onu bulur, yoksa yeni bir Cart nesnesi oluşturur 

            const existingItem = cart.items.find(item =>
                item.product.toString() === productId && item.size === size
            );
            //Sepet içindeki items dizisinde aynı ürün + aynı beden daha önce eklenmiş mi kontrol edilir.
            //toString() ile ObjectId string'e çevrilir çünkü productId string geliyor.


            if (existingItem) {
                existingItem.quantity += quantity; //varsa adetini artırır
                if (existingItem.quantity < 1) {
                    // Eğer adet 1'den az ise, bu ürünü sepetten kaldırır
                    cart.items = cart.items.filter(item => item !== existingItem); 
                }
            } else {
                cart.items.push({ product: productId, size, quantity });
            }

            await cart.save();
            
            // Populate ile ürün bilgilerini de döndür
            const populatedCart = await Cart.findOne({ user: userId })
                .populate('items.product');

            res.status(200).json({
                message: 'Ürün sepete başarıyla eklendi',
                cart: populatedCart
            });

        }catch (error) {
            console.error('Sepete ekleme hatası:', error);
            res.status(500).json({ 
                message: 'Sunucu hatası', 
                error: error.message 
            });
        }
    }
    

    /*


    Ürün kontrolü → Ürün var mı?
    Sepet bulma/oluşturma → Kullanıcının sepeti var mı?
    Item kontrolü → Aynı ürün+beden daha önce eklenmiş mi?
    Güncelleme/Ekleme → Varsa artır, yoksa yeni ekle
    Kaydetme → Veritabanına kaydet
    Populate ile dönüş → Ürün detaylarıyla birlikte sepeti döndür




    addToCart: async (req, res) => {
        console.log("addToCart çağrıldı");
        console.log("Params:", req.params);
        console.log("Body:", req.body);
        
        try {
            const { userId } = req.params;
            const { productId, size, quantity } = req.body;
            
            console.log("UserId:", userId);
            console.log("ProductId:", productId);
            console.log("Size:", size);
            console.log("Size type:", typeof size);
            console.log("Quantity:", quantity);

            // Size değerini kontrol et ve düzelt
            let validSize = size;
            if (size === 'small') validSize = 'S';
            if (size === 'medium') validSize = 'M';
            if (size === 'large') validSize = 'L';
            
            console.log("Valid size:", validSize);

            // Gerekli alanları kontrol et
            if (!productId || !validSize || !quantity) {
                return res.status(400).json({ 
                    message: 'ProductId, size ve quantity alanları zorunludur' 
                });
            }

            // Ürünün var olup olmadığını kontrol et
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Ürün bulunamadı' });
            }

            // Sepeti bul veya yeni oluştur
            let cart = await Cart.findOne({ user: userId });
            if (!cart) {
                cart = new Cart({ user: userId, items: [] });
            }

            // Aynı ürün ve beden kombinasyonunu kontrol et
            const existingItem = cart.items.find(item =>
                item.product.toString() === productId && item.size === validSize
            );

            if (existingItem) {
                existingItem.quantity += quantity;
                if (existingItem.quantity < 1) {
                    cart.items = cart.items.filter(item => item !== existingItem);
                }
            } else {
                cart.items.push({ product: productId, size: validSize, quantity });
            }

            await cart.save();
            
            res.status(200).json({
                message: 'Ürün sepete başarıyla eklendi',
                cart: cart
            });

        } catch (error) {
            console.error('Detaylı hata:', error);
            res.status(500).json({ 
                message: 'Sunucu hatası', 
                error: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    }
    */
};

module.exports = cartController;