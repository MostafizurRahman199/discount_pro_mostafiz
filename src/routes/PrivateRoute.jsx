import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebaseAuth } from '../Auth/AuthProvider';


const PrivateRoute = ({ children }) => {
 
    const navigate = useNavigate();
    const { user, loading } = useFirebaseAuth();


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#BD9FF5]"></div>
          </div>
        ); 
    }

    if (!user) {
        navigate('/login');
        return null;
    }

    return <>{children}</>; 
};

export default PrivateRoute;