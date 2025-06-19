import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Giriş yapan kullanıcı

  const handleLogout = () => {
    localStorage.removeItem('user'); // Kullanıcıyı sil
    //setUser(null); // React state'i güncelle, böylece component yeniden render olur.
    alert('Başarıyla çıkış yapıldı.');
    navigate('/login'); // Giriş sayfasına yönlendir
  };

  return (
    <nav style={{ padding: '1rem', background: '#f5f5f5', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/">Anasayfa</Link>
      </div>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: '1rem' }}>Merhaba, {user.firstname}</span>
            <button onClick={handleLogout}>Çıkış Yap</button>
          </>
        ) : (
          <Link to="/login">Giriş Yap</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;