import React, { useEffect, useState } from "react";
import { getHoddies, getHoddiesThen } from "../api";
import Footer from "../components/Footer";
import NavbarUI from "../components/NavbarUI";
import ProductList from "../components/ProductList";

function HomeScreen() {
  const [state, setState] = useState(null);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = () => {
    getHoddies().then((res) => {
      setState(res.results);
    });
  };

  return (
    <div>
      <NavbarUI />
      <div className="h-80 bg-indigo-700 flex flex-col items-center justify-center">
        
          <h1 className="md:text-8xl text-6xl px-2 pt-1 font-principal font-extrabold text-white">
            Only fans of
          </h1>
          <h1 className="md:text-8xl text-6xl px-2 pt-1 font-principal font-extrabold text-white">
            the Hoddies
          </h1>
        
      </div>
      {state && <ProductList products={state} />}
      <Footer/>
    </div>
  );
}

export default HomeScreen;
