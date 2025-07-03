import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const backendURL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage('Geçerli bir e-posta adresi giriniz.');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${backendURL}/api/users/forgot-password`, { email });
      setMessage('E-posta adresinize şifre sıfırlama bağlantısı gönderildi.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Bu e-posta ile kayıtlı kullanıcı bulunamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-2">Şifremi Unuttum</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Kayıtlı e-posta adresiniz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-2"
          disabled={loading}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Gönderiliyor...' : 'Gönder'}
        </button>
      </form>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}

export default ForgotPassword;

