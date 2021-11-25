import React from 'react'
import Footer from '../components/Footer'
//nan
import NavbarUI from '../components/NavbarUI'
import ShoppingCart from '../components/ShoppingCart'

function CheckingScreen({cart, total, deleteCart}) {
    return (
        <div className="flex flex-col justify-between md:min-h-screen">
            <NavbarUI/>
            <ShoppingCart cart={cart} total={total} deleteCart={deleteCart}/>
            <Footer/>
        </div>
    )
}

export default CheckingScreen
