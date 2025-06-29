import React, { useState, useEffect } from 'react'
import Product from './Product'

function Products() {
  const backendUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
  const [favorites, setFavorites] = useState([])
  const [products, setProducts] = useState([]) // backendden gelen ürünler için state

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

  useEffect(() => {
    fetch(`${backendUrl}/admin/products`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then(data => {
        setProducts(data)
        console.log(data) // data'yı log'la, products henüz güncellenmemiş olabilir
      })
      .catch(err => {
        console.error('Fetch hatası:', err)
      })
  }, [backendUrl])

  return (
    <div className="products">
      {products.length > 0 ? (
        products.map((product) => (
          <Product key={product._id} product={product} />
        ))
      ) : (
        <p>Ürünler yükleniyor...</p>
      )}
    </div>
  )
}

export default Products