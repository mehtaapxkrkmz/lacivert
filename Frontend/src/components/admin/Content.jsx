import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashBoard from './DashBoard';
import Products from './Products';
import ProductDetails from './ProductDetails';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

function Content() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="products/:id/edit" element={<EditProduct />} />
        <Route path="addProduct" element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default Content;
