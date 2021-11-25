import React, { createContext, useEffect, useReducer, useState } from "react";

export const AppContext = createContext();

export const reducer = (state, action) => {
  if (action.type === "LOGIN") {
    let userData = action.payload;
    if (action.payload.uid === "3TEjdtlbXRfTWnKc9FoFZc640Ez2") {
      userData.admin = true;
    } else {
      userData.admin = false;
    }
    localStorage.setItem("DATA_LOGIN", JSON.stringify(userData));
    return {
      ...state,
      userData,
    };
  }
  if (action.type === "LOGOUT") {
    localStorage.removeItem("DATA_LOGIN");
    return {
      ...state,
      userData: null,
    };
  }

  if (action.type === "CART_STORAGE") {
    let total =
      action.payload.length > 0
        ? action.payload
            .map((item) => item.price * item.quantity)
            .reduce(
              (previousValue, currentValue) => previousValue + currentValue
            )
        : 0;
    return {
      ...state,
      cart: action.payload,
      total,
    };
  }
  if (action.type === "ADD_TO_CART") {
    let newItem = action.payload;
    let cart = [...state.cart, newItem];
    let total = state.total + Math.trunc(action.payload.price * action.payload.quantity);
    localStorage.setItem("CART_STORAGE", JSON.stringify(cart));
    return {
      ...state,
      cart,
      total,
    };
  }
  if (action.type === "REMOVE_CART") {
    let cart = state.cart.filter((item) => {
      console.log("Los id: ",item.id,action.payload.id);
      console.log("Los size: ",item.sizeCheck ,action.payload.sizeCheck);

      if (item.id !== action.payload.id) {
          return item
      } else {
        console.log("los id son iguales");
        if (item.sizeCheck !== action.payload.sizeCheck) {
          console.log("los size son distintos");
          return item
        }
      }
      console.log("Eliminado");
    });
    localStorage.setItem("CART_STORAGE", JSON.stringify(cart));
    let total = state.total - Math.trunc(action.payload.price * action.payload.quantity);
    return {
      ...state,
      cart : cart,
      total,
    };
  }
  if(action.type === "CLEAR_ALL"){
    return {
      ...state,
      total: 0,
      cart: []
    }
  }

  return state;
};

const initialState = {
  userData: null,
  cart: [],
  total: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let dataLogin = localStorage.getItem("DATA_LOGIN");
    if (dataLogin) {
      dispatch({ type: "LOGIN", payload: JSON.parse(dataLogin) });
    }
    let cartStorage = localStorage.getItem("CART_STORAGE");
    if (cartStorage) {
      dispatch({ type: "CART_STORAGE", payload: JSON.parse(cartStorage) });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
