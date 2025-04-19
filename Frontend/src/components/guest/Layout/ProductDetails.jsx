import React from 'react'
import '../../../scss/index.scss'
import '../../../scss/ProductDetails.scss';
import AddComment from '../../user/comment/AddComment';
import Rating from '../../user/comment/Rating';
import DeleteComment from '../../user/comment/DeleteComment';  
import UpdateComment from '../../user/comment/UpdateComment';  

function ProductDetails({id }) {
  return (
    <div className="productPage">
      <div className="productImages">
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
      <div className="productDetails">
      <h1>Polo Yaka Mavi Patch Logo Lacivert Sweatshirt</h1>
            <p className="price">
                <span class="discounted-price">909,99 TL</span>
                <span class="original-price">1.299,99 TL</span>
                <span class="discount">-30%</span>
            </p>
            <p className="product-code">Kod: 0510303-89353</p>
            <label htmlfor="size">Beden Seç:</label>
            <select id="size">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
            </select>
            <button>Sepete Ekle</button>
            <button>Kombin İncele</button>
            <button>Mağazada Bul</button>

      </div>
          {/* Yorum ve Puanlama Bileşenleri */}
        <div className="comment-section">
          <h2>Yorumlar ve Puanlama</h2>
          <Rating productId={id} />  {/* Aynı şekilde Rating bileşenine de id geçiyoruz */}
          <AddComment productId={id} />  {/* id burada productId olarak kullanılıyor */}
          <DeleteComment productId={id} />  {/* DeleteComment bileşenine de id geçiyoruz */}
          <UpdateComment productId={id} />  {/* UpdateComment bileşenine de id geçiyoruz */}
        </div>
    </div>
  )
}

export default ProductDetails