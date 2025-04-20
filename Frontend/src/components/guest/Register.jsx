import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '/src/scss/register.scss'; // Doğru import yolu

function Register() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('İşlem başarıyla tamamlandı!');
    navigate('/login'); // Kayıt sonrası login sayfasına yönlendir
  };

  const handleForgotPassword = () => {
    const email = prompt('Lütfen kayıtlı e-posta adresinizi girin:');
    if (email) {
      alert(`Şifre sıfırlama bağlantısı ${email} adresine gönderilmiştir.`);
      // Burada backend'e şifre sıfırlama isteği gönderme mantığı olabilir.
    } else {
      alert('E-posta adresi girmediniz.');
    }
  };

  return (
    <div className="register-page"> {/* En dıştaki div'in className'i "register-page" */}
      <div className="register-container">
        <h1>LACİVERT'E KAYIT OL</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">Ad</label>
          <input type="text" id="firstname" name="firstname" placeholder="Adınızı girin" required />

          <label htmlFor="lastname">Soyad</label>
          <input type="text" id="lastname" name="lastname" placeholder="Soyadınızı girin" required />

          <label htmlFor="phone">Telefon</label>
          <input type="tel" id="phone" name="phone" placeholder="Telefon numaranızı girin" required />

          <label htmlFor="gender">Cinsiyet</label>
          <select id="gender" name="gender" required>
            <option value="">Seçiniz</option>
            <option value="male">Erkek</option>
            <option value="female">Kadın</option>
            <option value="other">Diğer</option>
          </select>

          <label htmlFor="birthdate">Doğum Tarihi</label>
          <input type="date" id="birthdate" name="birthdate" required />

          <label htmlFor="address">Adres</label>
          <input type="text" id="address" name="address" placeholder="Adresinizi girin" required />

          <label htmlFor="email">E-posta</label>
          <input type="email" id="email" name="email" placeholder="E-posta adresinizi girin" required />

          <label htmlFor="password">Şifre</label>
          <input type="password" id="password" name="password" placeholder="Şifrenizi girin" required />

          <button type="submit">Kayıt Ol</button>
        </form>

        <p>
          Zaten hesabınız var mı? <Link to="/login">Giriş Yap</Link>
        </p>
        <p>
          <button
            type="button"
            onClick={handleForgotPassword}
            style={{ background: 'none', border: 'none', color: '#0073e6', cursor: 'pointer', padding: 0, fontSize: '1rem' }}
          >
            Şifremi Unuttum
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;

