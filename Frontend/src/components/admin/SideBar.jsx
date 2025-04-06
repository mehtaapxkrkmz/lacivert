import React from 'react'
import { IoHome } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";

function SideBar() {
  return (
    <div class="sidebar">
        <h2>Admin Panel</h2>
        <ul>
            <li><IoHome /> <a>Dashboard</a></li>
            {/* <li><FaChartPie /><a> Kategoriler</a></li> */}
            {/* gereksimlerde belirtilmedi, şuanlık yapılmayacak*/} 
            <li><FaTags /> <a>Ürünler</a></li>
        </ul>
    </div>
  )
}

export default SideBar