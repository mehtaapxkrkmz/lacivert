import React from 'react'
import Card from './Card'
import { FaBox } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

function Cards() {
  // This would typically come from an API or state management
  const dashboardData = {
    totalProducts: 124,
    totalRevenue: 45678,
    totalUsers: 89
  };

  return (
    <div className='cards'>
      <Card 
        title="Total Products" 
        value={dashboardData.totalProducts} 
        icon={<FaBox className="card-icon-element" />} 
      />
      <Card 
        title="Total Revenue" 
        value={`$${dashboardData.totalRevenue.toLocaleString()}`} 
        icon={<FaMoneyBillWave className="card-icon-element" />} 
      />
      <Card 
        title="Total Users" 
        value={dashboardData.totalUsers} 
        icon={<FaUsers className="card-icon-element" />} 
      />
    </div>
  )
}

export default Cards