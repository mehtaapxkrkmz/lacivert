import React, { useState } from 'react'
import '../../../scss/index.scss'
import '../../../scss/ProductDetails.scss';
import AddComment from '../../user/comment/AddComment';
import Rating from '../../user/comment/Rating';
import DeleteComment from '../../user/comment/DeleteComment';  
import UpdateComment from '../../user/comment/UpdateComment';  
import Select from 'react-select';
import ProductList from '../../../../public/ProductList';
import { useParams } from 'react-router-dom';  

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


function ProductDetails() {
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
  const { id } = useParams();  
  const product = ProductList.find(product => product.id === parseInt(id));

  return (
    <div className="productPage">
      <div className="productInfo">
        <div className="productImages">
            {product.photos && product.photos.map((photo, index) => (
              <img key={index} src={photo} alt={`Product Image ${index + 1}`} />
            ))}
        </div>

        <div className="productDetails">
          <h2>{product.name}</h2>
          <p className="price">
              <span className="original-price">{product.oldPrice} TL</span>
              <span className="discounted-price">{product.newPrice}</span>   
          </p>
          <p className="product-code">Ürün Kodu: {product.id}</p>
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
                    fontWeight: '500',
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