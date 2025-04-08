import { useState } from 'react';
import './App.css';
import React from 'react';
import Admin from './components/admin/Admin';
import Test from './components/admin/Test';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

const AppContent = () => {
  const location = useLocation();

  // admin ve /admin altındaki sayfalarda navbar gizlenecek
  const hideNav = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNav && (
        <nav>
          <Link to="/admin">Admin</Link>
          ----------
          <Link to="/test">Test</Link>
        </nav>
      )}
      <Routes>
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
