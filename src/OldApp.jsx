import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import FoodList from './components/FoodList';
import { Routes, Route } from 'react-router-dom';
import LoginSignup from './components/LoginSignup';

function OldApp() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <>
      <Header cart={cart} />
      <main>
        <Routes>
          <Route path="/" element={<FoodList addToCart={addToCart} />} />
          <Route path="/account" element={<LoginSignup />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default OldApp;