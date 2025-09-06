import React from 'react'
import Header from './Header'
import Navbar1 from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Layout() {
    return (
        <>
            <Header />
            <Navbar1 />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout