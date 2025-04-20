
const ProductList = [
  {
    id: 1,
    name: "Yaka Detaylı Haki Ceket",
    photos: [
      "https://sky-static.mavi.com/mnresize/820/1162/1110621-70204_image_1.jpg",
      "https://sky-static.mavi.com/mnresize/820/1162/1110621-70204_image_3.jpg",
      "https://sky-static.mavi.com/mnresize/820/1162/1110621-70204_image_6.jpg"
    ],
    gender: "Women",
    sizes: [
      { label: "S", value: 36 },
      { label: "M", value: 38 },
      { label: "L", value: 40 }
    ],
    inCart: false,
    isFavorite: true,
    isDiscounted: true,
    oldPrice: 399.99,
    newPrice: 299.99,
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
      "https://sky-static.mavi.com/mnresize/820/1162/0S10303-89353_image_4.jpg"
    ],
    gender: "Men",
    sizes: [
      { label: "M", value: 40 },
      { label: "L", value: 42 },
      { label: "XL", value: 44 }
    ],
    inCart: true,
    isFavorite: false,
    isDiscounted: false,
    oldPrice: 249.99,
    newPrice: 249.99,
    comments: [
      {
        user: "Mehmet",
        rating: 4,
        text: "Teri güzel emiyor, sporda giyiyorum."
      }
    ]
  },
  {
    id: 2,
    name: "Polo Yaka Mavi Patch Logo Lacivert",
    photos: [
      "https://sky-static.mavi.com/mnresize/820/1162/0S10303-89353_image_1.jpg",
      "https://sky-static.mavi.com/mnresize/820/1162/0S10303-89353_image_2.jpg",
      "https://sky-static.mavi.com/mnresize/820/1162/0S10303-89353_image_4.jpg"
    ],
    gender: "Men",
    sizes: [
      { label: "M", value: 40 },
      { label: "L", value: 42 },
      { label: "XL", value: 44 }
    ],
    inCart: true,
    isFavorite: false,
    isDiscounted: false,
    oldPrice: 249.99,
    newPrice: 249.99,
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
