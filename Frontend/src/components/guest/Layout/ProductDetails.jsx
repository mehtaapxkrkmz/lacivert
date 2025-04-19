import React from 'react'
import '../../../scss/index.scss'
import '../../../scss/ProductDetails.scss';
import AddComment from '../../user/comment/AddComment';
import Rating from '../../user/comment/Rating';
import DeleteComment from '../../user/comment/DeleteComment';  
import UpdateComment from '../../user/comment/UpdateComment';  
import Select from 'react-select';



function ProductDetails({id }) {
  //react select objesi için stil
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,//default stilin üzerine ekleme yapıyoruz
      boxShadow: state.isFocused ? '0 0 0 2px #999' : 'none', 
      borderColor: state.isFocused ? '#999' : provided.borderColor,
      outline: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#999' : '#fff',
      color: state.isFocused ? '#fff' : '#333',
    }),
  };
  //react selectteki options için stiller
  const options = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];


  return (
    <div className="productPage">
      <div className="productInfo">
        <div className="productImages">
          <img src="https://sky-static.mavi.com/mnresize/820/1162/1110621-70204_image_1.jpg" alt="" />
          <img src="https://sky-static.mavi.com/mnresize/820/1162/1110621-70204_image_3.jpg" alt="" />
          <img src="https://sky-static.mavi.com/mnresize/820/1162/1110621-70204_image_6.jpg" alt="" />
          <img src="https://sky-static.mavi.com/mnresize/820/1162/1110621-70204_image_7.jpg" alt="" />
        </div>
        <div className="productDetails">
          <h2>Yaka Detaylı Haki Ceket</h2>
          <p className="price">
              <span class="original-price">1.299,99 TL</span>
              <span class="discounted-price">909,99 TL</span>   
          </p>
          <p className="product-code">Ürün Kodu: 0510303-89353</p>
          <br />
          {/* form yapısı */}
          <form className='order' action="">
            <Select
              options={options}
              placeholder="Beden Seçiniz"
              styles={customSelectStyles}
            />
            <button type='submit'>Sepete Ekle</button>  
          </form>
          <br />
          <hr className='line'/>

          <div className="productFeatures">
              <h3>Ürün Özellikleri</h3>
              <p>Mavi nin dış giyim koleksiyonundan Yaka Detaylı Haki Ceket. İki adet fermuarlı yan ve bir adet fermuarlı ön cep, çıt çıt ile ayarlanabilir etek. Bu ürün için özel wax/yağ kaplama tekniği uygulanmıştır. Kullanım süresince üzerindeki efektlerin zenginleşmesiyle kendine özgü bir görünüm kazanır. Zamanla belirginleşen bu efektler, ürüne daha karakteristik bir dokunuş katar. Kuru temizleme yapılmamalı ve tersten ütülenmelidir.</p>

              
          </div>
                
        </div>
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