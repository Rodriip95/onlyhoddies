import React, {useState, useContext} from "react";
import Minus from "../assets/icons/Minus";
import Plus from "../assets/icons/Plus";
import Trash from "../assets/icons/Trash";
import TShirt from "../assets/icons/TShirt";
import {AppContext} from '../context'
import Modal from "./Modal";
import ModalOption from "./ModalOption";

function ShoppingCart() {
  const {state: {cart, total, userData}} = useContext(AppContext)
  const [showModal, setShowModal] = useState(false)
  const [showModalOp, setShowModalOp] = useState(false)


  const handleCheckout = () => {
    if(cart.length == 0){
      return console.log("Cart empty");
    }
    if(!userData){
      setShowModalOp(true)
    }
    setShowModal(true)
  }

  return (
    <div className="px-4 lg:px-8 2xl:px-40 h-full">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mx-8 my-4">
        Shopping Cart
      </h2>
      <div className="flex flex-col-reverse items-center md:items-start md:flex-row md:justify-between">
          {cart.length > 0 ?
          <div className="md:w-2/3 w-full">
          {cart.map((item) => (
            <ItemCheck key={item.id} item={item}/>
          ))}
        </div>
          :
          <div className="md:w-2/3 w-full flex flex-row justify-center items-center">
              <h2 className="text-gray-400 text-6xl font-bold">Cart empty!</h2>
          </div>
          }
        
        <div className="md:w-1/3 w-full mb-4 md:mb-0 bg-gray-100 py-8 px-6 rounded-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Order summary</h2>
          <div className="flex justify-between py-4 border-b border-gray-300 mb-4">
          <p className="text-gray-600 font-normal text-md">Subtotal</p>
          <p className="text-gray-800 font-medium text-md">{"$"+Math.trunc(total)}</p>
          </div>
          <div className="w-full flex justify-center">
            <button
              onClick={handleCheckout}
              className="bg-indigo-600 hover:bg-indigo-700 w-full py-2 rounded-lg text-gray-100 font-bold"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      {showModal ?
      <Modal setShowModal={setShowModal}/>
      : null }
      {showModalOp ?
      <ModalOption setShowModal={setShowModalOp}/>
      : null }
    </div>
  );
}

export default ShoppingCart;

function ItemCheck({ item }) {
  const {dispatch} = useContext(AppContext)
  return (
    <div className="border-t mx-8 py-8 flex flex-row justify-between">
      <div className="w-1/5">
        <img
          className="border p-2 w-full rounded-md"
          src={item.pictures[0].url}
          alt={item.thumbnail_id}
        />
      </div>
      <div className="w-3/5 px-8">
        <div className="flex flex-col justify-between h-full items-start">
          <div>
            <h3 className="mb-4 text-gray-800 font-medium text-lg">
              {item.title}
            </h3>
            <p className="font-bold text-gray-800 text-lg">
              <span className="text-base font-medium text-gray-400">
                {"Size: "}
              </span>
              {item.sizeCheck}
            </p>
          </div>
          <p className="font-bold text-gray-800 text-lg">
            <span className="text-base font-medium text-gray-400">
              {"Price: "}
            </span>
            {"$"+Math.trunc(item.price)}
          </p>
        </div>
      </div>
      <div className="w-1/5 flex justify-end items-start">
        <div className="flex flex-col justify-between items-center h-full">
          <button onClick={()=>dispatch({type: 'REMOVE_CART', payload: item})}><Trash/></button>
          <div className="flex items-end">
            <TShirt/>
            <span className="font-bold text-indigo-600">x{item.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
