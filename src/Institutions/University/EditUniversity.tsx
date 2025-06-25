import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosWarning } from "react-icons/io";

interface editUniversity{
  id: string;
  name: string;
  location: string;
  colleges: string;
  description: string;
   onClose: () => void;

}

const EditUniversity :React.FC<editUniversity>= ({id,name,location,colleges,description,onClose}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const[universityName,setUniversityName]= useState<string>(name)
  const [universityLocation, setUniversityLocation] = useState<string>(location)
  // const [collegePrincipal, setCollegePrincipal] = useState<string>(principal)
  // const[collegeStudents, setCollegeStudents] = useState<string>(students)
  // const [collegeProjects, setCollegeProjects] = useState<string>(projects)
  // const [collegeSchools, setCollegeSchools] = useState<string>(schools)
  const [universityDescription, setUniversityDescription] = useState<string>(description)
  // const [collegeEstablished, setCollegeEstablished] = useState<string>(established)

//   const initialValues = {
//     name: '',
//     location: '',
//     principal: '',
//     students: '',
//     projects: '',
//     schools: '',
//     description: '',
//     established: ''
//   };
const [edited] = useState<editUniversity[]>([])

//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required('College name is required'),
//     location: Yup.string().required('Location is required'),
//     principal: Yup.string().required('Principal name is required'),
//     students: Yup.number().required('Number of students is required').positive(),
//     projects: Yup.number().required('Number of projects is required').positive(),
//     schools: Yup.string().required('Schools list is required'),
//     established: Yup.string().required('Established year is required')
//   });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch(`https://kangalos-intern-1.onrender.com/admin/allUniversity/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        credentials: 'include',
        body: JSON.stringify({edited})
      });

      if (!response.ok) {
        throw new Error('Failed to add college');
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
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Update {name}</h2>
      <p className='my-3 mb-5 flex flex-row'><IoIosWarning size={25} className='text-red-400'/> Only fields marked with editable are the one you can update</p>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">University Name (Editable)</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={universityName}
                  onChange={(e)=>{
                    setUniversityName(e.target.value)
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location (Editable)</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={universityLocation}
                  onChange={(e)=>{
                    setUniversityLocation(e.target.value)
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

            </div>

            <div>
              <label htmlFor="colleges" className="block text-sm font-medium text-gray-700">Colleges (comma separated)</label>
              <textarea
                id="colleges"
                name="colleges"
                value={colleges}
                rows={2}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (editable)</label>
              <textarea
                id="description"
                name="description"
                value={universityDescription}
                onChange={(e)=>{
                    setUniversityDescription(e.target.value)
                  }}
                rows={2}
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
                {isSubmitting ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
    </div>
  );
}

export default EditUniversity
