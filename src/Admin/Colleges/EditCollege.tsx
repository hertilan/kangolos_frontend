import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface editCollege{
    name: string;
    location: string;
    principal: string;
    students: string;
    projects: string;
    schools: string;
    description: string;
    established: string;
   onClose: () => void;

}

const EditCollege :React.FC<editCollege>= ({name,location,principal,students,projects,schools,description,established,onClose}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const[collegeName,setCollegeName]= useState<string>(name)
  const [collegeLocation, setCollegeLocation] = useState<string>(location)
  const [collegePrincipal, setCollegePrincipal] = useState<string>(principal)
  const[collegeStudents, setCollegeStudents] = useState<string>(students)
  const [collegeProjects, setCollegeProjects] = useState<string>(projects)
  const [collegeSchools, setCollegeSchools] = useState<string>(schools)
  const [collegeDescription, setCollegeDescription] = useState<string>(description)
  const [collegeEstablished, setCollegeEstablished] = useState<string>(established)

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
const [edited] = useState<editCollege[]>([])

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
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit {name}</h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">College Name</label>
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
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={collegeLocation}
                  onChange={(e)=>{
                    setCollegeLocation(e.target.value)
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="principal" className="block text-sm font-medium text-gray-700">Principal</label>
                <input
                  type="text"
                  id="principal"
                  name="principal"
                  value={collegePrincipal}
                  onChange={(e)=>{
                    setCollegePrincipal(e.target.value)
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="established" className="block text-sm font-medium text-gray-700">Established Year</label>
                <input
                  type="text"
                  id="established"
                  name="established"
                  value={collegeEstablished}
                  onChange={(e)=>{
                    setCollegeEstablished(e.target.value)
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="students" className="block text-sm font-medium text-gray-700">Number of Students</label>
                <input
                  type="number"
                  id="students"
                  name="students"
                  value={collegeStudents}
                  onChange={(e)=>{
                    setCollegeStudents(e.target.value)
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="projects" className="block text-sm font-medium text-gray-700">Number of Projects</label>
                <input
                  type="number"
                  id="projects"
                  name="projects"
                  value={collegeProjects}
                  onChange={(e)=>{
                    setCollegeProjects(e.target.value)
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="schools" className="block text-sm font-medium text-gray-700">Schools (comma separated)</label>
              <textarea
                id="schools"
                name="schools"
                value={collegeSchools}
                onChange={(e)=>{
                    setCollegeSchools(e.target.value)
                  }}
                rows={2}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
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
                {isSubmitting ? 'Updating...' : 'Update College'}
              </button>
            </div>
          </form>
    </div>
  );
}

export default EditCollege
