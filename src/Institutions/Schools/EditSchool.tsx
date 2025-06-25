import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosWarning } from "react-icons/io";

interface editSchool{
    name: string;
    dean: string;
    students: string;
    departments: string;
    description: string;
    projects: string;
   onClose: () => void;

}

const EditSchool :React.FC<editSchool>= ({name,dean,students,projects,departments,description,onClose}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const[collegeName,setCollegeName]= useState<string>(name)
  // const [collegePrincipal, setCollegePrincipal] = useState<string>(principal)
  // const[collegeStudents, setCollegeStudents] = useState<string>(students)
  // const [collegeProjects, setCollegeProjects] = useState<string>(projects)
  // const [collegeSchools, setCollegeSchools] = useState<string>(schools)
  const [collegeDescription, setCollegeDescription] = useState<string>(description)
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
const [edited] = useState<editSchool[]>([])

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
      const response = await fetch('https://www.projectmanagement.urcom/admin/colleges', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">School Name (Editable)</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={collegeName}
                  onChange={(e)=>{
                    setCollegeName(e.target.value)
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="dean" className="block text-sm font-medium text-gray-700">Dean</label>
                <input
                  type="text"
                  id="dean"
                  name="deann"
                  value={dean}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="students" className="block text-sm font-medium text-gray-700">Students</label>
                <input
                  type="text"
                  id="students"
                  name="students"
                  value={students}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="projects" className="block text-sm font-medium text-gray-700">Projects</label>
                <input
                  type="text"
                  id="projects"
                  name="projects"
                  value={projects}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

            </div>

            <div>
              <label htmlFor="departments" className="block text-sm font-medium text-gray-700">Departments (comma separated)</label>
              <textarea
                id="departments"
                name="departments"
                value={departments}
                rows={2}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (editable)</label>
              <textarea
                id="description"
                name="description"
                value={collegeDescription}
                onChange={(e)=>{
                    setCollegeDescription(e.target.value)
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

export default EditSchool
