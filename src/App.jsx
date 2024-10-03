import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/LoginPage/Login';
import Register from './components/RegisterPage/Register';
import Home from './components/HomePage/Home'
import ArtistDashboard from './components/HomePage/ArtistDashboard/ArtistDashboard';
import CartPage from './components/Cart/Cart'
import OrderConfirmationPage from './components/OrderConfirmationPage ';
import CheckoutPage from './components/CheckoutPage/CheckoutPage';
import './App.css';

const App = () => {

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  return (
    <div className="app">
      <Routes>
         <Route path="/home" element={<Home />} />
         <Route path="*" element={<Login />} />
         <Route path="/cart" element={<CartPage />} />
         <Route path="/register" element={<Register />} />
         <Route path="/artist-dashboard" element={<ArtistDashboard />} />
         <Route path="/checkout" element={<CheckoutPage />} />
         <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      </Routes>
      
    </div>
  );
};
export default App;
