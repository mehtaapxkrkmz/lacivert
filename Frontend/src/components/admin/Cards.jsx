import React, { useEffect, useState } from 'react'
import Card from './Card'
import { FaBox } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

function Cards() {
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = (import.meta.env.VITE_API_URL).replace(/\/$/, '');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/dashboard`);
        if (!response.ok) throw new Error('Veriler alınamadı');
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div className='cards'>Yükleniyor...</div>;
  if (error) return <div className='cards'>Hata: {error}</div>;

  return (
    <div className='cards'>
      <Card 
        title="Toplam Ürün Sayısı" 
        value={dashboardData.totalProducts} 
        icon={<FaBox className="card-icon-element" />} 
      />
      <Card 
        title="Ürünlerin Toplam Değeri" 
        value={`$${dashboardData.totalRevenue.toLocaleString()}`} 
        icon={<FaMoneyBillWave className="card-icon-element" />} 
      />
      <Card 
        title="Toplam Kullanıcı Sayısı" 
        value={dashboardData.totalUsers} 
        icon={<FaUsers className="card-icon-element" />} 
      />
    </div>
  )
}

export default Cards