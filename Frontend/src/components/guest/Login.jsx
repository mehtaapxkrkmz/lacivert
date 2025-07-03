import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '/src/scss/login.scss';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const backendURL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
  const { login } = useAuth(); // ✅ Context login fonksiyonu
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loadingReset, setLoadingReset] = useState(false);

  const handleForgotPassword = async () => {
    const email = prompt('Lütfen kayıtlı e-posta adresinizi girin:');
    
    if (!email) {
      alert('E-posta adresi girmediniz.');
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert('Geçerli bir e-posta adresi giriniz.');
      return;
    }

    try {
      setLoadingReset(true);
      await axios.post(`${backendURL}/api/users/forgot-password`, { email });
      alert(`Şifre sıfırlama bağlantısı ${email} adresine gönderildi.`);
    } catch (error) {
      alert(error.response?.data?.message || 'Şifre sıfırlama işlemi başarısız oldu.');
    } finally {
      setLoadingReset(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendURL}/api/users/login`, formData);

      const userWithToken = {
        ...res.data.user,
        _id: res.data.user._id || res.data.user.id,
      };

      // ✅ Context ile login yap
      login(res.data.token, userWithToken);

      alert('Giriş başarılı!');
      if (userWithToken.role === 'admin') {
      navigate('/admin');     // Admin paneli sayfası
    } else {
      navigate('/');          // Normal kullanıcı anasayfası
    }
      
    } catch (err) {
      alert(err.response?.data?.message || 'Giriş başarısız!');
    }
  };

  return (
    <div className="login-container">
      <h1>LACİVERT'E GİRİŞ YAP</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-posta</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-postanızı girin"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Şifre</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Şifrenizi girin"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Giriş Yap</button>
      </form>

      <p>
        Hesabınız yok mu? <Link to="/register">Kayıt Ol</Link>
      </p>
      <p>
        <button
          type="button"
          onClick={handleForgotPassword}
          disabled={loadingReset}
          style={{
            background: 'none',
            border: 'none',
            color: loadingReset ? '#999' : '#0073e6',
            cursor: loadingReset ? 'not-allowed' : 'pointer',
            padding: 0,
            fontSize: '1rem',
          }}
        >
          {loadingReset ? 'Gönderiliyor...' : 'Şifremi Unuttum'}
        </button>
      </p>
    </div>
  );
};

export default Login;

 