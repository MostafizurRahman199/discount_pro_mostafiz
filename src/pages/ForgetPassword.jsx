import React, { useState, useEffect } from 'react';
import { useFirebaseAuth } from '../Auth/AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import Aos from 'aos';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { resetPassword, logOut } = useFirebaseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);

  // Pre-fill email if passed from login page
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);


  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      await logOut(); // Log out the user
      window.location.href = 'https://mail.google.com'; // Redirect to Gmail
    //   toast.success('Password reset email sent!');
    } catch (error) {
      toast.error('Failed to send password reset email');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 sm:shadow-lg shadow-[#BD9FF5] p-8 rounded-2xl" data-aos="fade-up">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#BD9FF5]">
          Reset Password
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#BD9FF5] focus:border-[#BD9FF5] focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className='flex flex-col justify-between items-center gap-4 '>
            <button
              onClick={handleResetPassword}
            //   type="submit"
              className="group relative w-full flex justify-center border border-transparent text-sm bg-[#BD9FF5] hover:bg-[#FED12D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BD9FF5] px-8 py-3 rounded-md text-white font-bold transition-transform hover:scale-105 shadow-2xl"
            >
              Reset Password
            </button>
            <button
              onClick={() => navigate('/login')}
            //   type="submit"
              className="group relative w-full flex justify-center border border-transparent text-sm bg-[#BD9FF5] hover:bg-[#FED12D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BD9FF5] px-8 py-3 rounded-md text-white font-bold transition-transform hover:scale-105 shadow-2xl"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;