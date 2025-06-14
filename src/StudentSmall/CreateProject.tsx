import React, { useEffect, useState } from 'react'
import Header from './Header'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FiUpload, FiInfo } from 'react-icons/fi';

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
    <div className='min-h-screen max-w-screen text-gray-600 flex flex-col'>
      <Header />
      <div className='p-4 py-2 max-w-4xl mx-auto w-full'>
        <div className='flex items-center gap-4 mb-6'>
          <Link to='/student' className='text-gray-700 hover:text-gray-900 transition-colors'>
            <FaArrowLeftLong size={25} />
          </Link>
          <h1 className='text-2xl font-bold text-gray-900'>Project Submission</h1>
        </div>

        <div className='bg-blue-50 p-4 rounded-lg mb-6 flex items-start gap-3'>
          <FiInfo className='text-blue-500 mt-1 flex-shrink-0' />
          <div>
            <h2 className='font-medium text-blue-800 mb-1'>Submission Guidelines</h2>
            <p className='text-sm text-gray-700'>
              Please complete all required fields to submit your project. Your abstract should clearly describe 
              your project's objectives, methodology, and expected outcomes. All documents must be in PDF or 
              Microsoft Office format and under {maxFileSizeMB}MB in size.
            </p>
          </div>
        </div>

        {error && (
          <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm'>
            {error}
          </div>
        )}

        {success && (
          <div className='mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm'>
            {success}
          </div>
        )}

        {currentError && (
          <div className='mb-4 p-3 bg-yellow-100 text-yellow-700 rounded-md text-sm'>
            {currentError}
          </div>
        )}

        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
          <div className='space-y-6'>
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
                className='w-full p-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            {/* Category Field */}
            <div>
              <label htmlFor='category' className='block text-sm font-medium text-gray-700 mb-1'>
                Project Category <span className='text-red-500'>*</span>
              </label>
              <p className='text-xs text-gray-500 mb-2'>
                Select the field that best matches your project
              </p>
              <select
                id='category'
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                onBlur={() => handleBlur('category')}
                className='w-full p-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                {categories.map((option) => (
                  <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
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
                Briefly describe your project (250-500 words). Include objectives, methods, and potential impact.
              </p>
              <textarea
                id='abstract'
                value={formData.abstract}
                onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                onBlur={() => handleBlur('abstract')}
                placeholder='Describe your project in detail...'
                rows={6}
                maxLength={500}
                className='w-full p-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <p className='text-xs text-gray-500 mt-1 text-right'>
                {formData.abstract.length}/500 characters
              </p>
            </div>

            {/* Document Upload */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Project Document <span className='text-red-500'>*</span>
              </label>
              <p className='text-xs text-gray-500 mb-2'>
                Upload your complete project document (Max {maxFileSizeMB}MB)
              </p>
              <label htmlFor='document' className='flex flex-col items-center px-4 py-6 bg-white rounded-md border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors'>
                <FiUpload className='w-6 h-6 text-gray-400 mb-2' />
                <p className='text-sm text-gray-600 text-center'>
                  {formData.document 
                    ? `Selected: ${formData.document.name}` 
                    : 'Click to upload or drag and drop'}
                </p>
                <p className='text-xs text-gray-500 mt-1'>
                  Supported formats: {acceptedFileTypes}
                </p>
                <input
                  id='document'
                  type='file'
                  onChange={handleFileChange}
                  className='hidden'
                  accept={acceptedFileTypes}
                />
              </label>
            </div>

            {/* Form Actions */}
            <div className='flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t border-gray-200'>
              <Link
                to='/student'
                className='px-6 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors font-medium text-sm text-center'
              >
                Cancel Submission
              </Link>
              <button
                type='submit'
                disabled={!isFormValid() || loading}
                className={`px-6 py-2 rounded-md font-medium text-white text-sm ${!isFormValid() || loading 
                  ? 'bg-blue-300 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
              >
                {loading ? (
                  <span className='flex items-center justify-center gap-2'>
                    <span className='inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
                    Submitting...
                  </span>
                ) : 'Submit Project'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;