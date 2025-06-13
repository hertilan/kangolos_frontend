import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import axios from 'axios';
import project from '../assets/project.png';

const Login: React.FC = () => {
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
            const response = await axios.post('https://www.eric.com/api/login', 
                { email, password },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                // Store token or user data if needed
                navigate('/dashboard'); // Redirect to dashboard on success
            } else {
                throw new Error(response.data.message || 'Login failed');
            }
        } catch (error) {
            let errorMessage = 'Login failed. Please try again.';
            
            if (axios.isAxiosError(error)) {
                switch (error.response?.status) {
                    case 400:
                        errorMessage = 'Invalid email or password format';
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

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen'>
            {/* Image Section */}
            <div 
                className='hidden lg:block w-full h-full bg-cover bg-center bg-no-repeat'
                style={{ backgroundImage: `url(${project})` }}
                aria-label="Students working on projects"
            />
            
            {/* Form Section */}
            <div className='flex items-center justify-center p-6 bg-white'>
                <div className='w-full max-w-md'>
                    <form onSubmit={handleLogin} className='space-y-6'>
                        <div className='text-center'>
                            <h1 className='text-[#2C4FFF] text-3xl font-bold mb-2'>FYPMS</h1>
                            <h2 className='text-2xl font-semibold text-gray-900'>Welcome back</h2>
                            <p className='text-gray-500'>Sign in to access your FYPMS account</p>
                        </div>

                        {loginError && (
                            <div className={`p-3 rounded-md text-center ${
                                loginError.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {loginError}
                            </div>
                        )}

                        <div>
                            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                                Email
                            </label>
                            <div className='relative'>
                                <input
                                    id='email'
                                    type='email'
                                    placeholder='youremail@example.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10'
                                    required
                                />
                                <MdOutlineEmail 
                                    size={20} 
                                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                                Password
                            </label>
                            <div className='relative'>
                                <input
                                    id='password'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter your password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10 pr-10'
                                    required
                                    minLength={6}
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className='flex items-center justify-between'>
                            <Link 
                                to='/forgot-password' 
                                className='text-sm text-[#2C4FFF] hover:underline'
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type='submit'
                            disabled={isLoading}
                            className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                                isLoading 
                                    ? 'bg-blue-400 cursor-not-allowed' 
                                    : 'bg-[#2C4FFF] hover:bg-blue-700'
                            } transition-colors`}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>

                        <div className='text-center text-sm text-gray-600'>
                            Don't have an account?{' '}
                            <Link 
                                to='/signup' 
                                className='text-[#2C4FFF] hover:underline font-medium'
                            >
                                Sign Up
                            </Link>
                        </div>

                        <div className='text-center'>
                            <Link 
                                to='/' 
                                className='text-sm text-gray-500 hover:underline'
                            >
                                Back to home
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;