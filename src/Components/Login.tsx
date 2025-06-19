import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import project from '../assets/project.png';

interface LoginProps {
    isOpen: boolean;
    onClose: () => void;
    onSignupClick: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose, onSignupClick }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
        setIsLoading(true);
        setLoginError('');

        try {
            const response = await axios.post('https://kangalos-intern.onrender.com/user/login', 
                { email, password },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if (response.status === 200) {
                onClose(); // Close the modal before navigation
                navigate('/student/');
            } else {
                throw new Error(response.data.message || 'Login failed');
            }
        } catch (error) {
            let errorMessage = 'Login failed. Please try again.';
            
            if (axios.isAxiosError(error)) {
                switch (error.response?.status) {
                    case 400:
                        errorMessage = 'Invalid credentials.';
                        break;
                    case 401:
                        errorMessage = 'Invalid credentials';
                        break;
                    case 404:
                        errorMessage = 'User not found';
                        break;
                    case 500:
                        errorMessage = 'Server error. Please try later';
                        break;
                }
            }
            
            setLoginError(errorMessage);
            setTimeout(() => setLoginError(''), 4000);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Semi-transparent backdrop */}
            <div 
                className="fixed inset-0 bg-black/75 transition-opacity duration-300" 
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 sm:p-8 mx-auto transform transition-all duration-300">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                        <IoClose size={24} />
                    </button>

                    <div className="w-full">
                        <div className="text-center space-y-2 mb-8">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                FYPMS
                            </h1>
                            <h2 className="text-2xl font-semibold text-gray-800">Welcome back!</h2>
                            <p className="text-gray-500 text-sm">Sign in to access your FYPMS account</p>
                        </div>

                        {loginError && (
                            <div className="p-4 rounded-lg bg-red-50 border border-red-100 text-center text-red-700 text-sm mb-6 animate-fade-in">
                                {loginError}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="youremail@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10 transition-all duration-300 group-hover:border-blue-400"
                                        required
                                    />
                                    <MdOutlineEmail 
                                        size={20} 
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative group">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10 pr-10 transition-all duration-300 group-hover:border-blue-400"
                                        required
                                        minLength={5}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-300"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-end">
                                <button 
                                    type="button"
                                    onClick={() => {
                                        onClose();
                                        navigate('/forgot-password');
                                    }}
                                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-300 hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-2.5 px-4 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                                    isLoading 
                                        ? 'bg-blue-400 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
                                }`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </div>
                                ) : 'Sign In'}
                            </button>

                            <div className="text-center space-y-3">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            onClose();
                                            onSignupClick();
                                        }}
                                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300 hover:underline"
                                    >
                                        Sign Up
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;