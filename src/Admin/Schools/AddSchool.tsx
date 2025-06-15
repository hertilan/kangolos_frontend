import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const AddSchool: React.FC<{ onClose: () => void; collegeName: string }> = ({ onClose, collegeName }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    Deen: '',
    departments: '',
    students: '',
    projects: '',
    description: '',
    college: collegeName
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('School name is required'),
    Deen: Yup.string().required('Deen name is required'),
    departments: Yup.string().required('Departments list is required'),
    students: Yup.number().required('Number of students is required').positive(),
    projects: Yup.number().required('Number of projects is required').positive()
  });

  const handleSubmit = async (values: typeof initialValues) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('https://www.projectmanagement.urcom/admin/schools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          students: parseInt(values.students),
          projects: parseInt(values.projects)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add school');
      }

      onClose();
      navigate(0); // Refresh the page
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New School to {collegeName}</h2>
      
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
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">School Name</label>
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
                <label htmlFor="Deen" className="block text-sm font-medium text-gray-700">Deen</label>
                <Field
                  type="text"
                  id="Deen"
                  name="Deen"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.Deen && touched.Deen && (
                  <p className="mt-1 text-sm text-red-600">{errors.Deen}</p>
                )}
              </div>

              <div>
                <label htmlFor="students" className="block text-sm font-medium text-gray-700">Number of Students</label>
                <Field
                  type="number"
                  id="students"
                  name="students"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.students && touched.students && (
                  <p className="mt-1 text-sm text-red-600">{errors.students}</p>
                )}
              </div>

              <div>
                <label htmlFor="projects" className="block text-sm font-medium text-gray-700">Number of Projects</label>
                <Field
                  type="number"
                  id="projects"
                  name="projects"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.projects && touched.projects && (
                  <p className="mt-1 text-sm text-red-600">{errors.projects}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="departments" className="block text-sm font-medium text-gray-700">Departments (comma separated)</label>
              <Field
                as="textarea"
                id="departments"
                name="departments"
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.departments && touched.departments && (
                <p className="mt-1 text-sm text-red-600">{errors.departments}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
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
                {isSubmitting ? 'Adding...' : 'Add School'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSchool;