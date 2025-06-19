import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault(); // Önce formun varsayılan davranışını engelle

      // Sonra e-posta doğrulamasını yap
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    setMessage('Geçerli bir e-posta adresi giriniz.');
    return;
  }
    try {
      

      await axios.post('http://localhost:5000/api/forgot-password', { email });
      setMessage('E-posta adresinize şifre sıfırlama bağlantısı gönderildi.');
    } catch (err) {
      setMessage('Bu e-posta ile kayıtlı kullanıcı bulunamadı.');
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
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Gönder
        </button>
      </form>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}

export default ForgotPassword;
