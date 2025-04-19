import React, { useState } from 'react'
import '../../../scss/index.scss'
import '../../../scss/ProductDetails.scss';
import AddComment from '../../user/comment/AddComment';
import Rating from '../../user/comment/Rating';
import DeleteComment from '../../user/comment/DeleteComment';  
import UpdateComment from '../../user/comment/UpdateComment';  
import Select from 'react-select';

// Accordion başlık ve içerikleri
const accordionData = [
  {
    title: "Ürün Özellikleri",
    content: (
      <p>
        Mavi'nin dış giyim koleksiyonundan Yaka Detaylı Haki Ceket. İki adet fermuarlı yan ve bir adet fermuarlı ön cep, çıt çıt ile ayarlanabilir etek. Bu ürün için özel wax/yağ kaplama tekniği uygulanmıştır. Kullanım süresince üzerindeki efektlerin zenginleşmesiyle kendine özgü bir görünüm kazanır. Zamanla belirginleşen bu efektler, ürüne daha karakteristik bir dokunuş katar.
      </p>
    )
  },
  {
    title: "Yıkama Bilgileri",
    content: (
      <p>
        Kuru temizleme yapılmamalı ve tersten ütülenmelidir. Hassas programda yıkayınız. Düşük ısıda ütüleyiniz.
      </p>
    )
  },
  {
    title: "Ödeme Seçenekleri",
    content: (
      <p>
        Kredi kartı, banka kartı ve kapıda ödeme seçenekleri mevcuttur.
      </p>
    )
  }
];

function ProductDetails({id }) {
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
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

  const options = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordion = (idx) => {
    setOpenAccordion(openAccordion === idx ? null : idx);
  };

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
              <span className="original-price">1.299,99 TL</span>
              <span className="discounted-price">909,99 TL</span>   
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

          {/* Accordionlar Başlangıcı */}
          <div className="accordion">
            {accordionData.map((item, idx) => (
              <div key={idx}>
                <button
                  className="accordion-toggle"
                  onClick={() => handleAccordion(idx)}
                    style={{
                    width: '100%',
                    padding: '10px',
                    background: '#eee',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontWeight: 'bold',
                    marginBottom: '2px',
                    backgroundColor:"white",
                    transition: 'background 0.3s',
                  }}
                >
                  {item.title}
                  <span style={{ float: 'right' }}>{openAccordion === idx ? '-' : '+'}</span>
                </button>
                {openAccordion === idx && (
                  <div className="accordion-content" style={{ padding: '10px', background: '#ffff', border: '1px solid #eee' }}>
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Accordionlar Sonu */}
        </div>
      </div>
      {/* Yorum ve Puanlama Bileşenleri */}
      <div className="comment-section">
        <h2>Yorumlar ve Puanlama</h2>
        <Rating productId={id} />
        <AddComment productId={id} />
        <DeleteComment productId={id} />
        <UpdateComment productId={id} />
      </div>
    </div>
  )
}

export default ProductDetails