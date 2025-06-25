import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface editUser{
        id:number;
        name: string
        email: string
        gender: string
        referenceNumber: string
        role: string
        college: string
        school: string
        department: string
   onClose: () => void;

}

const EditUser :React.FC<editUser>= ({id,name,email,gender,referenceNumber,role,college,school,department,onClose}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [userName,setUserName]= useState<string>(name)
  const [userEmail, setUserEmail] = useState<string>(email)
  const [userGender,setUserGender] = useState<string>(gender)
  const [userReference, setUserReference] = useState<string>(referenceNumber)
  const [userRole, setUserRole] = useState<string>(role)
  const [userSchool,  setUserSchool] = useState<string>(school)
  const [userCollege, setUseracollege] = useState<string>(college)
  const [userDepartment, setUserDepartment] = useState<string>(department)

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
const [edited] = useState<editUser[]>([])

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
      const response = await fetch(`https://www.projectmanagement.urcom/admin/users/${id}`, {
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
      <p className="text-xl  mb-4 text-gray-800">Update <span className='font-bold text-2xl'>{name}</span></p>
      
      {error && (
        <div className="bg-red-100 border-l-4 text-xl border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">User Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userName}
                  onChange={(e)=>{
                    setUserName(e.target.value)
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="Email"
                  id="email"
                  name="email"
                  value={userEmail}
                  onChange={(e)=>{
                    setUserEmail(e.target.value)
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="Reference number" className="block text-sm font-medium text-gray-700">Reference number</label>
                <input
                  type="text"
                  id="reference"
                  name="reference"
                  placeholder='reference'
                  value={userReference}
                  onChange={(e)=>{
                    setUserReference(e.target.value)
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">User role</label>
                <select
                  id="role"
                  name="role"
                  value={userRole}
                  onChange={(e)=>{
                    setUserRole(e.target.value)
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value='' disabled>select role</option>
                    <option value='Student'>Student</option>
                    <option value='Supervissor'>Supervisor</option>
                    <option value='Hod'>HOD</option>
                    <option value='Dean'>Dean</option>
                    <option value ='Principal'>Principal</option>
                </select>
              </div>

              <div>
                <label htmlFor="college" className="block text-sm font-medium text-gray-700">College</label>
                <input
                  type="text"
                  id="college"
                  name="college"
                  value={userCollege}
                  onChange={(e)=>{
                    setUseracollege(e.target.value)
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="school" className="block text-sm font-medium text-gray-700">School</label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={userSchool}
                  onChange={(e)=>{
                    setUserSchool(e.target.value)
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="Department" className="block text-sm font-medium text-gray-700">Department</label>
              <input
              type='text'
                id="department"
                placeholder='departmenr'
                name="department"
                value={userDepartment}
                onChange={(e)=>{
                    setUserDepartment(e.target.value)
                  }}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                id="gender"
                name="gender"
                value={userGender}
                onChange={(e)=>{
                    setUserGender(e.target.value)
                  }}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
               >
                <option value='' disabled>Select gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                </select>
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

export default EditUser
