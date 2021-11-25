import React from 'react'
import Footer from '../components/Footer'
import ItemDetail from '../components/ItemDetail'
//nan
import NavbarUI from '../components/NavbarUI'

function ItemDetailScreen({addToCart}) {
    return (
        <div>
            <NavbarUI/>
            <ItemDetail addToCart={addToCart}/>
            <Footer/>
        </div>
    )
}

export default ItemDetailScreen
