import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFirebaseAuth } from '../Auth/AuthProvider';

import { FcGoogle } from 'react-icons/fc'; 
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Aos from 'aos';
import { useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, googleSignIn } = useFirebaseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);


  const showError = (error) => {
    if(error.code === 'auth/invalid-credential'){
      toast.error('Invalid credentials');
    }
    else if(error.code === 'auth/user-not-found'){
      toast.error('User not found');
    }
    else if(error.code === 'auth/wrong-password'){
      toast.error('Wrong password');
    }
    else if(error.code === 'auth/invalid-email'){
      toast.error('Invalid email');
    }
    else if(error.code === 'auth/too-many-requests'){
      toast.error('Too many requests');
    }
    else if(error.code === 'auth/email-already-in-use'){
      toast.error('Email already in use');
    }
    else{
      toast.error("Something went wrong");
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      toast.success('Successfully logged in!');
      navigate(from, { replace: true });
    } catch (error) {
      showError(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      toast.success('Successfully logged in with Google!');
      navigate(from, { replace: true });
    } catch (error) {
      showError(error);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password', { state: { email } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 sm:shadow-lg shadow-[#9d73f3] p-8  rounded-2xl" data-aos="zoom-in">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#9d73f3]">
            Login to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#9d73f3] focus:border-[#9d73f3] focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#9d73f3] focus:border-[#9d73f3] sm:text-sm pr-10"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                    <FaEye className="h-5 w-5 text-gray-400" />
                ) : (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                onClick={handleForgotPassword}
                className="font-medium text-[#9d73f3] hover:text-[#FED12D]"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center  border border-transparent text-sm  bg-[#9d73f3] hover:bg-[#FED12D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9d73f3] px-8 py-3 rounded-md text-white font-bold transition-transform hover:scale-105 shadow-2xl"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FcGoogle className="h-5 w-5 mr-2" />
            Continue with Google
          </button>
        </div>

        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-[#9d73f3] hover:text-[#FED12D]">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;