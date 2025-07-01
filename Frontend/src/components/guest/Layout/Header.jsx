import React, { useState } from 'react';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { CiSearch, CiLogin } from "react-icons/ci";
import { RiMenu3Line } from "react-icons/ri";
import { NavLink, useNavigate } from 'react-router-dom';
import CategoryNavMenu from './CategoryNavMenu';
import logo from '../../../assets/lacivert-logo.png';
import { useAuth } from '../../../context/AuthContext';  // 👈

const Header = ({ cartItemCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();  // 👈 context'ten alıyoruz

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();  // context logout fonksiyonu çağrılıyor
    alert('Başarıyla çıkış yapıldı.');
    navigate('/login');
  };

  const menuItems = [
    { path: '/', label: 'ANASAYFA' },
    { path: '/kadin', label: 'KADIN' },
    { path: '/erkek', label: 'ERKEK' },
    { path: '/cocuk', label: 'ÇOCUK' },
  ];

  return (
    <div className='header'>
      <div className='items'>
        <div className='categories'>
          <NavLink to="/admin">ADMİN</NavLink>
          <CategoryNavMenu />
        </div>
        <div className='logo'>
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>
        <div className='navbar'>
          <div className='items'>
            <div className="search">
              <NavLink to="/search">
                <input type="text" placeholder="   Arama Yap" />
              </NavLink>
              <NavLink to="/search">
                <button type="submit"><CiSearch /></button>
              </NavLink>
            </div>
            <NavLink to="/favori">
              <div className="favorites-icon">
                <IoMdHeartEmpty />
              </div>
            </NavLink>
            <NavLink to="/profileupdate">
              <div className="account">
                <VscAccount className="VscAccount" />
              </div>
            </NavLink>
            {user ? (
              <button className="logout" onClick={handleLogout}>
                Çıkış Yap
              </button>
            ) : (
              <NavLink to="/login">
                <div className="login">
                  <CiLogin className="CiLogin" />
                </div>
              </NavLink>
            )}

            <NavLink to="/cart">
              <div className="shopping-bag">
                <HiOutlineShoppingBag />
                {cartItemCount > 0 && (
                  <span className="count">{cartItemCount}</span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
        <button className="hamburger-menu" onClick={toggleMenu}>
          <RiMenu3Line />
        </button>
      </div>
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className="mobile-menu-item"
                onClick={toggleMenu}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;