import React from 'react'
import Cards from './Cards'
import { IoMdAdd } from "react-icons/io";
import { Link } from 'react-router-dom';

function DashBoard() {
  return (
    <div className='dashboard'>
      <div className="dashboard-header">
        <h1>Hoşgeldiniz</h1>
        <p>Yeni ürün ekleyebilirsiniz.</p>
      </div>
      <Cards />
      <Link to="/admin/addProduct" className="add-product-button">
        <IoMdAdd className="add-icon" />
        <span>Yeni Ürün Ekle</span>
      </Link>
    </div>
  )
}

export default DashBoard