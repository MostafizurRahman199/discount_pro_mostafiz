import React, { useState } from 'react';
import { useFirebaseAuth } from '../Auth/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
    const { user, setUser } = useFirebaseAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        displayName: user?.displayName || '',
        photoURL: user?.photoURL || ''
    });

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(user, {
                displayName: formData.displayName,
                photoURL: formData.photoURL
            });
            
            setUser({
                ...user,
                displayName: formData.displayName,
                photoURL: formData.photoURL
            });

            toast.success('Profile updated successfully');
            navigate('/my-profile');
        } catch (error) {
            toast.error('Failed to update profile');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen pt-20 px-4 my-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 " data-aos='zoom-in-left'> 
                <h2 className="text-xl font-bold mb-4 text-[#FED12D]">Update Profile</h2>
                <form onSubmit={handleUpdate}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Display Name</label>
                        <input
                            type="text"
                            value={formData.displayName}
                            onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#BD9FF5]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Photo URL</label>
                        <input
                            type="url"
                            value={formData.photoURL}
                            onChange={(e) => setFormData({...formData, photoURL: e.target.value})}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#BD9FF5]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#BD9FF5]  hover:bg-[#FED12D] px-8 py-3 rounded-3xl text-white font-semibold transition-transform hover:scale-105 shadow-2xl"
                    >
                        Update Information
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile; 