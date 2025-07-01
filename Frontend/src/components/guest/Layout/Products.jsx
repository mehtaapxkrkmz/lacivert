import React, { useState, useEffect } from 'react';
import Product from './Product';
import { useAuth } from '../../../context/AuthContext';

function Products() {
  const backendUrl = import.meta.env.VITE_API_URL;
  const { token, user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);

  // 🔁 Ürünleri çek
  useEffect(() => {
    fetch(`${backendUrl}/admin/products`)
      .then((res) => {
        if (!res.ok) throw new Error('Ürünler yüklenemedi');
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error('Ürün fetch hatası:', err));
  }, [backendUrl]);

  // ✅ Giriş yapmış kullanıcının favorilerini çek / çıkış yapınca sıfırla
  useEffect(() => {
    if (!token) {
      setFavorites([]); // ⛔ Çıkış yaptıysa favorileri temizle
      return;
    }

    fetch(`${backendUrl}/api/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data.map((fav) => fav._id));
      })
      .catch((err) => console.error('Favoriler alınamadı:', err));
  }, [token]);

  // 🔁 Favori ekle/çıkar
  const toggleFavorite = async (productId) => {
    if (!token) {
      alert('Bu işlemi yapmak için giriş yapmalısınız.');
      return;
    }

    const isFavorite = favorites.includes(productId);

    try {
      const response = await fetch(
        `${backendUrl}/api/favorites/${productId}`,
        {
          method: isFavorite ? 'DELETE' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Favori işlemi başarısız:', response.status, errorText);
        throw new Error('İşlem başarısız');
      }

      const updatedFavorites = isFavorite
        ? favorites.filter((id) => id !== productId)
        : [...favorites, productId];

      setFavorites(updatedFavorites);
    } catch (err) {
      alert('Favori işlemi başarısız.');
      console.error(err);
    }
  };

  return (
    <div className="products">
      {products.length > 0 ? (
        products.map((product) => (
          <Product
            key={product._id}
            product={{
              ...product,
              isFavorite: token ? favorites.includes(product._id) : false, // ✅ Token varsa kontrol et
            }}
            toggleFavorite={toggleFavorite}
          />
        ))
      ) : (
        <p>Ürünler yükleniyor...</p>
      )}
    </div>
  );
}

export default Products;