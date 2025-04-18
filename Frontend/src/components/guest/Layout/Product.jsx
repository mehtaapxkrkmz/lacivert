import React from 'react'
import { useNavigate } from 'react-router-dom'

function Product({ id, name, photos, oldPrice, newPrice, isDiscounted }) {
  const navigate = useNavigate()

  const handleProductClick = () => {
    navigate(`/product/${id}`); // Use the id to navigate to the product details page
  }

  return (
    <div className="product-card" onClick={handleProductClick}>
      <img src={photos[0]} alt={name} />
      <h3>{name}</h3>
      <div className="price">
        {isDiscounted && (
          <>
            <span className="old-price">{oldPrice.toFixed(2)} TL</span>
          </>
        )}
        &nbsp;
        <span className="new-price">{newPrice.toFixed(2)} TL</span>
      </div>
    </div>
  )
}

export default Product