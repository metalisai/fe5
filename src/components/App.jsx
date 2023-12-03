import React, { useState, createContext, useMemo } from 'react';
import './App.css';
import Nav from './Nav';
import Gallery from './Gallery';
import Product from './Product';

import ProductStore from '../business/ProductStore';

export const CartContext = createContext(null);

const App = (() => {

  const productStore = new ProductStore();

  const featuredProduct = useMemo(() => productStore.getFeaturedProduct(), []);
  
  const [cart, setCart] = useState([]);

  return (
    <div className="container">
      <CartContext.Provider value={{cart, setCart}}>
        <Nav store={productStore} />
        <main>
          <Gallery images={featuredProduct.images} />
          <Product product={featuredProduct} />
        </main>
      </CartContext.Provider>
    </div>
  );
});

export default App;
