import React, { useState } from "react"; // <-- Added useState import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import LoginSignup from "./components/LoginSignup";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  const [cart, setCart] = useState([]); // <-- using useState
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        const updatedCart = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        return updatedCart;
      } else {
        const newCart = [...prevCart, { ...item, quantity: 1 }];
        return newCart;
      }
    });
  };

  return (
    <Router>
      <Header cart={cart} isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} setSearchQuery={setSearchQuery} />

      <main style={{ filter: isLoginOpen ? "blur(3px)" : "none", pointerEvents: isLoginOpen ? "none" : "auto" }}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu addToCart={addToCart} searchQuery={searchQuery} />} />
          <Route path="/cart" element={<Cart cartItems={cart} setCart={setCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
        </Routes>
      </main>

      {isLoginOpen && <LoginSignup isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />}
    </Router>
  );
}

export default App;
