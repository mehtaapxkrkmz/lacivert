// src/data/products.js

const ProductList = [
    {
      id: 1,
      name: "Yaka Detaylı Haki Cekete",
      photos: [
        "https://sky-static.mavi.com/mnresize/820/1162/1110621-70204_image_1.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/1110621-70204_image_3.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/1110621-70204_image_6.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/1110621-70204_image_9.jpg"
      ],
      gender: "Kadın",
      sizes: {S: 10, M: 20, L: 30},
      inCart: false,
      isFavorite: true,
      isDiscounted: true,
      oldPrice: 399.99,
      newPrice: 299.99,
      category: "Kadın",
      productFeatures:"Mavi'nin dış giyim koleksiyonundan Yaka Detaylı Haki Ceket. İki adet fermuarlı yan ve bir adet fermuarlı ön cep, çıt çıt ile ayarlanabilir etek. Bu ürün için özel wax/yağ kaplama tekniği uygulanmıştır. Kullanım süresince üzerindeki efektlerin zenginleşmesiyle kendine özgü bir görünüm kazanır. Zamanla belirginleşen bu efektler, ürüne daha karakteristik bir dokunuş katar.",
      score:5,
      comments: [
        {
          user: "Ayşe",
          rating: 5,
          text: "Rengi canlı, kumaşı harika!"
        }
      ]
    },
    {
      id: 2,
      name: "Polo Yaka Mavi Patch Logo Lacivert",
      photos: [
        "https://sky-static.mavi.com/mnresize/820/1162/0S10303-89353_image_1.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/0S10303-89353_image_2.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/0S10303-89353_image_4.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/0S10303-89353_image_5.jpg"
      ],
      gender: "Erkek",
      sizes: {S: 50, M: 70, L: 80},
      inCart: true,
      isFavorite: false,
      isDiscounted: false,
      oldPrice: 249.99,
      newPrice: 249.99,
      category: "Erkek",
      productFeatures:"Mavi'nin dış giyim koleksiyonundan Yaka Detaylı Haki Ceket. İki adet fermuarlı yan ve bir adet fermuarlı ön cep, çıt çıt ile ayarlanabilir etek. Bu ürün için özel wax/yağ kaplama tekniği uygulanmıştır. Kullanım süresince üzerindeki efektlerin zenginleşmesiyle kendine özgü bir görünüm kazanır. Zamanla belirginleşen bu efektler, ürüne daha karakteristik bir dokunuş katar.",
      score:3,
      comments: [
        {
          user: "Mehmet",
          rating: 4,
          text: "Teri güzel emiyor, sporda giyiyorum."
        }
      ]
    },
    {
      id: 3,
      name: "Polo Yaka Mavi Patch Logo Lacivert",
      photos: [
        "https://sky-static.mavi.com/mnresize/820/1162/0S10303-89353_image_1.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/0S10303-89353_image_2.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/0S10303-89353_image_4.jpg","https://sky-static.mavi.com/mnresize/820/1162/0S10303-89353_image_5.jpg"
      ],
      gender: "Erkek",
      sizes: {S: 40, M: 80, L: 90},
      inCart: true,
      isFavorite: false,
      isDiscounted: false,
      oldPrice: 249.99,
      newPrice: 249.99,
      category: "Erkek",
      productFeatures:"Mavi'nin dış giyim koleksiyonundan Yaka Detaylı Haki Ceket. İki adet fermuarlı yan ve bir adet fermuarlı ön cep, çıt çıt ile ayarlanabilir etek. Bu ürün için özel wax/yağ kaplama tekniği uygulanmıştır. Kullanım süresince üzerindeki efektlerin zenginleşmesiyle kendine özgü bir görünüm kazanır. Zamanla belirginleşen bu efektler, ürüne daha karakteristik bir dokunuş katar.",
      score:4,
      comments: [
        {
          user: "Mehmet",
          rating: 4,
          text: "Teri güzel emiyor, sporda giyiyorum."
        }
      ]
    }
  ];
  

  export default ProductList;
  