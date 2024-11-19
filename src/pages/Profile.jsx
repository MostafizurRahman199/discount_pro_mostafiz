import React, { useEffect } from 'react';
import { useFirebaseAuth } from '../Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import welcomeImage from '../assets/welcomeCover.png';
import profileBg from '../assets/profileBg2.png';

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
        // <div className={`min-h-screen bg-contain bg-center no-repeat     bg-url(${profileBg})` } style={{
        //     backgroundImage: `url(${profileBg})`,
        //     backgroundBlendMode: 'multiply',
        //     backgroundColor: 'rgba(0, 0, 0, 0.8)',
        //     backgroundSize: 'cover',
        //     backgroundPosition: 'center',
        //     backgroundRepeat: 'no-repeat',
        // }}>

        <div className={`min-h-screen bg-gradient-to-r from-[#8f5bf6] to-[#a77dfa]` } >
           
       
            <div className="md:pt-2 px-4 min-h-screen w-full flex flex-col justify-center items-center gap-2">
               <div className='flex flex-col items-center justify-center gap-2' data-aos='zoom-in'>
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center ">Welcome To Your Profile<br /> 
                </h1>
                <p className='text-white text-center'>Manage your profile and updates effortlessly</p>
               </div>
                <div className="w-full sm:w-8/12 lg:w-5/12 mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-4" data-aos="zoom-in">
                    <div className="flex flex-col items-center">
                        <div className="w-fit rounded-full p-1 bg-gradient-to-r from-[#FED12D] to-[#9d73f3]" data-aos="zoom-in">
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

                        <h1 className="text-2xl font-bold mb-2 text-[#9d73f3]">{user?.displayName}</h1>
                        <p className="text-gray-600 mb-4">{user?.email}</p>

                        <button
                            onClick={handleUpdateClick}
                            className="bg-[#9d73f3] hover:bg-[#FED12D] px-8 py-3 rounded-3xl text-white font-semibold transition-transform hover:scale-105 shadow-2xl"
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