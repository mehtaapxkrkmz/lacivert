import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '/src/scss/profileupdate.scss';
import DeleteAccountButton from '../DeleteAccountButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Profileupdate() {
  const backendURL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
  const { token, user , login , logout} = useAuth(); // ✅ sadece context'ten al
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    email: '',
    birthdate: '',
    gender: '',
  });
   useEffect(() => {
  if (!user || !token) {
    alert('Bu sayfaya erişmek için giriş yapmanız gerekiyor.');
    navigate('/login');
  }
}, [user, token, navigate]);
  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        phone: user.phone || '',
        address: user.address || '',
        email: user.email || '',
        birthdate: user.birthdate ? user.birthdate.slice(0, 10) : '',
        gender: user.gender || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
   

    e.preventDefault();
  const userId = user._id || user.id;
    if (!user || !userId || !token) {
      alert('Giriş yapmış kullanıcı bulunamadı.');
      return;
    }

    try {
      const response = await axios.put(
       `${backendURL}/api/users/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Kullanıcı bilgisi güncellendiyse, yeni verileri context’e veya localStorage'a yazabilirsin.
      const updatedUser = { ...response.data, token };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      // Context güncelle (login fonksiyonunu kullan)
      login(token, updatedUser);
      alert('Profil başarıyla güncellendi.');
      // Sayfayı yenilemeden AuthContext güncellemek istersen burada `login(token, updatedUser)` çağrısı da yapılabilir.
    } catch (err) {
      console.error('Profil güncelleme hatası:', err);
      alert('Güncelleme sırasında bir hata oluştu.');
    }
  };

  const handleDeleted = () => {
    logout();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Profilini Güncelle</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">Ad</label>
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />

          <label htmlFor="lastname">Soyad</label>
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />

          <label htmlFor="phone">Telefon</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />

          <label htmlFor="gender">Cinsiyet</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Seçiniz</option>
            <option value="male">Erkek</option>
            <option value="female">Kadın</option>
            <option value="other">Diğer</option>
          </select>

          <label htmlFor="birthdate">Doğum Tarihi</label>
          <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />

          <label htmlFor="address">Adres</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />

          <label htmlFor="email">E-posta</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />

          <button type="submit">Kaydet</button>
        </form>

        {user && (
          <div style={{ marginTop: '20px' }}>
            <DeleteAccountButton userId={user._id} onDeleted={handleDeleted} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profileupdate;