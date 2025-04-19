import React, { useState } from 'react';
import '/src/scss/profileupdate.scss'; // SCSS dosyasını import et

function ProfileUpdate() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    email: '',
    birthdate: '',
    gender: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profiliniz başarıyla güncellendi!');
    // Backend'e gönderme işlemi yapılabilir
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Profilini Güncelle</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">Ad</label>
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} placeholder="Adınızı girin" />

          <label htmlFor="lastname">Soyad</label>
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Soyadınızı girin" />

          <label htmlFor="phone">Telefon</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefon numaranız" />

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
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Adresiniz" />

          <label htmlFor="email">E-posta</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-posta adresiniz" />

          <button type="submit">Kaydet</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileUpdate;
