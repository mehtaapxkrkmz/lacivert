import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashBoard from './DashBoard';
import Products from './Products';

function Content() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="products" element={<Products />} />
      </Routes>
    </div>
  );
}

export default Content;
