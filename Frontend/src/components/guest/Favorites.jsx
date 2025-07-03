import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Product from '../guest/Layout/Product';

function Favorites() {
  const backendUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
  const { token } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    fetch(`${backendUrl}/api/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch(() => {
        setFavorites([]);
        setLoading(false);
      });
  }, [token, backendUrl]);

  if (loading) return <p>Favoriler yükleniyor...</p>;
  if (!favorites.length) return <p>Henüz favori ürün yok.</p>;

  return (
    <div className="favorites-page">
      <h2>Favorilerim</h2>
      <div className="products">
        {favorites.map((product) => (
          <Product key={product._id} product={{ ...product, isFavorite: true }} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;