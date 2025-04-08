import React from 'react'
import Product from './Product'

function Products() {
  // Sample product data - in a real app, this would come from an API
  const products = [
    {
      id: 1,
      name: 'Ceket',
      image: 'https://img.hatemoglu.com/vizon-comfort-fit-duz-mono-yaka-klasik-ceket-p-14252024c002-vz-klasik-ceket-hatem-sayki-14252024c002-529781-26-O.jpg',
      score: 4.5
    },
    {
      id: 2,
      name: 'Pantolon',
      image: 'https://productimages.hepsiburada.net/s/777/375-375/110000740097459.jpg',
      score: 3.8
    },
    {
      id: 3,
      name: 'Gömlek',
      image: 'https://www.manche.com.tr/images_buyuk/f81/siyah-likrali-pamuk-kadin-gomlek_31181_1.jpg',
      score: 4.2
    },
    {
      id: 4,
      name: 'Ayakkabı',
      image: 'https://static.ticimax.cloud/10219/uploads/urunresimleri/buyuk/hammer-jack-beyaz-kadin-ayakkabi-101-2-4af93c.jpg',
      score: 4.7
    },
    {
      id: 5,
      name: 'Takım Elbise',
      image: 'https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=85/30422/uploads/urunresimleri/buyuk/gri-takim-elbise-kombini-2a7-b6.jpg',
      score: 3.5
    },
    {
      id: 6,
      name: 'Terlik',
      image: 'https://skypodium.com/cdn/shop/files/s-l1200_a0179f80-d285-4df8-912f-e40aaa7390e0.webp?v=1724999091&width=1000',
      score: 4.0
    }
  ];

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Products</h1>
        <p>Manage your product inventory</p>
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Products