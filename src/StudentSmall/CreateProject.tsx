import React, { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiUpload, FiInfo } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

interface Project {
  title: string;
  category: string;
  abstract: string;
  document: File | null;
}

interface ShowProjectProp {
  onClose: () => void;
}

const CreateProject: React.FC<ShowProjectProp> = ({ onClose }) => {
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600/70 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center z-10">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="text-gray-700 hover:text-gray-900 transition-colors">
              <FaArrowLeftLong size={20} />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Project Submission</h1>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start gap-3">
            <FiInfo className="text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h2 className="font-medium text-blue-800 mb-1">Submission Guidelines</h2>
              <p className="text-sm text-gray-700">
                Please complete all required fields to submit your project. Your abstract should clearly describe 
                your project's objectives, methodology, and expected outcomes. All documents must be in PDF or 
                Microsoft Office format and under {maxFileSizeMB}MB in size.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm border border-red-100">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm border border-green-100">
              {success}
            </div>
          )}

          {currentError && (
            <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded-md text-sm border border-yellow-100">
              {currentError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Project Title <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">
                A clear, concise title that reflects your project's focus
              </p>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                onBlur={() => handleBlur('title')}
                placeholder='e.g., "Sustainable Irrigation System for Small Farms"'
                className="w-full p-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Field */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Project Category <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Select the field that best matches your project
              </p>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                onBlur={() => handleBlur('category')}
                className="w-full p-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjQgdjR2NCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem]"
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
              <label htmlFor="abstract" className="block text-sm font-medium text-gray-700 mb-1">
                Project Abstract <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Briefly describe your project (250-500 words). Include objectives, methods, and potential impact.
              </p>
              <textarea
                id="abstract"
                value={formData.abstract}
                onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                onBlur={() => handleBlur('abstract')}
                placeholder="Describe your project in detail..."
                rows={6}
                maxLength={500}
                className="w-full p-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-500 mt-1 text-right">
                {formData.abstract.length}/500 characters
              </p>
            </div>

            {/* Document Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Document <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Upload your complete project document (Max {maxFileSizeMB}MB)
              </p>
              <label htmlFor="document" className="block">
                <div className={`flex flex-col items-center px-4 py-6 rounded-lg border-2 border-dashed ${formData.document ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-blue-500'} transition-colors cursor-pointer`}>
                  <div className="flex items-center gap-3 mb-2">
                    <FiUpload className={`w-5 h-5 ${formData.document ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className={`text-sm ${formData.document ? 'text-green-700 font-medium' : 'text-gray-600'}`}>
                      {formData.document 
                        ? `Selected: ${formData.document.name}` 
                        : 'Click to upload or drag and drop'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Supported formats: {acceptedFileTypes}
                  </p>
                  {formData.document && (
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, document: null})}
                      className="mt-2 text-xs text-red-500 hover:text-red-700"
                    >
                      Remove file
                    </button>
                  )}
                </div>
                <input
                  id="document"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept={acceptedFileTypes}
                />
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid() || loading}
                className={`px-6 py-2.5 rounded-lg font-medium text-white text-sm transition-all ${!isFormValid() || loading 
                  ? 'bg-blue-300 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md'}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Submitting...
                  </span>
                ) : 'Submit Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;