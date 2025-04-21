import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import '../../../scss/Home.scss'

function Product({ id, name, photos, oldPrice, newPrice, isDiscounted ,isFavorite,toggleFavorite}) {
  const navigate = useNavigate()
  const [currentImage, setCurrentImage] = useState(photos[0]) // Initialize with the first photo

  const handleProductClick = () => {
    navigate(`/product/${id}`); // Use the id to navigate to the product details page
  }
 

  const handleMouseMove = (e) => {
    const imageWidth = e.target.offsetWidth
    const mousePosition = e.nativeEvent.offsetX

    // Calculate which image to show based on mouse position
    if (mousePosition < imageWidth / 4) {
      setCurrentImage(photos[0]) // Show the first image (index 0) for the left 1/4
    } else if (mousePosition < imageWidth / 2) {
      setCurrentImage(photos[1]) // Show the second image (index 1) for the middle 2/4
    } else if(mousePosition < (imageWidth * 3) / 4) {
      setCurrentImage(photos[2]) // Show the third image (index 2) for the middle 3/4
    }
    else{
      setCurrentImage(photos[3]) // Show the fourth image (index 3) for the right 1/4
    }
  }

  const handleMouseLeave = () => {
    setCurrentImage(photos[0]) // Reset to the first image
  }

  return (
    <div className="product" onClick={handleProductClick}>
      <img 
        src={currentImage} 
        alt={name} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave} 
      />
     
      {isDiscounted && (
        <div className="etiket11">
          <span id='etiket'>İndirimli Ürün</span>
        </div>
      )}
      
      
      
      <span
  className={`heart-icon ${isFavorite ? 'favorited' : ''}`}
  onClick={(e) => {
    e.stopPropagation(); // Ürün detayına gitmesin
    toggleFavorite(id); // Favori durumunu değiştir
  }}
>
  &#9829;
</span>

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
