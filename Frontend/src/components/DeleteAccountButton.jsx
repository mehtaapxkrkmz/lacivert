// src/components/DeleteAccountButton.jsx
import React from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

const DeleteAccountButton = ({ userId, onDeleted }) => {
  const backendURL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Hesabınızı silmek istediğinizden emin misiniz?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${backendURL}/api/users/${userId}`, {  // burada backendURL kullanıldı
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Hesap başarıyla silindi.");
      onDeleted?.(); // Örn: logout işlemi
    } catch (error) {
      console.error("Silme hatası:", error.response?.data || error.message);
      alert("Hesap silinemedi.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 text-white px-5 py-2.5 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
    >
      <Trash2 size={18} />
      Hesabımı Sil
    </button>
  );
};
export default DeleteAccountButton;