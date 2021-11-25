import React from 'react'
import Footer from '../components/Footer'
//nan
import NavbarUI from '../components/NavbarUI'

function NoMatch() {
    return (
        <div>
            <NavbarUI/>
            <div className="w-full h-screen bg-gray-200 flex flex-col items-center justify-center text-center">
                <h1 className="text-indigo-600 text-9xl">404</h1>
                <h1 className="text-indigo-600 text-9xl">Not Found!</h1>
            </div>
            <Footer/>
        </div>
    )
}

export default NoMatch
