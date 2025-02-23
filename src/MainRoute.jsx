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
import Profile from "./components/Profile";

const MainRoute = ({ user }) => {

  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [size, setSize] = React.useState(10);
  const [isReady, setIsReady] = React.useState(false);

  

  const api = new Api(import.meta.env.VITE_API_BASE_URL, user);

  React.useEffect(() => {

    const requests = [
      api.getProducts({page, size}),
      api.getCategories(),
      api.getPaymentMethods({})];

    if(user && user !== null) {
      requests.push(api.getMe());
      requests.push(api.getCart());

    }

    const getResponses = async () => {
      try {
        const responses = await Promise.all(requests);
        console.log("🚀 ~ getResponses ~ responses:", responses)
        store.products = responses[0].data.data;
        store.categories = responses[1].data;
        store.paymentMethods = responses[2].data.data;
      if(responses.length >= 5) {
        store.me = responses[3].data;
        store.cart = responses[4].data;
      }
      setIsReady(true);
      } catch (error) {
        console.error('error', error);
      }
    }
    getResponses();

  }, []);

  React.useEffect(() => {console.info('store', store)}, [store, store.cart, store.me]);

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

  const removeFromCart = (props) => {
    const {productId} = props;
    api.removeFromCart({productId}).then((res) => store.cart = res.data)
    .catch ((error) => {
      console.error('remove from cart error', error);
    })
  }

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
        onUpdateQuantity={addToCart}
        onRemoveItem={removeFromCart}
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
            element={<Cart cartItems={store.cart ? store.cart.cartItems: []} setCart={setCart} onRemoveItem={removeFromCart} onUpdateQuantity={addToCart} />}
          />
          <Route path="/checkout" element={<Checkout cart={store.cart} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>)}
      </main>

      {isLoginOpen && (
        <LoginSignup isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
      )}
    </Router>
  );
};

export default MainRoute;
