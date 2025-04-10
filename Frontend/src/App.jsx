import { useState } from 'react'
import './App.css'
import React from 'react'
import Admin from './components/admin/Admin'
import Test from './components/admin/Test'
import Home from './components/Layout/Home'
import Layout from './components/Layout/Layout'

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";


const AppContent = () => {
  const location = useLocation();

  // admin sayfasında nav gizlenecek
  const hideNav = location.pathname === "/admin";

  return (
    <>
      {/*{!hideNav && (
        <nav>
          <Link to="/admin">admin</Link>
          ----------
          <Link to="/test">test</Link>
        </nav>
      )}*/}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Ana sayfa */}         
        </Route>
        <Route path="/admin" element={<Admin />} />
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
  )
}

export default App
