import { useState, useEffect } from 'react';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { CiSearch, CiLogin, CiLogout } from "react-icons/ci";
import { RiMenu3Line } from "react-icons/ri";
import { NavLink, useNavigate } from 'react-router-dom';
import CategoryNavMenu from './CategoryNavMenu';
import logo from '../../../assets/lacivert-logo.png';
import { useAuth } from '../../../context/AuthContext';  // 👈

const Header = ({ cartItemCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
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

  console.log("cart item count: ", cartItemCount);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            <NavLink to="/favorites">
              <div className="favorites-icon">
                <IoMdHeartEmpty />
              </div>
            </NavLink>
            <NavLink to="/profileupdate">
              <div className="account">
                <VscAccount className="VscAccount" />
              </div>
            </NavLink>
            {(!isMenuOpen || !isMobile) && (
              user ? (
                <div
                  className="logout"
                  title="Çıkış Yap"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  <CiLogout className="CiLogin logout-icon" style={{ transform: "rotate(180deg)" }} />
                </div>
              ) : (
                <NavLink to="/login">
                  <div className="login">
                    <CiLogin className="CiLogin" />
                  </div>
                </NavLink>
              )
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
            {user ? (
              <div
                className="mobile-menu-item logout-mobile"
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                style={{ color: "#e74c3c", cursor: "pointer" }}
              >
                Çıkış Yap
              </div>
            ) : (
              <NavLink
                to="/login"
                className="mobile-menu-item"
                onClick={() => {
                  toggleMenu();
                }}
              >
                Giriş Yap
              </NavLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;