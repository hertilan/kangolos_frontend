import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash, FaPhone, FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import project from '../assets/project.png';

interface FormValues {
  Fname: string;
  Lname: string;
  email: string;
  phone: string;
  password: string;
  confPassword: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [signupMessage, setSignupMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('error');

  const formik = useFormik<FormValues>({
    initialValues: {
      Fname: '',
      Lname: '',
      email: '',
      phone: '',
      password: '',
      confPassword: '',
    },
    validationSchema: Yup.object({
      Fname: Yup.string().required('First name is required'),
      Lname: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      phone: Yup.string().required('Phone number is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm your password'),
    }),
    onSubmit: async (values) => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.post(
          'https://api.yourservice.com/signup',
          values,
          { 
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true 
          }
        );

        setSignupMessage('Signup successful! Redirecting to login...');
        setMessageType('success');
        
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error: any) {
        let message = 'Signup failed. Please try again.';
        if (error.response) {
          if (error.response.status === 400) {
            message = 'Please check your input and try again.';
          } else if (error.response.status === 409) {
            message = 'Email already exists. Please login instead.';
          } else if (error.response.status === 500) {
            message = 'Server error. Please try again later.';
          }
        }
        setSignupMessage(message);
        setMessageType('error');
      }
    },
  });

  const getFieldIcon = (field: string) => {
    switch (field) {
      case 'email':
        return <MdOutlineEmail size={20} className='absolute top-9 right-3' />;
      case 'phone':
        return <FaPhone size={18} className='absolute top-9 right-3' />;
      case 'Fname':
      case 'Lname':
        return <FaRegUser size={20} className='absolute top-9 right-3' />;
      default:
        return null;
    }
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 w-screen h-screen'>
      <div 
        style={{ backgroundImage: `url(${project})` }} 
        className='hidden lg:block w-full h-full bg-cover bg-center'
      ></div>
      
      <div className='bg-white w-full h-full grid place-items-center px-4 py-8'>
        <form onSubmit={formik.handleSubmit} className='w-full max-w-md'>
          <h1 className='text-[#2C4FFF] text-3xl font-bold mb-4'>FYPMS</h1>
          
          {signupMessage && (
            <div className={`mb-4 p-3 rounded-md ${
              messageType === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {signupMessage}
            </div>
          )}

          <div className='grid gap-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {['Fname', 'Lname'].map((field) => (
                <div key={field} className='relative'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    {field === 'Fname' ? 'First Name' : 'Last Name'}
                  </label>
                  <input
                    type='text'
                    name={field}
                    placeholder={`Your ${field === 'Fname' ? 'first' : 'last'} name`}
                    value={formik.values[field]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  />
                  {getFieldIcon(field)}
                  {formik.touched[field] && formik.errors[field] && (
                    <p className='text-red-500 text-xs mt-1'>{formik.errors[field]}</p>
                  )}
                </div>
              ))}
            </div>

            <div className='relative'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
              <input
                type='email'
                name='email'
                placeholder='Your email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10'
              />
              {getFieldIcon('email')}
              {formik.touched.email && formik.errors.email && (
                <p className='text-red-500 text-xs mt-1'>{formik.errors.email}</p>
              )}
            </div>

            <div className='relative'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
              <input
                type='text'
                name='phone'
                placeholder='Your phone number'
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10'
              />
              {getFieldIcon('phone')}
              {formik.touched.phone && formik.errors.phone && (
                <p className='text-red-500 text-xs mt-1'>{formik.errors.phone}</p>
              )}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {['password', 'confPassword'].map((field) => (
                <div key={field} className='relative'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    {field === 'confPassword' ? 'Confirm Password' : 'Password'}
                  </label>
                  <input
                    type={
                      (field === 'password' && showPassword) || 
                      (field === 'confPassword' && showConfPassword) 
                        ? 'text' 
                        : 'password'
                    }
                    name={field}
                    placeholder={field === 'confPassword' ? 'Confirm password' : 'Create password'}
                    value={formik.values[field]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border px-4 py-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  />
                  <button 
                    type='button' 
                    onClick={() => 
                      field === 'password' 
                        ? setShowPassword(!showPassword) 
                        : setShowConfPassword(!showConfPassword)
                    } 
                    className='absolute top-9 right-3 text-gray-500 hover:text-gray-700'
                  >
                    {(field === 'password' ? showPassword : showConfPassword) 
                      ? <FaRegEye size={20} /> 
                      : <FaRegEyeSlash size={20} />}
                  </button>
                  {formik.touched[field] && formik.errors[field] && (
                    <p className='text-red-500 text-xs mt-1'>{formik.errors[field]}</p>
                  )}
                </div>
              ))}
            </div>

            <button 
              type='submit' 
              className='bg-[#2C4FFF] text-white py-2.5 w-full rounded-md mt-2 hover:bg-blue-700 transition-colors duration-300'
            >
              Sign Up
            </button>

            <div className='text-center'>
              <p className='text-sm'>
                Already have an account?{' '}
                <Link to='/login' className='text-[#2C4FFF] hover:text-blue-800 font-medium'>
                  Login
                </Link>
              </p>
              <Link 
                to='/' 
                className='text-sm text-gray-500 hover:text-gray-700 mt-2 inline-block'
              >
                Back to Home
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;