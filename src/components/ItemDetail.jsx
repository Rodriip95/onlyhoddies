import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { getHoddieById, getHoddieByIdDescription } from "../api";
import Right from "../assets/icons/Right";
import Left from "../assets/icons/Left";
import Spin from "../assets/icons/Spin";
import ButtonSizes from "./ButtonSizes";

//Toast
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "../context";
import Minus from "../assets/icons/Minus";
import Plus from "../assets/icons/Plus";

function ItemDetail({ addToCart }) {
  const [state, setState] = useState(null);
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [select, setSelect] = useState("");
  const [flag, setflag] = useState(false);
  const [spinner, setSpin] = useState(false);
  const { id } = useParams();
  const { dispatch } = useContext(AppContext);
  const navigation = useHistory()

  useEffect(() => {
    window.scroll(0,0)
    getResults(id);
    getDescription(id);
  }, []);

  const getResults = (id) => {
    getHoddieById(id).then((res) => {
      console.log(res);
      setState(res);
    });
  };

  const getDescription = (id) => {
    getHoddieByIdDescription(id).then((res) => {
      setDescription(res.plain_text);
    });
  };


  const handlerAddToCart = () => {
    setSpin(true);
    if (select === "") {
      setSpin(false);
      return setflag(true);
    }
    let itemSelected = { ...state, sizeCheck: select, quantity: quantity };
    notify();
    dispatch({ type: "ADD_TO_CART", payload: itemSelected });
    // addToCart(itemSelected);
    setTimeout(() => {
      setSpin(false);
      navigation.push("/checkout");
    }, 1000);
    setflag(false);
  };

  const notify = () => {
    toast.success("👕 In cart!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (!state)
    return (
      <div className="w-full h-screen flex flex-row text-center justify-center items-center">
        <h2 className="text-gray-400 text-4xl font-medium">Loading...</h2>
      </div>
    );

  return (
    <div className="w-11/12 mx-auto overflow-hidden border border-gray-300 rounded-lg mb-8">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-col lg:flex-row justify-center">
        <div className="w-full bg-gray-300 lg:p-4 py-4">
          <h1 className="font-medium text-lg text-gray-800 w-full px-8 mb-4 lg:hidden">
            {state.title}
          </h1>
          <div className="flex flex-row justify-between mb-6">
            <button
              onClick={() => {
                if (count > 0) {
                  setCount(count - 1);
                }
              }}
            >
              <Left />
            </button>
            <img
              className="rounded-lg mx-auto w-10/12 md:w-full"
              src={state.pictures[count].secure_url}
              alt={state.pictures[count].id}
            />
            <button
              onClick={() => {
                if (count < 3) {
                  setCount(count + 1);
                }
              }}
            >
              <Right />
            </button>
          </div>

          <div className="flex flex-row justify-center">
            {state.pictures.map((photo, index) => {
              if (index < 4) {
                return (
                  <div
                    key={photo.id}
                    className="mx-2"
                    onClick={() => setCount(index)}
                  >
                    <img
                      className="rounded-lg"
                      src={photo.secure_url}
                      alt={photo.id}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="w-full p-4">
          <div className="flex flex-row justify-between items-center mb-4">
            <h1 className="font-medium text-lg text-gray-800 w-10/12 hidden lg:block">
              {state.title}
            </h1>
            <h1 className="font-medium text-xl text-gray-800 md:w-2/12">
              {"$ " + Math.trunc(state.price)}
            </h1>
          </div>
          <span className="text-sm text-gray-400">
            {state.id}
          </span>
          <h2 className="text-gray-700 font-bold mb-2">Size</h2>
          <div className="flex flex-row justify-between mb-1">
            <ButtonSizes
              size={"XXS"}
              active={select === "XXS" ? true : false}
              sizes=" w-full mr-2"
              handlerFunction={() => setSelect("XXS")}
              disabledOption
            />
            <ButtonSizes
              size={"XS"}
              active={select === "XS" ? true : false}
              sizes=" w-full mx-2"
              handlerFunction={() => setSelect("XS")}
            />
            <ButtonSizes
              size={"S"}
              active={select === "S" ? true : false}
              sizes=" w-full mx-2"
              handlerFunction={() => setSelect("S")}
            />
            <ButtonSizes
              size={"M"}
              active={select === "M" ? true : false}
              sizes=" w-full mx-2"
              handlerFunction={() => setSelect("M")}
            />
            <ButtonSizes
              size={"L"}
              active={select === "L" ? true : false}
              sizes=" w-full mx-2"
              handlerFunction={() => setSelect("L")}
            />
            <ButtonSizes
              size={"XL"}
              active={select === "XL" ? true : false}
              sizes=" w-full ml-2"
              handlerFunction={() => setSelect("XL")}
            />
          </div>
          <div className="flex flex-row justify-end mb-6">
            <p className="text-gray-600">{flag || !select ? "Select size" : ""}</p>
          </div>
          {select && 
          <div className="flex items-center justify-center mb-6">
            <button onClick={()=>{
              if (quantity > 1) {
                setQuantity(quantity - 1)
              }
            }}>
              <Minus/>
            </button>
            <span className="font-bold text-indigo-500 text-lg mx-2">{quantity}</span>
            <button onClick={()=>{
              if (quantity < 5) {
                setQuantity(quantity + 1)
              }
            }}>
              <Plus/>
            </button>
          </div>
          }
          <div className="w-full flex justify-center">
            <button
              onClick={handlerAddToCart}
              className="bg-indigo-600 hover:bg-indigo-700 w-full py-2 rounded-lg text-gray-100 font-bold h-12"
            >
              {spinner ? <Spin /> : "Add to cart"}
            </button>
          </div>
          <div className="my-8">
            <h2 className="text-gray-700 font-bold mb-4">Description</h2>
            <p className="text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
