import React from 'react'
import { useNavigate } from 'react-router-dom'

function Product({ id, name, photos, oldPrice, newPrice, isDiscounted }) {
  const navigate = useNavigate()

  const handleProductClick = () => {
    navigate(`/product/${id}`); // Use the id to navigate to the product details page
  }

  return (
    <div className="product" onClick={handleProductClick}>
      <img src={photos[0]} alt={name} />
      {isDiscounted && (
        <div className="disCounted">
          <span>İndirimli Ürün</span>
        </div>
      )}   
      <div className='name'>{name}</div>
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