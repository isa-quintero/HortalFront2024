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
import CreatePriceRangePage from './pages/CreatePriceRangePage';
import PriceRangeTablePage from './pages/PriceRangeTablePage';
import OfferTablePage from './pages/OfferTablePage';

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
          <Route path='checkout' element={<PrivateRoute allowedRoles={['CUSTOMER']}><Checkout /></PrivateRoute>} />
          <Route path='offer' element={<PrivateRoute allowedRoles={['FARMER']}><CreateOfferPage /></PrivateRoute>} />
          <Route path='offers' element={<PrivateRoute allowedRoles={['FARMER']}><OfferTablePage /></PrivateRoute>} />
          <Route path='price-range' element={<PrivateRoute allowedRoles={['ASSOCIATION']}><CreatePriceRangePage /></PrivateRoute>} />
          <Route path='price-ranges' element={<PrivateRoute allowedRoles={['ASSOCIATION']}><PriceRangeTablePage /></PrivateRoute>} />
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
