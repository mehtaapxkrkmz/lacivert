
import React, { useState } from 'react'
import Product from './Product'
import ProductList from '../../../data/ProductList.js'
import '../../../scss/Home.scss'

function Products() {
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = (productId) => {
    const isFavorite = favorites.includes(productId)
    const updatedFavorites = isFavorite
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId]

    setFavorites(updatedFavorites)

    alert(isFavorite
      ? "Bu ürünü favorilerden çıkardınız."
      : "Bu ürünü favorilere eklediniz.")
  }

  return (
    <div className="products">
      <h2 style={{ textAlign: "center" }}>Favori Ürünler</h2>
      <div className="product-grid">
        {ProductList.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            photos={product.photos}
            gender={product.gender}
            sizes={product.sizes}
            inCart={product.inCart}
            isFavorite={favorites.includes(product.id)}
            isDiscounted={product.isDiscounted}
            oldPrice={product.oldPrice}
            newPrice={product.newPrice}
            comments={product.comments}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  )
}

export default Products
