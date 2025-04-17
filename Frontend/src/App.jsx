import { useState } from 'react'
import './App.css'
import React from 'react'
import Admin from './components/admin/Admin'
import Test from './components/admin/Test'
import Home from './components/guest/Layout/Home'
import Layout from './components/guest/Layout/Layout'
import Products from './components/guest/Products/Products'

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";


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
          <Route path="/urunler" element={<Products />} /> {/* Ürünler sayfası */}
        </Route>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/test" element={<Test />} />
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
