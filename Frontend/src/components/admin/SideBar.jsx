import React from 'react'
import { IoHome } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import { Link, useLocation } from 'react-router-dom';

function SideBar() {
  const location = useLocation();

  return (
    <div className="sidebar">
        <h2 >lacivert</h2>
      <ul>
        <li>
          <Link to="/admin"><IoHome className="icon"/><span>Dashboard</span></Link>
        </li>
        <li>
          <Link to="/admin/products"><FaTags className="icon"/><span>Products</span></Link>
        </li>
      </ul>
    </div>
  )
}

export default SideBar