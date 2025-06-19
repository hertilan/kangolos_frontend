import React, { useState, ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash, FaPhone, FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import project from '../assets/project.png';
import Otp from './Otp';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: string;
  regnumber: string;
}

interface SignupProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick?: () => void;
}

type FormField = keyof Pick<FormValues, 'email' | 'phone' | 'firstName' | 'lastName'>;
type PasswordField = 'password' | 'confirmPassword';

const Signup: React.FC<SignupProps> = ({ isOpen, onClose, onLoginClick }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [apiStatus, setApiStatus] = useState({
    message: '',
    type: '' as 'success' | 'error' | ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      gender: '',
      regnumber: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      gender: Yup.string()
        .oneOf(['male', 'female', 'other'], 'Invalid gender')
        .required('Required'),
      regnumber: Yup.string()
        .matches(/^[A-Za-z0-9]{9}$/, 'Must be exactly 9 alphanumeric characters')
        .required('Required'),
      phone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
          'Must contain uppercase, lowercase, number, and special character'
        )
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required')
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setApiStatus({ message: '', type: '' });

      try {
        const response = await axios.post(
          'https://kangalos-intern.onrender.com/user/register',
          {
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            // phone: values.phone,
            password: values.password,
            gender: values.gender,
            reg_no: values.regnumber,
          },
          { 
            headers: { 'Content-Type': 'application/json' }
          }
        );

        setApiStatus({
          message: `Account created successfully!`,
          type: 'success'
        });
        
        setTimeout(() =>{ 
          setShowOtp(true)
          // navigate('/login')
        }, 2000);
        
      } catch (error: any) {
        let errorMessage = `Signup failed. Please try again.`;
        
        if (error.response) {
          switch (error.response.status) {
            case 400:
              errorMessage = `Invalid input data. Please check your information.`;
              break;
            case 409:
              errorMessage = `Email already exists. Please login instead.`;
              break;
            case 500:
              errorMessage = `Server error. Please try again later.`;
              break;
          }
        }

        setApiStatus({
          message: errorMessage,
          type: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    }
  });

  const togglePasswordVisibility = (field: PasswordField) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const renderFieldIcon = (field: FormField): ReactElement => {
    const icons: Record<FormField, ReactElement> = {
      email: <MdOutlineEmail className="text-gray-400" />,
      phone: <FaPhone className="text-gray-400" />,
      firstName: <FaRegUser className="text-gray-400" />,
      lastName: <FaRegUser className="text-gray-400" />
    };
    
    return icons[field];
  };

  const renderPasswordIcon = (field: PasswordField) => {
    return showPassword[field] ? (
      <FaRegEye className="text-gray-500" />
    ) : (
      <FaRegEyeSlash className="text-gray-500" />
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Semi-transparent backdrop */}
      <div className="fixed inset-0 bg-black/75 transition-opacity duration-300" onClick={onClose}></div>

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
              <h2 className="text-2xl font-semibold text-gray-800">Create your account</h2>
              <p className="text-gray-500 text-sm">Join FYPMS to manage your final year project</p>
            </div>

            {apiStatus.message && (
              <div className={`mb-6 p-4 rounded-lg text-sm ${
                apiStatus.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-100' 
                  : 'bg-red-50 text-red-800 border border-red-100'
              } animate-fade-in`}>
                {apiStatus.message}
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['firstName', 'lastName'].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                      {field === 'firstName' ? 'First Name' : 'Last Name'}
                    </label>
                    <div className="relative group">
                      <input
                        id={field}
                        name={field}
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values[field as keyof FormValues]}
                        className={`block w-full rounded-lg py-2.5 px-4 pl-10 border ${
                          formik.touched[field as keyof FormValues] && formik.errors[field as keyof FormValues]
                            ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                        } transition-all duration-300 group-hover:border-blue-400`}
                        placeholder={`Enter your ${field === 'firstName' ? 'first' : 'last'} name`}
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {renderFieldIcon(field as FormField)}
                      </div>
                      {formik.touched[field as keyof FormValues] && formik.errors[field as keyof FormValues] && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors[field as keyof FormValues]}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Email and Phone Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className={`block w-full rounded-lg py-2.5 px-4 pl-10 border ${
                        formik.touched.email && formik.errors.email
                          ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      } transition-all duration-300 group-hover:border-blue-400`}
                      placeholder="Enter your email"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {renderFieldIcon('email')}
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                      className={`block w-full rounded-lg py-2.5 px-4 pl-10 border ${
                        formik.touched.phone && formik.errors.phone
                          ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      } transition-all duration-300 group-hover:border-blue-400`}
                      placeholder="Enter your phone number"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {renderFieldIcon('phone')}
                    </div>
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Registration Number and Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="regnumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Number
                  </label>
                  <input
                    id="regnumber"
                    name="regnumber"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.regnumber}
                    className={`block w-full rounded-lg py-2.5 px-4 border ${
                      formik.touched.regnumber && formik.errors.regnumber
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    } transition-all duration-300 hover:border-blue-400`}
                    placeholder="Enter registration number"
                  />
                  {formik.touched.regnumber && formik.errors.regnumber && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.regnumber}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                    className={`block w-full rounded-lg py-2.5 px-4 border ${
                      formik.touched.gender && formik.errors.gender
                        ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    } transition-all duration-300 hover:border-blue-400`}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.gender}</p>
                  )}
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(['password', 'confirmPassword'] as PasswordField[]).map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                      {field === 'password' ? 'Password' : 'Confirm Password'}
                    </label>
                    <div className="relative group">
                      <input
                        id={field}
                        name={field}
                        type={showPassword[field] ? 'text' : 'password'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values[field]}
                        className={`block w-full rounded-lg py-2.5 px-4 pr-10 border ${
                          formik.touched[field] && formik.errors[field]
                            ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                        } transition-all duration-300 group-hover:border-blue-400`}
                        placeholder={field === 'password' ? 'Create password' : 'Confirm password'}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(field)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-300"
                        aria-label={showPassword[field] ? 'Hide password' : 'Show password'}
                      >
                        {renderPasswordIcon(field)}
                      </button>
                      {formik.touched[field] && formik.errors[field] && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors[field]}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formik.isValid}
                className={`w-full py-2.5 px-4 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                  isLoading || !formik.isValid
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
                    Creating Account...
                  </div>
                ) : 'Create Account'}
              </button>

              {/* Links */}
              <div className="text-center space-y-3 mt-6">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => {
                      onClose();
                      onLoginClick?.();
                    }}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300 hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtp && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="fixed inset-0 bg-black/75 transition-opacity duration-300"></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 mx-4 transform transition-all duration-300">
            <Otp 
              email={formik.values.email}
              onClose={() => setShowOtp(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;