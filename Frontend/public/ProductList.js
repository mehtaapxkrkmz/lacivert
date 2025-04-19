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
      name: "Kahverengi TShirt",
      photos: [
        "https://sky-static.mavi.com/mnresize/820/1162/0612473-88067_image_1.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/0612473-88067_image_2.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/0612473-88067_image_3.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/0612473-88067_image_5.jpg"
      ],
      
      sizes: {S: 40, M: 80, L: 90},
      inCart: true,
      isFavorite: false,
      isDiscounted: false,
      oldPrice: 249.99,
      newPrice: 400,
      category: "Erkek",
      productFeatures:"Modern tarzı sade bir şıklıkla buluşturan kahverengi oversize tişört, rahat kesimi ve kaliteli kumaşıyla öne çıkıyor. Geniş kalıbı sayesinde vücuda yapışmadan dökülen tişört, gün boyu konfor sağlarken hareket özgürlüğü sunar. %100 pamuklu kumaştan üretilmiştir. Nefes alan dokusu sayesinde yaz aylarında serin tutar, dört mevsim kullanıma uygundur. Dikiş detaylarıyla sağlamlaştırılmış yapısı ve yumuşak dokusu sayesinde uzun süreli kullanımlarda bile formunu korur.Sokak modasından günlük giyime kadar her tarza kolayca uyum sağlayan bu tişört, basic giyimin vazgeçilmezlerinden biri olacak.",
      score:4,
      comments: [
        {
          user: "Mehmet",
          rating: 4,
          text: "Teri güzel emiyor, sporda giyiyorum."
        }
      ]
    },
    {
      id: 4,
      name: "Krem Renk Kapüşonlu",
      photos: [
        "https://sky-static.mavi.com/mnresize/820/1162/0S10306-70055_image_1.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/0S10306-70055_image_2.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/0S10306-70055_image_4.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/0S10306-70055_image_3.jpg"
      ],
      
      sizes: {S: 40, M: 80, L: 90},
      inCart: true,
      isFavorite: false,
      isDiscounted: false,
      oldPrice: 249.99,
      newPrice: 450,
      category: "Erkek",
      productFeatures:"Zamansız bir stile sahip krem renk kapüşonlu sweatshirt, sade şıklığıyla gardırobunuzun vazgeçilmez parçası olmaya aday. Modern ve rahat kesimiyle öne çıkan bu ürün, hem günlük kullanıma hem de sokak stiline mükemmel uyum sağlar.Yumuşak dokulu, içi şardonlu kumaşı sayesinde soğuk havalarda sizi sıcak tutarken nefes alabilen yapısıyla terletmez. %80 pamuk %20 polyester karışımıyla üretilmiş olan sweatshirt, hem dayanıklılık hem de konfor sunar.Rahat kalıbı, geniş kapüşonu ve kanguru cebiyle fonksiyonel bir kullanım vadeder. İster tek başına ister katmanlı kombinlerde kullanabileceğiniz bu krem hoodie, minimal tasarımıyla her tarza uyum sağlar.",
      score:2,
      comments: [
        {
          user: "Mehmet",
          rating: 4,
          text: "Teri güzel emiyor, sporda giyiyorum."
        }
      ]
    },{
      id: 5,
      name: "Domates Desenli TShirt",
      photos: [
        "https://sky-static.mavi.com/mnresize/820/1162/1613056-70057_image_1.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/1613056-70057_image_2.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/1613056-70057_image_6.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/1613056-70057_image_5.jpg"
      ],
     
      sizes: {S: 40, M: 80, L: 90},
      inCart: true,
      isFavorite: false,
      isDiscounted: true,
      oldPrice: 249.99,
      newPrice: 195,
      category: "Erkek",
      productFeatures:"Zamansız bir stile sahip krem renk kapüşonlu sweatshirt, sade şıklığıyla gardırobunuzun vazgeçilmez parçası olmaya aday. Modern ve rahat kesimiyle öne çıkan bu ürün, hem günlük kullanıma hem de sokak stiline mükemmel uyum sağlar.Yumuşak dokulu, içi şardonlu kumaşı sayesinde soğuk havalarda sizi sıcak tutarken nefes alabilen yapısıyla terletmez. %80 pamuk %20 polyester karışımıyla üretilmiş olan sweatshirt, hem dayanıklılık hem de konfor sunar.Rahat kalıbı, geniş kapüşonu ve kanguru cebiyle fonksiyonel bir kullanım vadeder. İster tek başına ister katmanlı kombinlerde kullanabileceğiniz bu krem hoodie, minimal tasarımıyla her tarza uyum sağlar.",
      score:2,
      comments: [
        {
          user: "Mehmet",
          rating: 4,
          text: "Teri güzel emiyor, sporda giyiyorum."
        }
      ]
    },
      {
      id: 6,
      name: "Domates Desenli TShirt",
      photos: [
        "https://sky-static.mavi.com/mnresize/820/1162/1613061-71879_image_1.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/1613061-71879_image_2.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/1613061-71879_image_3.jpg",
        "https://sky-static.mavi.com/mnresize/820/1162/1613061-71879_image_5.jpg"
      ],
     
      sizes: {S: 40, M: 80, L: 90},
      inCart: true,
      isFavorite: false,
      isDiscounted: false,
      oldPrice: 249.99,
      newPrice: 195,
      category: "Kadın",
      productFeatures:"Canlı rengi ve sade tasarımıyla öne çıkan kadın yeşil tişört, hem şıklığı hem de günlük konforu bir arada sunar. Vücuda oturan modern kesimi sayesinde sportif ve zarif bir görünüm sağlar.%100 pamuk kumaştan üretilmiş olan bu tişört, nefes alabilen yapısı sayesinde yaz aylarında serin ve ferah bir kullanım imkânı sunar. Yumuşacık dokusu cilde dosttur, gün boyu rahatlık hissi verir.Klasik bisiklet yaka detayı ve kısa kollu formuyla her tarza uyum sağlayan bu tişörtü, jean pantolonlardan eteklere kadar farklı parçalarla kolayca kombinleyebilirsiniz. İster günlük kullanımda ister spor şıklık arayan kombinlerde tercih edebilirsiniz.",
      score:5,
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
  