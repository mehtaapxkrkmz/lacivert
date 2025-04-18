import React from 'react'
import '../../../scss/index.scss'

function ProductDetails() {
  return (
    <div className="productPage">
      <div className="productImages">
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
      <div className="productDetails">
      <h1>Polo Yaka Mavi Patch Logo Lacivert Sweatshirt</h1>
            <p class="price">
                <span class="discounted-price">909,99 TL</span>
                <span class="original-price">1.299,99 TL</span>
                <span class="discount">-30%</span>
            </p>
            <p class="product-code">Kod: 0510303-89353</p>
            <label for="size">Beden Seç:</label>
            <select id="size">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
            </select>
            <button>Sepete Ekle</button>
            <button>Kombin İncele</button>
            <button>Mağazada Bul</button>

      </div>
      

    </div>
  )
}

export default ProductDetails