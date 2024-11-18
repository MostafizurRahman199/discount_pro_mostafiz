import { createBrowserRouter } from "react-router-dom";



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
                element: <Home />,
            },
            
           
            {
                path: "/register",
                element: <Register />,
            },
           
            {
                path: "/brands",
                element: <Brands />,
                loader: () => fetch('/brands.json'),
            },
            {
                path: "/brands/:id",
                element: (
                    <PrivateRoute>
                        <BrandDetails />
                    </PrivateRoute>
                ),
            },
            {
                path: "/brands",
                element: <Brands />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/forgot-password",
                element: <ForgetPassword/>,
            },
            {
                path: "/my-profile",
               element: (
                <PrivateRoute>
                    <Profile />
                </PrivateRoute>
               ),
            },
            {
                path: "/update-profile",
               element: (
                <PrivateRoute>
                    <UpdateProfile />
                </PrivateRoute>
               ),
            },
            {
                path: "*",
                element: <ErrorPage />,
            },
            
           
        ],
    },
  
]);

export default router;