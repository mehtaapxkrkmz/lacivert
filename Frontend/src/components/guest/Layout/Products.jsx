import React, { useState } from 'react'
import Product from './Product'
import ProductList from '../../../data/ProductList'

function Products() {


  return (
    <div className="products">
      {ProductList.map((product) => (
        <Product
          key={product.id}
          id={product.id} // Pass the id to the Product component
          name={product.name}
          photos={product.photos}
          gender={product.gender}
          sizes={product.sizes}
          inCart={product.inCart}
          isFavorite={product.isFavorite}
          isDiscounted={product.isDiscounted}
          oldPrice={product.oldPrice}
          newPrice={product.newPrice}
          comments={product.comments}
        />
      ))}
    </div>
  )
}

export default Products