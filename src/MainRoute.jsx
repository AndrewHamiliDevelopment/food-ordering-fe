import { Api } from "./api";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { firebaseSignInWithEmailAndPassword } from "./shared";
import Home from "./Home";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import LoginSignup from "./components/LoginSignup";
import {store, useStore} from './store';

const MainRoute = ({ user }) => {
  console.log(user);

  const [cart, setCart] = React.useState([]);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [size, setSize] = React.useState(10);

  const addToCart = () => {};

  const api = new Api(import.meta.env.VITE_API_BASE_URL, user);

  React.useEffect(() => {
    api.getCategories().then((res) => {
        store.categories = res.data;
    })
    .catch((error) => console.error('error'))
    api.getProducts({page, size})
    .then((res) => store.products = res.data.data);

  }, []);

  React.useEffect(() => {console.log('store', store)}, [store]);
  

  return (
    <Router>
      <Header
        cart={cart}
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
        setSearchQuery={setSearchQuery}
      />

      <main
        style={{
          filter: isLoginOpen ? "blur(3px)" : "none",
          pointerEvents: isLoginOpen ? "none" : "auto",
        }}
      >
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/menu"
            element={<Menu api={api} addToCart={addToCart} searchQuery={searchQuery} />}
          />
          <Route
            path="/cart"
            element={<Cart cartItems={cart} setCart={setCart} />}
          />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
        </Routes>
      </main>

      {isLoginOpen && (
        <LoginSignup isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
      )}
    </Router>
  );
};

export default MainRoute;
