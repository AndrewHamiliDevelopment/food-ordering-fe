import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import LoginSignup from "./components/LoginSignup";
import Menu from "./components/Menu";
import Profile from "./components/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: "Pizza", price: 250, category: "Fast Food", image: "pizza.jpg" },
    { id: 2, name: "Burger", price: 150, category: "Fast Food", image: "burger.jpg" },
  ]);

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <Router>
      <Header isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} setSearchQuery={setSearchQuery} />

      <main style={{ filter: isLoginOpen ? "blur(3px)" : "none", pointerEvents: isLoginOpen ? "none" : "auto" }}>
        <Routes>
        <Route path="/profile" element={<Profile products={products} addProduct={addProduct} />} />
        <Route path="/menu" element={<Menu foodItems={products} />} />
        </Routes>
      </main>

      {isLoginOpen && <LoginSignup isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />}
    </Router>
  );
}

export default App;
