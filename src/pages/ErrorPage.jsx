import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Tailwind CSS classes are used for styling
const ErrorPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#BD9FF5] to-[#FED12D]">
      <div className="md:w-96 text-center p-8 bg-white rounded-lg shadow-lg" data-aos="fade-up">
        <h1 className="text-4xl font-bold text-[#BD9FF5] mb-4" data-aos="zoom-in">Oops!</h1>
        <p className="text-lg text-gray-700 mb-6" data-aos="fade-in">
         This page is not found.
        </p>
      <div className='flex justify-center gap-4'>
      
        <button onClick={() => navigate("/")} className="px-4 py-2 bg-[#FED12D] text-white rounded-2xl hover:bg-[#BD9FF5]  duration-300 transition-transform hover:scale-105 shadow-2xl">
          Go Home
        </button>
      </div>
      </div>
    </div>
  )
}

export default ErrorPage