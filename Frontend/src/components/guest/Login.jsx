import React from 'react';
import { Link } from 'react-router-dom';
import '/src/scss/login.scss';

const Login = () => {
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
    <div className="login-container">
      <h1>Mavi'ye Giriş Yap</h1>
      <form action="/login" method="POST">
        <label htmlFor="email">E-posta</label>
        <input type="email" id="email" name="email" placeholder="E-postanızı girin" required />

        <label htmlFor="password">Şifre</label>
        <input type="password" id="password" name="password" placeholder="Şifrenizi girin" required />

        <button type="submit">Giriş Yap</button>
      </form>
      <p>
        Hesabınız yok mu? <Link to="/register">Kayıt Ol</Link>
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

  );
};

export default Login;

 