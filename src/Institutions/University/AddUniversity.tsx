import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { API_URL } from '../../config/api';

interface CloseProp{
  onClose: ()=> void
}

const AddUniversity: React.FC<CloseProp> = ({ onClose}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
//   const navigate = useNavigate();

  const initialValues = {

    nameUn: '',
    locationUn: '',
    descriptionUn: '',
  };

  const validationSchema = Yup.object().shape({
    nameUn: Yup.string().required('University name is required'),
    locationUn: Yup.string().required('University location is required'),
    descriptionUn: Yup.string().required('University description is required'),
  });
const handleSubmit = async (values: typeof initialValues) => {
  console.log('Form values before submission:', values); // Debug log
  
  setIsSubmitting(true);
  setError('');

  try {
    console.log('Preparing to send:', JSON.stringify(values)); // Debug log
    
const response = await fetch(`${API_URL}/admin/adduniversity`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Fixed template literal
  },
  credentials: 'include',
  body: JSON.stringify({
    name: values.nameUn,
    location: values.locationUn,
    description: values.descriptionUn,
  })
});

    console.log('Response status:', response.status); // Debug log
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Backend error:', errorData); // Debug log
      setError(errorData)
      throw new Error(errorData.Message);
    }

    console.log('Submission successful'); // Debug log
    onClose(); // Close modal on success
    
  } catch (err) {
    console.error('Submission error:', err); // Debug log
    setError(err instanceof Error ? err.message : 'An unknown error occurred');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="fixed inset-0 bg-gray-600/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New University</h2>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p>{error}</p>
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isValid, dirty }) => (
              <Form className="space-y-4">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h3 className="text-lg font-medium text-gray-900">University Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nameUn" className="block text-sm font-medium text-gray-700">University Name*</label>
                    <Field
                      type="text"
                      id="nameUn"
                      name="nameUn"
                      className={`mt-1 block w-full border ${errors.nameUn && touched.nameUn ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                    {errors.nameUn && touched.nameUn && (
                      <p className="mt-1 text-sm text-red-600">{errors.nameUn}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="locationUn" className="block text-sm font-medium text-gray-700">University Location*</label>
                    <Field
                      type="text"
                      id="locationUn"
                      name="locationUn"
                      className={`mt-1 block w-full border ${errors.locationUn && touched.locationUn ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                    {errors.locationUn && touched.locationUn && (
                      <p className="mt-1 text-sm text-red-600">{errors.locationUn}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="descriptionUn" className="block text-sm font-medium text-gray-700">University Description*</label>
                    <Field
                      as="textarea"
                      id="descriptionUn"
                      name="descriptionUn"
                      rows={3}
                      className={`mt-1 block w-full border ${errors.descriptionUn && touched.descriptionUn ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                    {errors.descriptionUn && touched.descriptionUn && (
                      <p className="mt-1 text-sm text-red-600">{errors.descriptionUn}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pb-2">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid || !dirty}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00628B] hover:bg-[#3d94bd] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                      </>
                    ) : 'Add University'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddUniversity;