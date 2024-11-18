import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useFirebaseAuth } from '../Auth/AuthProvider';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { resetPassword } = useFirebaseAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await resetPassword(email);
            toast.success('Password reset email sent');
        } catch (error) {
            console.error(error);
            toast.error('Failed to send password reset email');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-md w-full space-y-8 sm:shadow-lg rounded-2xl p-10">
                <div>
                    <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
                        Reset your password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#BD9FF5] focus:border-[#BD9FF5] focus:z-10 sm:text-sm"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center  border border-transparent text-sm  bg-[#BD9FF5] hover:bg-[#FED12D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BD9FF5] px-8 py-3 rounded-md text-white font-bold transition-transform hover:scale-105 shadow-2xl"
                        >
                            {isLoading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </div>

                    <div className="text-sm text-center">
                        <Link
                            to="/login"
                            className="font-medium text-[#BD9FF5] hover:text-[#FED12D]"
                        >
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;