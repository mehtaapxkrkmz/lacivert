import React from 'react'
import Product from './Product'
import { useNavigate } from 'react-router-dom'

// Sample product data - in a real app, this would come from an API
const products = [
  {
    id: 1,
    name: 'Ceket',
    images: [
      'https://img.hatemoglu.com/vizon-comfort-fit-duz-mono-yaka-klasik-ceket-p-14252024c002-vz-klasik-ceket-hatem-sayki-14252024c002-529781-26-O.jpg',
      'https://img.hatemoglu.com/vizon-comfort-fit-duz-mono-yaka-klasik-ceket-p-14252024c002-vz-klasik-ceket-hatem-sayki-14252024c002-529781-26-O.jpg',
      'https://img.hatemoglu.com/vizon-comfort-fit-duz-mono-yaka-klasik-ceket-p-14252024c002-vz-klasik-ceket-hatem-sayki-14252024c002-529781-26-O.jpg'
    ],
    score: 4.5,
    description: 'Vizon kumaştan üretilmiş, rahat kesimli klasik ceket.',
    price: 2999.99,
    stock: 50,
    category: 'Giyim'
  },
  {
    id: 2,
    name: 'Pantolon',
    images: [
      'https://productimages.hepsiburada.net/s/777/375-375/110000740097459.jpg',
      'https://productimages.hepsiburada.net/s/777/375-375/110000740097459.jpg',
      'https://productimages.hepsiburada.net/s/777/375-375/110000740097459.jpg'
    ],
    score: 3.8,
    description: 'Kot kumaştan üretilmiş, slim fit pantolon.',
    price: 899.99,
    stock: 30,
    category: 'Giyim'
  },
  {
    id: 3,
    name: 'Gömlek',
    images: [
      'https://www.manche.com.tr/images_buyuk/f81/siyah-likrali-pamuk-kadin-gomlek_31181_1.jpg',
      'https://www.manche.com.tr/images_buyuk/f81/siyah-likrali-pamuk-kadin-gomlek_31181_1.jpg',
      'https://www.manche.com.tr/images_buyuk/f81/siyah-likrali-pamuk-kadin-gomlek_31181_1.jpg'
    ],
    score: 4.2,
    description: 'Pamuklu kumaştan üretilmiş, klasik kesimli gömlek.',
    price: 499.99,
    stock: 45,
    category: 'Giyim'
  },
  {
    id: 4,
    name: 'Ayakkabı',
    images: [
      'https://static.ticimax.cloud/10219/uploads/urunresimleri/buyuk/hammer-jack-beyaz-kadin-ayakkabi-101-2-4af93c.jpg',
      'https://static.ticimax.cloud/10219/uploads/urunresimleri/buyuk/hammer-jack-beyaz-kadin-ayakkabi-101-2-4af93c.jpg',
      'https://static.ticimax.cloud/10219/uploads/urunresimleri/buyuk/hammer-jack-beyaz-kadin-ayakkabi-101-2-4af93c.jpg'
    ],
    score: 4.7,
    description: 'Deri malzemeden üretilmiş, rahat tabanlı ayakkabı.',
    price: 1299.99,
    stock: 25,
    category: 'Ayakkabı'
  },
  {
    id: 5,
    name: 'Takım Elbise',
    images: [
      'https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=85/30422/uploads/urunresimleri/buyuk/gri-takim-elbise-kombini-2a7-b6.jpg',
      'https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=85/30422/uploads/urunresimleri/buyuk/gri-takim-elbise-kombini-2a7-b6.jpg',
      'https://static.ticimax.cloud/cdn-cgi/image/width=-,quality=85/30422/uploads/urunresimleri/buyuk/gri-takim-elbise-kombini-2a7-b6.jpg'
    ],
    score: 3.5,
    description: 'Yün kumaştan üretilmiş, klasik kesimli takım elbise.',
    price: 3999.99,
    stock: 15,
    category: 'Giyim'
  },
  {
    id: 6,
    name: 'Terlik',
    images: [
      'https://skypodium.com/cdn/shop/files/s-l1200_a0179f80-d285-4df8-912f-e40aaa7390e0.webp?v=1724999091&width=1000',
      'https://skypodium.com/cdn/shop/files/s-l1200_a0179f80-d285-4df8-912f-e40aaa7390e0.webp?v=1724999091&width=1000',
      'https://skypodium.com/cdn/shop/files/s-l1200_a0179f80-d285-4df8-912f-e40aaa7390e0.webp?v=1724999091&width=1000'
    ],
    score: 4.0,
    description: 'EVA malzemeden üretilmiş, rahat tabanlı terlik.',
    price: 199.99,
    stock: 100,
    category: 'Ayakkabı'
  }
];

function Products() {
  const navigate = useNavigate()

  const handleProductClick = (productId) => {
    navigate(`/admin/products/${productId}`);
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Ürünleriniz</h1>
        <p>Ürünlerinizi yönetebilirsiniz</p>
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <div 
            key={product.id} 
            onClick={() => handleProductClick(product.id)}
            className="product-card-wrapper"
          >
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export { products };
export default Products;