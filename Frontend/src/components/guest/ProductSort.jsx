
!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Favorilere Ekleme/Çıkarma</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 20px;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr); /* Her satırda 3 ürün olacak */
      gap: 20px;
      justify-content: center;
    }

    .product {
      position: relative;
      background: #fff;
      border: 1px solid #ddd;
      padding: 10px;
      text-align: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }

    .product img {
      width: 70%; /* Resimlerin genişliği %70 olarak ayarlandı */
      height: auto;
      border-radius: 4px;
    }

    .heart-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 24px;
      color: #ccc;
      cursor: pointer;
      transition: color 0.3s, transform 0.3s;
    }

    .heart-icon.favorited {
      color: red;
      animation: pulse 0.4s ease;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.4); }
      100% { transform: scale(1); }
    }

    h3 {
      margin-top: 10px;
    }
  </style>
</head>
<body>

  <h2 style="text-align:center;">Ürünler</h2>

  <div class="product-grid" id="product-container"></div>

  <script>
    // Ürün verileri
    const products = [
      { id: 1, name: "Ürün 1", img: "https://sky-static.mavi.com/mnresize/820/1162/1110177-89165_image_2.jpg" },
      { id: 2, name: "Ürün 2", img: "https://sky-static.mavi.com/mnresize/820/1162/1710658-82318_image_1.jpg" },
      { id: 3, name: "Ürün 3", img: "https://sky-static.mavi.com/mnresize/820/1162/1010757-82625_image_2.jpg" },
      { id: 4, name: "Ürün 4", img: "https://sky-static.mavi.com/mnresize/820/1162/1110462-87011_image_1.jpg" },
      { id: 5, name: "Ürün 5", img: "https://sky-static.mavi.com/mnresize/820/1162/1110585-86415_image_1.jpg" },
      { id: 6, name: "Ürün 6", img: "https://sky-static.mavi.com/mnresize/820/1162/1310618-89426_image_1.jpg" },
      { id: 7, name: "Ürün 7", img: "https://sky-static.mavi.com/mnresize/820/1162/1210819-89252_image_1.jpg" },
      { id: 8, name: "Ürün 8", img: "https://sky-static.mavi.com/mnresize/820/1162/0010421-70057_image_1.jpg" },
      { id: 9, name: "Ürün 9", img: "https://sky-static.mavi.com/mnresize/820/1162/0110535-89103_image_2.jpg" },
      { id: 10, name: "Ürün 10", img: "https://sky-static.mavi.com/mnresize/820/1162/0S10303-89353_image_1.jpg" },
      { id: 11, name: "Ürün 11", img: "https://sky-static.mavi.com/mnresize/820/1162/0S10319-70497_image_1.jpg" },
      { id: 12, name: "Ürün 12", img: "https://sky-static.mavi.com/mnresize/820/1162/0210818-70497_image_1.jpg" },
    ];

    // Ürünleri DOM'a ekle
    const container = document.getElementById("product-container");

    products.forEach(product => {
      const div = document.createElement("div");
      div.className = "product";
      div.id = "product-" + product.id;
      div.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <span class="heart-icon" id="heart-${product.id}" onclick="toggleFavorite(${product.id})">&#9829;</span>
        <h3>${product.name}</h3>
      `;
      container.appendChild(div);
    });

    // Kalp simgesi tıklama fonksiyonu
    function toggleFavorite(productId) {
      const heartIcon = document.getElementById("heart-" + productId);
      heartIcon.classList.toggle("favorited");

      const message = heartIcon.classList.contains("favorited")
        ? "Bu ürünü favorilere eklediniz."
        : "Bu ürünü favorilerden çıkardınız.";

      alert(message);
    }
  </script>

</body>
</html>
