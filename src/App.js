import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
  AuthWrapper,
  Home,
  OAuthLogin,
} from './pages';
import RegisterPage from './pages/RegisterPage';
import CreateOfferPage from './pages/CreateOfferPage';
import CreateOffer from './components/CreateOffer';

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='cart' element={<Cart />} />
          <Route path='products' element={<Products />} />
          <Route path='products/:id' element={<SingleProduct />} />
          <Route path='checkout' element={<PrivateRoute allowedRoles={['CUSTOMER', 'FARMER', 'ASSOCIATION']}><Checkout /></PrivateRoute>} />
          <Route path='offer' element={<PrivateRoute allowedRoles={['CUSTOMER', 'FARMER']}><CreateOffer /></PrivateRoute>} />
          <Route path='price-range' element={<PrivateRoute allowedRoles={['CUSTOMER', 'FARMER']}><Checkout /></PrivateRoute>} />
          <Route path='register' element={<PrivateRoute><RegisterPage /></PrivateRoute>} />
          <Route path='login' element={<OAuthLogin />} />
          <Route path='offer' element={<CreateOfferPage />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
      <Footer />
    </AuthWrapper>
  );
}

export default App;
