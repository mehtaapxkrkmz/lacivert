import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '/src/scss/register.scss';
import { useAuth } from '../../context/AuthContext';

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = {
      firstname: form.firstname.value,
      lastname: form.lastname.value,
      phone: form.phone.value,
      gender: form.gender.value,
      birthdate: form.birthdate.value,
      address: form.address.value,
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || 'Kayıt başarılı!');
        localStorage.setItem('token', result.token); // Token'ı sakla
        login(result.token, result.user);
        setTimeout(() => navigate('/'), 300);
      } else {
        alert(result.message || 'Kayıt başarısız!');
      }
    } catch (error) {
      console.error('Kayıt hatası:', error);
      alert('Sunucuya bağlanılamadı.');
    }
  };

  // Burada handleForgotPassword fonksiyonu doğru şekilde tanımlandı:
  const handleForgotPassword = async () => {
    const email = prompt('Lütfen kayıtlı e-posta adresinizi girin:');

    if (!email) {
      alert('E-posta adresi girmediniz.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || `Şifre sıfırlama bağlantısı ${email} adresine gönderildi.`);
      } else {
        alert(data.message || 'Şifre sıfırlama isteği başarısız oldu.');
      }
    } catch (error) {
      alert('Sunucu ile bağlantı kurulamadı.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>LACİVERT'E KAYIT OL</h1>
      
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">Ad</label>
          <input type="text" id="firstname" name="firstname" required />

          <label htmlFor="lastname">Soyad</label>
          <input type="text" id="lastname" name="lastname" required />

          <label htmlFor="phone">Telefon</label>
          <input type="tel" id="phone" name="phone" required />

          <label htmlFor="gender">Cinsiyet</label>
          <select id="gender" name="gender" required>
            <option value="">Seçiniz</option>
            <option value="Erkek">Erkek</option>
            <option value="Kadın">Kadın</option>
            <option value="Diğer">Diğer</option>
          </select>

          <label htmlFor="birthdate">Doğum Tarihi</label>
          <input type="date" id="birthdate" name="birthdate" required />

          <label htmlFor="address">Adres</label>
          <input type="text" id="address" name="address" required />

          <label htmlFor="email">E-posta</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Şifre</label>
          <input type="password" id="password" name="password" required />

          <button type="submit">Kayıt Ol</button>
        </form>
      
       

        <p>
          Zaten hesabınız var mı? <Link to="/login">Giriş Yap</Link>
        </p>
        <p>
          <button
            type="button"
            onClick={handleForgotPassword} // burada fonksiyonu bağladık
            style={{
              background: 'none',
              border: 'none',
              color: '#0073e6',
              cursor: 'pointer',
              padding: 0,
              fontSize: '1rem',
            }}
          >
            Şifremi Unuttum
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;




