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
            
           
        ],
    },
  
]);

export default router;