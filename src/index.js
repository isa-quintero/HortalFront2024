import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { MagicProvider } from './context/magic_context'; // Import MagicProvider
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <MagicProvider>
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </MagicProvider>
);
