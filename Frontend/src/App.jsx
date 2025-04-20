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
import Layout from './components/guest/Layout/Layout'

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import ProductDetails from '../src/components/guest/Layout/ProductDetails'


const AppContent = () => {
  const location = useLocation();

  // admin ve /admin altındaki sayfalarda navbar gizlenecek
  const hideNav = location.pathname.startsWith("/admin");

  return (
    <>
      {/*{!hideNav && (
        <nav>
          <Link to="/admin">Admin</Link>
          ----------
          <Link to="/test">Test</Link>
        </nav>
      )}*/}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Ana sayfa */} 
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />  
          <Route path="/profileupdate" element={<Profileupdate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />  
          <Route path="/products/:gender" element={<Products />} /> 
          <Route path="/search" element={<Search />} />
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
