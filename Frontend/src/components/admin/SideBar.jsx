import React from 'react'
import { IoHome } from "react-icons/io5";
import { FaTags } from "react-icons/fa6";
import { Link, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
function SideBar() {
  const location = useLocation();
  

  return (
    <div className="sidebar">
        <NavLink to="/"><h2 >lacivert</h2></NavLink>
        
      <ul>
        <li>
          <Link to="/admin"><IoHome className="icon"/><span>Özet Paneli</span></Link>
        </li>
        <li>
          <Link to="/admin/products"><FaTags className="icon"/><span>Ürünler</span></Link>
        </li>
      </ul>
      
    </div>
  )
}

export default SideBar