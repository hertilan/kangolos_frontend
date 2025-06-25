import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

interface AddSchoolProps {
  collegeId: string;
  onClose: () => void;
  collegeName: string;
}

const AddSchool: React.FC<AddSchoolProps> = ({ onClose, collegeId, collegeName }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    description: '',
    location: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    phone: '',
    dateOfBirth: '',
    jobTitle: 'Dean',
    college: collegeName
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('School name is required'),
    description: Yup.string().required('Description is required'),
    location: Yup.string().required('Location is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    gender: Yup.string().required('Gender is required'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]+$/, 'Must contain only numbers'),
    dateOfBirth: Yup.date()
      .required('Date of birth is required')
      .max(new Date(), 'Date of birth cannot be in the future'),
    jobTitle: Yup.string().required('Job title is required')
  });

  const handleSubmit = async (values: typeof initialValues) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const formattedData = {
        name: values.name,
        description: values.description,
        location: values.location,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        gender: values.gender,
        phone: values.phone,
        dateOfBirth: new Date(values.dateOfBirth).toISOString(),
        jobTitle: values.jobTitle
      };

      const response = await fetch(`https://kangalos-intern-1.onrender.com/admin/addschool/${collegeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(formattedData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add school');
      }

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600/60 bg-opacity-50 w-screen flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Add School to {collegeName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            {error}
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
                {/* School Information */}
                <div className="md:col-span-2 border-b pb-2">
                  <h3 className="font-medium text-gray-900">School Information</h3>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">School Name*</label>
                  <Field
                    name="name"
                    className={`mt-1 block w-full border rounded-md p-2 ${errors.name && touched.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Location*</label>
                  <Field
                    name="location"
                    className={`mt-1 block w-full border rounded-md p-2 ${errors.location && touched.location ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.location && touched.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description*</label>
                  <Field
                    as="textarea"
                    name="description"
                    rows={3}
                    className={`mt-1 block w-full border rounded-md p-2 ${errors.description && touched.description ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.description && touched.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>

                {/* Dean Information */}
                <div className="md:col-span-2 border-b pb-2 mt-4">
                  <h3 className="font-medium text-gray-900">Dean Information</h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name*</label>
                  <Field
                    name="firstName"
                    className={`mt-1 block w-full border rounded-md p-2 ${errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name*</label>
                  <Field
                    name="lastName"
                    className={`mt-1 block w-full border rounded-md p-2 ${errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email*</label>
                  <Field
                    name="email"
                    type="email"
                    className={`mt-1 block w-full border rounded-md p-2 ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password*</label>
                  <Field
                    name="password"
                    type="password"
                    className={`mt-1 block w-full border rounded-md p-2 ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender*</label>
                  <Field
                    as="select"
                    name="gender"
                    className={`mt-1 block w-full border rounded-md p-2 ${errors.gender && touched.gender ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Field>
                  {errors.gender && touched.gender && (
                    <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone*</label>
                  <Field
                    name="phone"
                    className={`mt-1 block w-full border rounded-md p-2 ${errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth*</label>
                  <Field
                    name="dateOfBirth"
                    type="date"
                    className={`mt-1 block w-full border rounded-md p-2 ${errors.dateOfBirth && touched.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.dateOfBirth && touched.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Job Title*</label>
                  <Field
                    name="jobTitle"
                    className={`mt-1 block w-full border rounded-md p-2 ${errors.jobTitle && touched.jobTitle ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.jobTitle && touched.jobTitle && (
                    <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#00628B] text-white rounded-md hover:bg-[#3d94bd] disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save School'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddSchool;