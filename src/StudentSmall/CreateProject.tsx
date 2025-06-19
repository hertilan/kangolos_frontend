import React, { useEffect, useState } from 'react'
import Header from './Header'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FiUpload, FiInfo } from 'react-icons/fi';
import PageLayout from '../Components/PageLayout';

interface Project {
  title: string;
  category: string;
  abstract: string;
  document: File | null;
}

const CreateProject: React.FC = () => {
  const [formData, setFormData] = useState<Project>({
    title: '',
    category: '',
    abstract: '',
    document: null
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentError, setCurrentError] = useState<string>('');

  const categories = [
    { value: '', label: 'Select Category', disabled: true },
    { value: 'Ed-tech', label: 'Education Technology' },
    { value: 'Agriculture', label: 'Agricultural Innovation' },
    { value: 'Healthcare', label: 'Healthcare Solutions' },
    { value: 'Finance', label: 'Financial Technology' },
    { value: 'Sustainability', label: 'Environmental Sustainability' }
  ];

  const acceptedFileTypes = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx';
  const maxFileSizeMB = 10;

  const validateField = (fieldName: keyof Project, value: string | File | null) => {
    if (!value) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    
    if (fieldName === 'document' && value instanceof File) {
      if (value.size > maxFileSizeMB * 1024 * 1024) {
        return `File size must be less than ${maxFileSizeMB}MB`;
      }
    }
    
    return '';
  };

  const handleBlur = (fieldName: keyof Project) => {
    const value = formData[fieldName];
    const errorMessage = validateField(fieldName, value);
    setCurrentError(errorMessage);
  };

  const isFormValid = () => {
    return (
      formData.title &&
      formData.category &&
      formData.abstract &&
      formData.document &&
      !currentError
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const fieldsToValidate: (keyof Project)[] = ['title', 'category', 'abstract', 'document'];
    for (const field of fieldsToValidate) {
      const errorMessage = validateField(field, formData[field]);
      if (errorMessage) {
        setCurrentError(errorMessage);
        return;
      }
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setCurrentError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('abstract', formData.abstract);
      if (formData.document) {
        formDataToSend.append('document', formData.document);
      }

      const response = await fetch('https://www.eric.example.com/student/project', {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit project. Please try again later.');
      }

      setSuccess('Project submitted successfully! You will receive a confirmation email shortly.');
      setFormData({
        title: '',
        category: '',
        abstract: '',
        document: null
      });
    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const allowedExtensions = acceptedFileTypes.replace(/\./g, '').split(',');

      if (fileExtension && !allowedExtensions.includes(fileExtension)) {
        setCurrentError(`Please upload only these file types: ${acceptedFileTypes}`);
        return;
      }

      if (file.size > maxFileSizeMB * 1024 * 1024) {
        setCurrentError(`File size exceeds ${maxFileSizeMB}MB limit`);
        return;
      }

      setFormData({ ...formData, document: file });
      setCurrentError('');
    }
  };

  return (
    <div className='min-h-screen w-full flex flex-col bg-gray-50'>
      <Header />
      <PageLayout>
        <div className='py-6 sm:py-8'>
          <div className='flex items-center gap-4 mb-8'>
            <Link to='/student' className='text-gray-700 hover:text-gray-900 transition-colors'>
              <FaArrowLeftLong size={25} />
            </Link>
            <div>
              <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800'>Project Submission</h1>
              <p className='text-gray-500 text-sm sm:text-base mt-2'>Submit your project proposal for review</p>
            </div>
          </div>

          <div className='bg-blue-50 p-4 sm:p-6 rounded-lg mb-8 flex items-start gap-3'>
            <FiInfo className='text-blue-500 mt-1 flex-shrink-0 text-lg' />
            <div>
              <h2 className='font-medium text-blue-800 mb-2'>Submission Guidelines</h2>
              <p className='text-sm text-gray-700'>
                Please complete all required fields to submit your project. Your abstract should clearly describe 
                your project's objectives, methodology, and expected outcomes. All documents must be in PDF or 
                Microsoft Office format and under {maxFileSizeMB}MB in size.
              </p>
            </div>
          </div>

          {error && (
            <div className='mb-8 p-4 sm:p-6 bg-red-50 text-red-700 rounded-lg border border-red-100 text-sm'>
              {error}
            </div>
          )}

          {success && (
            <div className='mb-8 p-4 sm:p-6 bg-green-50 text-green-700 rounded-lg border border-green-100 text-sm'>
              {success}
            </div>
          )}

          {currentError && (
            <div className='mb-8 p-4 sm:p-6 bg-yellow-50 text-yellow-700 rounded-lg border border-yellow-100 text-sm'>
              {currentError}
            </div>
          )}

          <form onSubmit={handleSubmit} className='bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200'>
            <div className='space-y-8'>
              {/* Title Field */}
              <div>
                <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>
                  Project Title <span className='text-red-500'>*</span>
                </label>
                <p className='text-xs text-gray-500 mb-2'>
                  A clear, concise title that reflects your project's focus
                </p>
                <input
                  id='title'
                  type='text'
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  onBlur={() => handleBlur('title')}
                  placeholder='e.g., "Sustainable Irrigation System for Small Farms"'
                  className='w-full p-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200'
                />
              </div>

              {/* Category Field */}
              <div>
                <label htmlFor='category' className='block text-sm font-medium text-gray-700 mb-1'>
                  Project Category <span className='text-red-500'>*</span>
                </label>
                <p className='text-xs text-gray-500 mb-2'>
                  Select the category that best fits your project
                </p>
                <select
                  id='category'
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  onBlur={() => handleBlur('category')}
                  className='w-full p-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200'
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value} disabled={category.disabled}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Abstract Field */}
              <div>
                <label htmlFor='abstract' className='block text-sm font-medium text-gray-700 mb-1'>
                  Project Abstract <span className='text-red-500'>*</span>
                </label>
                <p className='text-xs text-gray-500 mb-2'>
                  Provide a detailed description of your project (minimum 200 words)
                </p>
                <textarea
                  id='abstract'
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  onBlur={() => handleBlur('abstract')}
                  rows={6}
                  placeholder='Describe your project objectives, methodology, and expected outcomes...'
                  className='w-full p-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200'
                />
              </div>

              {/* Document Upload Field */}
              <div>
                <label htmlFor='document' className='block text-sm font-medium text-gray-700 mb-1'>
                  Project Document <span className='text-red-500'>*</span>
                </label>
                <p className='text-xs text-gray-500 mb-2'>
                  Upload your project document ({acceptedFileTypes.split(',').join(', ')}, max {maxFileSizeMB}MB)
                </p>
                <div className='relative'>
                  <input
                    id='document'
                    type='file'
                    onChange={handleFileChange}
                    accept={acceptedFileTypes}
                    className='hidden'
                  />
                  <label
                    htmlFor='document'
                    className='flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200'
                  >
                    <div className='flex flex-col items-center space-y-2'>
                      <FiUpload className='text-gray-400 text-2xl' />
                      <span className='text-sm text-gray-500'>
                        {formData.document ? formData.document.name : 'Click to upload or drag and drop'}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className='pt-4'>
                <button
                  type='submit'
                  disabled={!isFormValid() || loading}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
                    !isFormValid() || loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {loading ? 'Submitting...' : 'Submit Project'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </PageLayout>
    </div>
  );
};

export default CreateProject;