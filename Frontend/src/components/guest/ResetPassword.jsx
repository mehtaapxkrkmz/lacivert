import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      setMessage('Şifre en az 6 karakter olmalı.');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, { password });
      setMessage(res.data.message || 'Şifre başarıyla güncellendi.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage('Token geçersiz veya süresi dolmuş.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Tüm ekran yüksekliği
        backgroundColor: 'white', // Açık gri arka plan
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>
          Yeni Şifre Oluştur
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Yeni şifreniz"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              marginBottom: '12px',
            }}
          />

          <button
            type="submit"
            style={{
              backgroundColor: 'red',
              color: 'white',
              padding: '10px 16px',
              borderRadius: '6px',
              border: 'none',
              width: '100%',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Kaydet
          </button>
        </form>
        {message && (
          <p
            style={{
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              color: message.includes('başarı') ? 'green' : 'red',
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;