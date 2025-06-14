import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash, FaPhone, FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
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

type FormField = keyof Pick<FormValues, 'email' | 'phone' | 'firstName' | 'lastName'>;
type PasswordField = 'password' | 'confirmPassword';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [showOtp,setShowOtp] = useState<boolean>(false)
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

  const renderFieldIcon = (field: FormField) => {
    const icons: Record<FormField, JSX.Element> = {
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

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Image Section */}
      <div className="lg:w-1/2 bg-blue-50 hidden lg:flex items-center justify-center">
        <img 
          src={project} 
          alt="Project illustration" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Section */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* OTP Modal Backdrop and Container */}
        {showOtp && (
          <>
            <div className="fixed inset-0 bg-gray-500/30 bg-opacity-50 z-40"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
                <Otp 
                  email={formik.values.email} onClose={() => setShowOtp(false)}
                />
              </div>
            </div>
          </>
        )}
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#2C4FFF] mb-2">FYPMS</h1>
            <h2 className="text-xl font-semibold text-gray-800">Create your account</h2>
          </div>

          {apiStatus.message && (
            <div className={`mb-6 p-3 rounded-md text-sm ${
              apiStatus.type === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {apiStatus.message}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['firstName', 'lastName'].map((field) => (
                <div key={field} className="relative">
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                    {field === 'firstName' ? 'First Name' : 'Last Name'}
                  </label>
                  <div className="relative">
                    <input
                      id={field}
                      name={field}
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[field as keyof FormValues]}
                      className={`block w-full rounded-md py-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10 py-3${
                        formik.touched[field as keyof FormValues] && formik.errors[field as keyof FormValues] ? 'border-red-500' : 'border'
                      }`}
                      placeholder={`Enter your ${field === 'firstName' ? 'first' : 'last'} name`}
                      aria-required="true"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {renderFieldIcon(field as FormField)}
                    </div>
                  </div>
                  {formik.touched[field as keyof FormValues] && formik.errors[field as keyof FormValues] && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors[field as keyof FormValues]}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`block w-full rounded-md border-gray-300 shadow-sm py-2 focus:border-blue-500 focus:ring-blue-500 pl-10 ${
                    formik.touched.email && formik.errors.email ? 'border-red-500' : 'border'
                  }`}
                  placeholder="Enter your email"
                  aria-required="true"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {renderFieldIcon('email')}
                </div>
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className={`block w-full rounded-md border-gray-300 shadow-sm py-2 focus:border-blue-500 focus:ring-blue-500 pl-10 ${
                    formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border'
                  }`}
                  placeholder="Enter your phone number"
                  aria-required="true"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {renderFieldIcon('phone')}
                </div>
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.phone}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 py-2 px-2 focus:ring-blue-500 ${
                    formik.touched.gender && formik.errors.gender ? 'border-red-500' : 'border'
                  }`}
                  aria-required="true"
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

              <div className="relative">
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
                  className={`block w-full rounded-md border-gray-300 shadow-sm py-2 px-2 focus:border-blue-500 focus:ring-blue-500 ${
                    formik.touched.regnumber && formik.errors.regnumber ? 'border-red-500' : 'border'
                  }`}
                  placeholder="Enter registration number"
                  aria-required="true"
                />
                {formik.touched.regnumber && formik.errors.regnumber && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.regnumber}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(['password', 'confirmPassword'] as PasswordField[]).map((field) => (
                <div key={field} className="relative">
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                    {field === 'password' ? 'Password' : 'Confirm Password'}
                  </label>
                  <div className="relative">
                    <input
                      id={field}
                      name={field}
                      type={showPassword[field] ? 'text' : 'password'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[field]}
                      className={`block w-full rounded-md border-gray-300 shadow-sm py-2 px-2 focus:border-blue-500 focus:ring-blue-500 ${
                        formik.touched[field] && formik.errors[field] ? 'border-red-500' : 'border'
                      }`}
                      placeholder={field === 'password' ? 'Create password' : 'Confirm password'}
                      aria-required="true"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => togglePasswordVisibility(field)}
                      aria-label={`${showPassword[field] ? 'Hide' : 'Show'} ${field}`}
                      tabIndex={-1} // Prevent button from being in tab order
                    >
                      {renderPasswordIcon(field)}
                    </button>
                  </div>
                  {formik.touched[field] && formik.errors[field] && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors[field]}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading || !formik.isValid}
                className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2C4FFF] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#2C4FFF] hover:text-blue-700">
                Log in
              </Link>
            </p>
            <Link 
              to="/" 
              className="mt-2 inline-block text-gray-500 hover:text-gray-700 text-sm"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;