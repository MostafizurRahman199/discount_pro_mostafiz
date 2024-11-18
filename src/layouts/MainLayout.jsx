import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MainLayout = () => {
  return (
    <div className='font-poppins'>
      <ToastContainer />
      <Navbar />
    
      <Outlet />
    
      <Footer />
    </div>
  )
}

export default MainLayout