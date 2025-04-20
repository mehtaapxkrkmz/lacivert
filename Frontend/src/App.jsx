import { useState } from 'react'
import './App.css'
import React from 'react'
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

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import ProductDetails from '../src/components/guest/Layout/ProductDetails'


const AppContent = () => {
  const location = useLocation();

  // admin ve /admin altındaki sayfalarda navbar gizlenecek
  //const hideNav = location.pathname.startsWith("/admin");

  return (
    <>
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
          <Route path='/favori' element={<Favori />} />
          <Route path='/search' element={<Search />} />
          <Route path='/cart' element={<CartPage />} />
        </Route>
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </>
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
