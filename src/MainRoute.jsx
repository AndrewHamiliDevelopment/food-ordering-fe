import { Api } from "./api";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { firebaseSignInWithEmailAndPassword } from "./shared";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import LoginSignup from "./components/LoginSignup";
import {store, useStore} from './store';
import {each} from 'lodash';

const MainRoute = ({ user }) => {

  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [size, setSize] = React.useState(10);
  const [isReady, setIsReady] = React.useState(false);

  

  const api = new Api(import.meta.env.VITE_API_BASE_URL, user);

  React.useEffect(() => {

    console.log("🚀 ~ MainRoute: user", user);

    const requests = [api.getProducts({page, size}), api.getCategories()];

    if(user && user !== null) {
      requests.push(api.getCart())
    }

    const getResponses = async () => {
      const responses = await Promise.all(requests);
      store.products = responses[0].data.data;
      store.categories = responses[1].data;
      if(responses.length >= 3) {
        store.cart = responses[2].data;
      }
      setIsReady(true);
    }

    console.log("🚀 ~ React.useEffect ~ requests:", requests)
    
    getResponses();

  }, []);

  const setCart = (props) => {
    const {productId} = props;
    api.addToCart({productId})
    .then((res) => store.cart = res.data)
    .catch((error) => {
      console.error('Add to cart Error', error);
    })
  }

  const addToCart = (props) => {
    const {productId} = props;

    setCart({productId});
  };

  const checkIfIsLoginShouldOpen = () => {
    if(!user) {
      setIsLoginOpen(true);
    } else {
      if(user === null) {
        setIsLoginOpen(true);
      }
    }
    window.alert(`Hello ${user.email}, this function is not yet implemented, coming soon!`);
  }
  

  return (
    <Router>
      <Header
        cart={store.cart}
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={() => checkIfIsLoginShouldOpen()}
        setSearchQuery={setSearchQuery}
        api={api}
        setCart={setCart}
      />

      <main
        style={{
          filter: isLoginOpen ? "blur(3px)" : "none",
          pointerEvents: isLoginOpen ? "none" : "auto",
        }}
      >
        {isReady && (<Routes>
          <Route path="/" element={<Home />} />
          <Route path="Home" element={<Navigate to="/" />} />
          <Route
            path="/menu"
            element={<Menu addToCart={addToCart} searchQuery={searchQuery} />}
          />
          <Route
            path="/cart"
            element={<Cart cartItems={store.cart ? store.cart.cartItems: []} setCart={setCart} />}
          />
          <Route path="/checkout" element={<Checkout cart={store.cart} />} />
        </Routes>)}
      </main>

      {isLoginOpen && (
        <LoginSignup isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
      )}
    </Router>
  );
};

export default MainRoute;
