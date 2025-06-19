import { useState,useEffect } from 'react'
import './App.css'
import React from 'react'
import { jwtDecode } from 'jwt-decode';

import Admin from './components/admin/Admin'
import CartPage from './components/user/CartPage/CartPage'
import Login from './components/guest/Login'
import Register from './components/guest/Register'
import Profileupdate from './components/guest/Profileupdate'
import Search from './components/guest/Layout/SearchPage'
import Products from './components/guest/Layout/Products'
import Home from './components/guest/Layout/Home'
import Favori from './components/guest/Favori'
import Layout from './components/guest/Layout/Layout'
import ProductFilter from './components/guest/ProductFilter';
import Profile from './components/guest/Products/Profile';


import ProductDetails from '../src/components/guest/Layout/ProductDetails'
import ForgotPassword from './components/guest/ForgotPassword'; 
import ResetPassword from './components/guest/ResetPassword';

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

const AppContent = () => {
  const location = useLocation();
  
  const [favorites, setFavorites] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);

  // ✅ JWT'den kullanıcıyı al
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUser(decoded); // decoded.id, decoded.email vs.
      } catch (err) {
        console.error("Token çözümlenemedi:", err);
        setCurrentUser(null);
      }
    }
  }, []);

  const toggleFavorite = (productId) => {
    const isFavorite = favorites.includes(productId);
    const updatedFavorites = isFavorite
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];
  
    setFavorites(updatedFavorites);
  }
  
  return (
  
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Ana sayfa */}
          <Route path="kadin" element={<ProductFilter category="Kadın" />} />
          <Route path="erkek" element={<ProductFilter category="Erkek" />} />
          <Route path="cocuk" element={<ProductFilter category="Çocuk" />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profileupdate" element={<Profileupdate />} />
          <Route path="/profile" element={<Profile currentUser={currentUser} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

         
          <Route path='/search' element={<Search />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path="/favori" element={<Favori favorites={favorites} toggleFavorite={toggleFavorite} />}/>
        </Route>
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
   
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
