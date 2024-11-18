import React, { useEffect } from 'react';
import { useFirebaseAuth } from '../Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';

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


    useEffect(() => {
        Aos.init({ duration: 1000 });
      }, []);
    

    return (
        <div className="min-h-screen pt-20 px-4 my-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8" data-aos="zoom-in">
                <div className="flex flex-col items-center">
                    <div className="w-fit rounded-full p-1 bg-gradient-to-r from-[#FED12D] to-[#BD9FF5]" data-aos="zoom-in">
                        <img
                            src={getProfileImage(user)}
                            alt="Profile"
                            className="max-w-24 max-h-24 rounded-full object-cover border-4 border-white"
                            onError={(e) => {
                                e.target.src = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
                                e.target.onerror = null;
                            }}
                        />
                    </div>

                    <h1 className="text-2xl font-bold mb-2 text-[#BD9FF5]" data-aos="zoom-in">{user?.displayName}</h1>
                    <p className="text-gray-600 mb-4" data-aos="zoom-in">{user?.email}</p>
                    
                    <button
                        onClick={handleUpdateClick}
                        className="bg-[#FED12D] hover:bg-[#BD9FF5] px-8 py-3 rounded-3xl text-white font-semibold transition-transform hover:scale-105 shadow-2xl"
                        data-aos="zoom-in"
                    >
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile; 