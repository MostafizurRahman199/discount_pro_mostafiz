import { createBrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

import Register from "../pages/Register";
import Login from "../pages/Login";

import ForgetPassword from "../pages/ForgetPassword";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/Home/Home";
import Profile from "../pages/Profile";
import Brands from "../pages/Brands";
import BrandDetails from "../pages/BrandDetails";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "../pages/UpdateProfile";
import ErrorPage from "../pages/ErrorPage";
import About from "../pages/About";

const router = createBrowserRouter([    
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: (
                    <>
                        <Helmet>
                            <title>Discount PRO - Home</title>
                        </Helmet>
                        <Home />
                    </>
                ),
            },
            
           
            {
                path: "/register",
                element: (
                    <>
                        <Helmet>
                            <title>Discount PRO - Register</title>
                        </Helmet>
                        <Register />
                    </>
                ),
            },
           
            {
                path: "/brands",
                element: (
                    <>
                        <Helmet>
                            <title>Discount PRO - Brands</title>
                        </Helmet>
                        <Brands />
                    </>
                ),
                loader: () => fetch('/brands.json'),
            },
            {
                path: "/brands/:id",
                element: (
                    <>
                        <Helmet>
                            <title>Discount PRO - Brand Details</title>
                        </Helmet>
                        <PrivateRoute>
                            <BrandDetails />
                        </PrivateRoute>
                    </>
                ),
            },
            {
                path: "/brands",
                element: <Brands />,
            },
            {
                path: "/about",
                element: (
                    <>
                        <Helmet>
                            <title>Discount PRO - About</title>
                        </Helmet>
                        <About />
                    </>
                ),
            },
            {
                path: "/login",
                element: (
                    <>
                        <Helmet>
                            <title>Discount PRO - Login</title>
                        </Helmet>
                        <Login />
                    </>
                ),
            },
            {
                path: "/forgot-password",
                element: (
                    <>
                        <Helmet>
                            <title>Discount PRO - Forgot Password</title>
                        </Helmet>
                        <ForgetPassword />
                    </>
                ),
            },
            {
                path: "/my-profile",
                element: (
                    <>
                        <Helmet>
                            <title>Discount PRO - My Profile</title>
                        </Helmet>
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    </>
                ),
            },
            {
                path: "/update-profile",
                element: (
                    <>
                        <Helmet>
                            <title>Discount PRO - Update Profile</title>
                        </Helmet>
                        <PrivateRoute>
                            <UpdateProfile />
                        </PrivateRoute>
                    </>
                ),
            },
            {
                path: "*",
                element: (
                    <>
                        <Helmet>
                            <title>Discount PRO - Error</title>
                        </Helmet>
                        <ErrorPage />
                    </>
                ),
            },
            
           
        ],
    },
  
]);

export default router;