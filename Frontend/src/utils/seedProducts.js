import { addProduct } from '../services/productService'

export const seedProducts = async () => {
  const initialProducts = [
    {
      name: "Kadın Yazlık Elbise",
      photos: [
        "/images/elbise1.png",
        "/images/elbise1_2.png"
      ],
      gender: "Kadın",
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
      name: "Erkek Spor Tişört",
      photos: [
        "/images/tshirt1.png"
      ],
      gender: "Erkek",
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
  ]

  try {
    for (const product of initialProducts) {
      await addProduct(product)
      console.log(`Added product: ${product.name}`)
    }
    console.log('All products seeded successfully!')
  } catch (error) {
    console.error('Error seeding products:', error)
  }
} 