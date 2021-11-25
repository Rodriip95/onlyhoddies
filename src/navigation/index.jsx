import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CheckingScreen from "../pages/CheckingScreen";
import HomeScreen from "../pages/HomeScreen";
import ItemDetailScreen from "../pages/ItemDetailScreen";
import LoginScreen from "../pages/LoginScreen";
import NoMatch from "../pages/NoMatch";
import RegisterScreen from "../pages/RegisterScreen";
import AppContext from "../context";

function Navigation() {
  const [cart, setCart] = useState([]);
  const [total, settotal] = useState(0);

  const addToCart = (item) => {
    settotal(total + item.price);
    setCart([...cart, item]);
  };

  const deleteCart = (product) => {
    let arrFilter = cart.filter((item) => item.id !== product.id);
    settotal(total - product.price);
    setCart(arrFilter);
  };

  const [state, setstate] = useState(null);

  useEffect(() => {
    let sectionStorage = localStorage.getItem("DATA_LOGIN");
    if (sectionStorage) {
      setstate(JSON.parse(sectionStorage));
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/item/:id">
          <ItemDetailScreen addToCart={addToCart} />
        </Route>
        <Route path="/register">
          <RegisterScreen />
        </Route>
        <Route path="/checkout">
          <CheckingScreen cart={cart} total={total} deleteCart={deleteCart} />
        </Route>
        {state?.admin && (
          <Route path="/dashboard">
            <h1>Dashboard in progress</h1>
          </Route>
        )}
        <Route path="/login">
          <LoginScreen />
        </Route>
        <Route exact path="/">
          <HomeScreen />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default Navigation;
