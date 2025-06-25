import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash, FaPhone, FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { IoClose } from 'react-icons/io5';
import Otp from './Otp';
import { API_URL } from '../config/api';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: string;
  dateOfBirth: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  dateOfBirth?: string;
}

interface showLoginProp {
  onClose: () => void;
  showLogin: () => void;
}

type FormField = keyof Pick<FormValues, 'email' | 'phone' | 'firstName' | 'lastName'>;
type PasswordField = 'password' | 'confirmPassword';

const Signup: React.FC<showLoginProp> = ({ onClose, showLogin }) => {
  const [formData, setFormData] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
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

  // Updated to match backend validation
  const phoneRegExp = /^\+?\d{6,15}$/;
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
  const genderOptions = ['Male', 'Female']; // Removed 'other' to match backend

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'firstName':
        if (!value) return 'First name is required';
        if (value.length < 3) return 'Must be at least 3 characters';
        if (value.length > 15) return 'Must be 15 characters or less';
        break;
      case 'lastName':
        if (!value) return 'Last name is required';
        if (value.length < 3) return 'Must be at least 3 characters';
        if (value.length > 20) return 'Must be 20 characters or less';
        break;
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return 'Invalid email address';
        break;
      case 'phone':
        if (!value) return 'Phone number is required';
        if (!phoneRegExp.test(value)) return 'Must be 6-15 digits with optional + prefix';
        break;
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Must be at least 8 characters';
        if (!passwordRegExp.test(value)) return 'Must contain uppercase, lowercase, number, and special character';
        break;
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords must match';
        break;
      case 'gender':
        if (!value) return 'Gender is required';
        if (!genderOptions.includes(value)) return 'Please select a valid gender';
        break;
      case 'dateOfBirth':
        if (!value) return 'Date of birth is required';
        const dob = new Date(value);
        if (dob > new Date()) return 'Date cannot be in the future';
        // Additional validation for reasonable age range
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 120);
        if (dob < minDate) return 'Please enter a valid date';
        break;
      default:
        return undefined;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormValues]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, formData[name as keyof FormValues]);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const allTouched = Object.keys(formData).reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {} as Record<string, boolean>);
  setTouched(allTouched);

  if (!validateForm()) {
    return;
  }

  setIsLoading(true);
  setApiStatus({ message: '', type: '' });

  try {
    // Format date as YYYY-MM-DD without time
    const formattedDate = formData.dateOfBirth.split('T')[0];
    
    console.log('Submitting:', {
      ...formData,
      dateOfBirth: formattedDate  // Now just the date part
    });

    const response = await fetch(`${API_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        gender: formData.gender,
        dateOfBirth: formattedDate  // Send just the date part
      })
    });

const data = await response.json();

// If the response is not successful
if (!response.ok) {
  // Check if there are validation errors from backend
  if (data.error) {
    // Convert backend errors to our form errors format
    const backendErrors: FormErrors = {};
    
    for (const fieldName in data.error) {
      if (fieldName in formData) {
        // Join multiple error messages with comma if they exist
        const errorMessages = data.error[fieldName]._errors || ['Invalid value'];
        backendErrors[fieldName as keyof FormErrors] = errorMessages.join(', ');
      }
    }
    
    // Update form errors with backend validation errors
    setErrors(backendErrors);
    throw new Error('Please fix the errors in the form');
  }
  
  // If no specific validation errors, show general error message
  throw new Error(data.Message || 'Registration failed. Please try again.');
}

// If registration was successful
setApiStatus({
  message: 'Registration successful! Please check your email for verification.',
  type: 'success'
});
    setTimeout(() => {
      setShowOtp(true);
    }, 2000);

  } catch (error: any) {
    console.error('Registration error:', error);
    setApiStatus({ 
      message: error.message || 'An error occurred during registration', 
      type: 'error' 
    });
  } finally {
    setIsLoading(false);
  }
};

  const togglePasswordVisibility = (field: PasswordField) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const renderFieldIcon = (field: FormField) => {
    const icons: Record<FormField, React.ReactNode> = {
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
    <div className="lg:w-1/3 w-full lg:h-fit flex flex-col rounded-lg h-7/8 overflow-y-auto">
      {/* Form Section */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative bg-white rounded-lg">
        {/* OTP Modal Backdrop and Container */}
        {showOtp && (
          <>
            <div className="fixed inset-0 bg-gray-500/30 bg-opacity-50 z-40"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
                <Otp 
                  email={formData.email} 
                  onClose={() => setShowOtp(false)}
                />
              </div>
            </div>
          </>
        )}
        <div className="w-full max-w-md">
          <IoClose 
            size={30} 
            onClick={onClose} 
            className='flex self-end top-0 right-0 justify-self-end cursor-pointer hover:text-red-400 transition-colors duration-200 ease-in-out'
          />
          
          <div className="mb-2 text-center">
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

          <form onSubmit={handleSubmit}>
            <fieldset disabled={isLoading} className="space-y-3">
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={formData[field as keyof FormValues]}
                        className={`block w-full rounded-md py-3 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10 ${
                          touched[field] && errors[field as keyof FormErrors] ? 'border-red-500' : 'border'
                        }`}
                        placeholder={`Enter your ${field === 'firstName' ? 'first' : 'last'} name`}
                        aria-required="true"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {renderFieldIcon(field as FormField)}
                      </div>
                    </div>
                    {touched[field] && errors[field as keyof FormErrors] && (
                      <p className="mt-1 text-sm text-red-600">{errors[field as keyof FormErrors]}</p>
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.email}
                    className={`block w-full rounded-md border-gray-300 shadow-sm py-2 focus:border-blue-500 focus:ring-blue-500 pl-10 ${
                      touched.email && errors.email ? 'border-red-500' : 'border'
                    }`}
                    placeholder="Enter your email"
                    aria-required="true"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {renderFieldIcon('email')}
                  </div>
                </div>
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.phone}
                    className={`block w-full rounded-md border-gray-300 shadow-sm py-2 focus:border-blue-500 focus:ring-blue-500 pl-10 ${
                      touched.phone && errors.phone ? 'border-red-500' : 'border'
                    }`}
                    placeholder="e.g. +250780905910 or 0780905910"
                    aria-required="true"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {renderFieldIcon('phone')}
                  </div>
                </div>
                {touched.phone && errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.gender}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 py-2 px-2 focus:ring-blue-500 ${
                      touched.gender && errors.gender ? 'border-red-500' : 'border'
                    }`}
                    aria-required="true"
                  >
                    <option value="">Select gender</option>
                    {genderOptions.map(gender => (
                      <option key={gender} value={gender}>{gender}</option>
                    ))}
                  </select>
                  {touched.gender && errors.gender && (
                    <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                  )}
                </div>

                <div className="relative">
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    name="dateOfBirth"
                    id="dateOfBirth"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.dateOfBirth}
                    className={`block w-full rounded-md border-gray-300 shadow-sm py-2 px-2 focus:border-blue-500 focus:ring-blue-500 ${
                      touched.dateOfBirth && errors.dateOfBirth ? 'border-red-500' : 'border'
                    }`}
                    aria-required="true"
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {touched.dateOfBirth && errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={formData[field]}
                        className={`block w-full rounded-md border-gray-300 shadow-sm py-2 px-2 focus:border-blue-500 focus:ring-blue-500 ${
                          touched[field] && errors[field as keyof FormErrors] ? 'border-red-500' : 'border'
                        }`}
                        placeholder={field === 'password' ? 'Create password' : 'Confirm password'}
                        aria-required="true"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => togglePasswordVisibility(field)}
                        aria-label={`${showPassword[field] ? 'Hide' : 'Show'} ${field}`}
                        tabIndex={-1}
                      >
                        {renderPasswordIcon(field)}
                      </button>
                    </div>
                    {touched[field] && errors[field as keyof FormErrors] && (
                      <p className="mt-1 text-sm text-red-600">{errors[field as keyof FormErrors]}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2C4FFF] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isLoading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  aria-busy={isLoading ? "true" : "false"}
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
            </fieldset>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button onClick={showLogin} className="font-medium text-[#2C4FFF] hover:text-blue-700">
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;