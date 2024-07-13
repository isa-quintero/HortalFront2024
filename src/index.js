import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { OffersProvider } from './context/offers_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { MagicProvider } from './context/magic_context'; 
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <MagicProvider>
    <UserProvider>
      <OffersProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </OffersProvider>
    </UserProvider>
  </MagicProvider>
);
