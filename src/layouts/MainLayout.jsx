import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFirebaseAuth } from "../Auth/AuthProvider";
import { FaSpinner } from "react-icons/fa";

const MainLayout = () => {
  const { user, loading } = useFirebaseAuth();
  return (
    <div className="font-poppins">
      <ToastContainer />

      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <FaSpinner className="animate-spin text-4xl text-[#BD9FF5]" />
        </div>
      ) : (
        <>
        <Navbar />
          <div className={`${user ? "pt-24" : "pt-16"}`}>
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default MainLayout;
