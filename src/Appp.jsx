import React, { Component } from "react";
import firebase from 'firebase/app';
import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider,
} from "@react-firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { Api } from "./api";
import MainRoute from './MainRoute'

class Appp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      isLoginOpen: false,
      searchQuery: "",
      user: null,
    };
    this.addToCart = this.addToCart.bind(this);
  }

  //api = new Api(import.meta.env.VITE_API_BASE_URL, this.state.user);

  addToCart(item) {
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
  }

  render() {
    const firebaseAppArgs = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
      databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
      firebase: firebase,
    };
    return (
      <FirebaseAuthProvider {...firebaseAppArgs}>
        <FirebaseAuthConsumer>
          {(ae) => (
              <>
                {ae.providerId ? (<MainRoute user={ae.user} />): (<p>Loading...</p>)}
              </>
            )}
        </FirebaseAuthConsumer>
      </FirebaseAuthProvider>
    );
  }
}

export default Appp;
