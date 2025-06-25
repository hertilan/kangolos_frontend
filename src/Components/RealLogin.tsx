import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { IoClose } from 'react-icons/io5';
import Forget from './Forget';
interface showLogin{
    onClose: ()=> void
    showSignup: ()=>void
}

const Login: React.FC <showLogin>= ({onClose,showSignup}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [forgeting, setForgeting] = useState<boolean>(false)

const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setLoginError('');

    fetch('https://kangalos-intern-1.onrender.com/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    })
    .then(async (response) => {
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.Message || data.message || 'Login failed');
        }

        if (!data.token) {
            throw new Error('Authentication token missing');
        }

        return data;
    })
    .then(data => {
        localStorage.setItem('authToken', data.token);

        // Decode the token properly
        const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
        localStorage.setItem('user', JSON.stringify(decodedToken));
        
        // Use the decoded token for navigation
        const userRole = decodedToken.role;
        
        // Role-based navigation
        const roleRoutes: Record<string, string> = {
            STUDENT: '/student/',
            ADMIN: '/admin/',
            HOD: '/hod/',
            DEAN: '/dean/',
            PRINCIPAL: '/principal/',
            SUPERVISOR: '/supervisor/'
        };

        navigate(roleRoutes[userRole] || '/student/');
    })
    .catch(error => {
        let errorMessage = 'Login failed. Please try again.';
        
        if (error.message.includes('Invalid credentials')) {
            errorMessage = 'Invalid email or password';
        } else if (error.message.includes('User not found')) {
            errorMessage = 'No account found with this email';
        } else if (error.message === 'Authentication token missing') {
            errorMessage = 'Login service temporarily unavailable';
        } else if (error.message.includes('Unknown user role')) {
            errorMessage = 'Your account type cannot access this system';
        }

        setLoginError(errorMessage);
    })
    .finally(() => {
        setIsLoading(false);
    });
};


    return (
        <>
        {forgeting && (
          <div className='w-full h-full'>
            <div className="fixed inset-0 bg-gray-500/30 bg-opacity-50 z-40"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
                <Forget onClose={()=>{
                    setForgeting(false)
                }}/>
              </div>
            </div>
          </div>
        )}
        :
        <div className={`${forgeting ? 'hidden' :'grid'} grid-cols-1  p-3 h-fit`}>
            
            {/* Form Section */}
            <div className='flex items-center justify-center p-6 lg:px-20 pt-2 bg-white rounded-lg'>
                <div className='w-full max-w-md'>
                    <form onSubmit={handleLogin} className='space-y-6 grid'>
                        <IoClose size={30} onClick={onClose} className='flex self-end right-0 justify-self-end cursor-pointer hover:text-red-400 transition-colors duration-200 ease-in-out'/>
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
                                    name='email'
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
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter your password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10 pr-10'
                                    required
                                    minLength={5}
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
                            <button onClick={()=>{
                                setForgeting(true)
                            }}
                                className='text-sm text-[#2C4FFF] hover:underline'
                            >
                                Forget password?
                            </button>
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
                            <button 
                            onClick={showSignup}
                                className='text-[#2C4FFF] hover:underline font-medium'
                            >
                                Sign Up
                            </button>
                        </div>

                        <div className='text-center'>
                        </div>
                    </form>
                </div>
            </div>





        </div>
        </>
    );
};

export default Login;