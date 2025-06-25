import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { API_URL } from '../../config/api';

interface AddCollegeProp {
  UniversityId: string;
  onClose: () => void;
}

const AddCollege: React.FC<AddCollegeProp> = ({ onClose, UniversityId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [color, setColor] = useState<string>('red');

  const initialValues = {
    name: '',
    location: '',
    description: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    password: '',
    gender: '',
    jobTitle: 'Dean'
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required('College name is required'),
    location: Yup.string().trim().required('College location is required'),
    description: Yup.string().trim().required('College description is required'),
    firstName: Yup.string().trim().required("Dean's first name is required"),
    lastName: Yup.string().trim().required("Dean's last name is required"),
    email: Yup.string().trim().email('Invalid email format').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
    phone: Yup.string()
      .matches(/^\+?\d{6,15}$/, 'Invalid phone number format')
      .required('Phone number is required'),
    dateOfBirth: Yup.date()
      .required('Date of birth is required')
      .max(new Date(), 'Date of birth cannot be in the future'),
    jobTitle: Yup.string().trim().required("Dean's job title is required")
  });

  const handleSubmit = (values: typeof initialValues) => {
    setIsSubmitting(true);
    setError('');

    const requestBody = {
      name: values.name,
      location: values.location,
      description: values.description,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      email: values.email,
      phone: values.phone,
      password: values.password,
      gender: values.gender,
      jobTitle: values.jobTitle
    };

    fetch(`${API_URL}/admin/addcollege/${UniversityId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      credentials: 'include',
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add college');
      }
      return response.json();
    })
    .then(() => {
      setError(`${values.name} has been added`);
      setColor('green');
      setTimeout(() => {
        setError('');
        onClose();
      }, 2000);
    })
    .catch(err => {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setColor('red');
      setTimeout(() => {
        setError('');
      }, 4000);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto max-h-[80vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 sticky top-0 bg-white pb-2">Add New College</h2>
      
      {error && (
        <div className={`${color === 'red' ? 'bg-red-100 border-red-500' : 'bg-green-100 border-green-500'} border-l-4 p-4 mb-4`} role="alert">
          <p style={{color: color}}>{error}</p>
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* College Information */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-2 border-b pb-1">College Information</h3>
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">College Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.name && touched.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <Field
                  type="text"
                  id="location"
                  name="location"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.location && touched.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.description && touched.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Dean Information */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2 border-b pb-1">Dean Information</h3>
              </div>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.firstName && touched.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.lastName && touched.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
                <Field
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.jobTitle && touched.jobTitle && (
                  <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>
                )}
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <Field
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.dateOfBirth && touched.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.email && touched.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.phone && touched.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.password && touched.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <Field
                  as="select"
                  id="gender"
                  name="gender"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Field>
                {errors.gender && touched.gender && (
                  <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 sticky bottom-0 bg-white pt-4 pb-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00628B] hover:bg-[#3d94bd] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Adding...' : 'Add College'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCollege;