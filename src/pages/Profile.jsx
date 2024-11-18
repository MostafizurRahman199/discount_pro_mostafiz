import React from 'react';
import { useFirebaseAuth } from '../Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const getProfileImage = (user) => {
  return user?.photoURL || 
         user?.providerData?.[0]?.photoURL || 
         'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
};

const Profile = () => {
    const { user } = useFirebaseAuth();
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        navigate('/update-profile');
    };

    return (
        <div className="min-h-screen pt-20 px-4 my-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
                <div className="flex flex-col items-center">
                    <img
                        src={getProfileImage(user)}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover mb-4"
                        onError={(e) => {
                            e.target.src = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
                            e.target.onerror = null;
                        }}
                    />
                    <h1 className="text-2xl font-bold mb-2">{user?.displayName}</h1>
                    <p className="text-gray-600 mb-4">{user?.email}</p>
                    
                   
                    <button
                        onClick={handleUpdateClick}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile; 