import React, { useEffect } from 'react';
import { useFirebaseAuth } from '../Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import welcomeImage from '../assets/welcomeCover.png';

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
        <div className="min-h-screen bg-cover bg-center no-repeat" style={{ backgroundImage: `url(${welcomeImage})`}}>
           
           <div className="text-center pt-40 md:pt-40" data-aos="zoom-in">
              <h1 className="text-4xl font-bold text-[#BD9FF5]">To Your Profile</h1>
            </div>
            <div className="md:pt-2 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8   md:mt-12" data-aos="zoom-in">
                    <div className="flex flex-col items-center">
                        <div className="w-fit rounded-full p-1 bg-gradient-to-r from-[#FED12D] to-[#BD9FF5]" data-aos="zoom-in">
                            <img
                                src={getProfileImage(user)}
                                alt="Profile"
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white"
                                onError={(e) => {
                                    e.target.src = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
                                    e.target.onerror = null;
                                }}
                            />
                        </div>

                        <h1 className="text-2xl font-bold mb-2 text-[#BD9FF5]">{user?.displayName}</h1>
                        <p className="text-gray-600 mb-4">{user?.email}</p>

                        <button
                            onClick={handleUpdateClick}
                            className="bg-[#BD9FF5] hover:bg-[#FED12D] px-8 py-3 rounded-3xl text-white font-semibold transition-transform hover:scale-105 shadow-2xl"
                        >
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 