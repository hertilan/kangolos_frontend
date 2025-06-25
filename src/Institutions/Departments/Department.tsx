import React, { useState, useEffect } from 'react';
import { FaUserEdit, FaSearch} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddDepartment from './AddDepartment';
import EditDepartment from './EditDepartment';

interface HOD {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  gender: string;
  jobTitle: string;
}

interface Department {
  id: string;
  name: string;
  description: string;
  programs: string[];
  hod: HOD;
  studentsCount: number;
  facultyCount: number;
  projectsCount: number;
}

interface DepartmentProps {
  schoolId: string;
  schoolName: string;
  onDepartmentAction?: () => void;
}

const API_URL = 'https://kangalos-intern-1.onrender.com';

const Department: React.FC<DepartmentProps> = ({ schoolId, schoolName, onDepartmentAction }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showAddDepartment, setShowAddDepartment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editDepartment, setEditDepartment] = useState<Department | null>(null);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${API_URL}/admin/department/${schoolId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please login again.');
        }
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to fetch departments');
      }

      const data = await response.json();
      
      if (!data.department || !Array.isArray(data.department)) {
        throw new Error('Invalid departments data received');
      }

      const formattedDepartments = data.department.map((dept: any) => ({
        id: dept.id,
        name: dept.name,
        description: dept.description,
        programs: dept.programs || [],
        hod: {
          id: dept.hod.id,
          firstName: dept.hod.firstName,
          lastName: dept.hod.lastName,
          email: dept.hod.email,
          phone: dept.hod.phone,
          gender: dept.hod.gender,
          jobTitle: dept.hod.staffProfile?.jobTitle || ''
        },
        studentsCount: dept.studentsCount || 0,
        facultyCount: dept.facultyCount || 0,
        projectsCount: dept.projectsCount || 0
      }));

      setDepartments(formattedDepartments);
      setError('');
    } catch (err) {
      console.error('Error fetching departments:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch departments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [schoolId]);

  const handleAddDepartmentSuccess = () => {
    setShowAddDepartment(false);
    fetchDepartments();
    onDepartmentAction?.();
  };

  const handleUpdateDepartment = async (updatedDept: Department) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/admin/department/${updatedDept.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          name: updatedDept.name,
          description: updatedDept.description,
          hodId: updatedDept.hod.id,
          programs: updatedDept.programs
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update department');
      }

      await fetchDepartments();
      setEditDepartment(null);
      onDepartmentAction?.();
    } catch (err) {
      console.error('Error updating department:', err);
      setError(err instanceof Error ? err.message : 'Failed to update department');
    }
  };

  const handleDeleteDepartment = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/admin/department/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to delete department');
      }

      setDepartments(departments.filter(dept => dept.id !== id));
      onDepartmentAction?.();
    } catch (err) {
      console.error('Error deleting department:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete department');
    }
  };

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${dept.hod.firstName} ${dept.hod.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.hod.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && departments.length === 0) {
    return (
      <div className="w-full p-6 flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00628B]"></div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-6 space-y-6 bg-white rounded-lg shadow-sm">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded flex justify-between">
          <p>{error}</p>
          <button onClick={() => setError('')} className="font-bold">×</button>
        </div>
      )}

      {/* Add/Edit Department Modals */}
      <AnimatePresence>
        {showAddDepartment && (
          <AddDepartment 
            schoolId={schoolId}
            schoolName={schoolName}
            onClose={() => setShowAddDepartment(false)}
            onSuccess={handleAddDepartmentSuccess}
          />
        )}

        {editDepartment && (
          <EditDepartment 
            department={editDepartment}
            schoolName={schoolName}
            onClose={() => setEditDepartment(null)}
            onSave={handleUpdateDepartment}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">{schoolName} - Departments</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search departments..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowAddDepartment(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#00628B] text-white rounded-lg hover:bg-[#3d94bd] transition-colors"
          >
            Add Department
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Head</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Programs</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDepartments.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  {departments.length === 0 ? 'No departments available' : 'No matching departments found'}
                </td>
              </tr>
            ) : (
              filteredDepartments.map((dept) => (
                <tr key={dept.id} className="hover:bg-gray-50">
                  <td 
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer hover:text-[#00628B]"
                    onClick={() => setSelectedDepartment(dept)}
                  >
                    {dept.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dept.hod.firstName} {dept.hod.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dept.studentsCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dept.facultyCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dept.programs.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dept.projectsCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditDepartment(dept);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50"
                        title="Edit department"
                      >
                        <FaUserEdit size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteDepartment(dept.id);
                        }}
                        className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                        title="Delete department"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Department Details Modal */}
      {selectedDepartment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/60 bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedDepartment.name}</h2>
                <button 
                  onClick={() => setSelectedDepartment(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">School</h3>
                  <p className="mt-1 text-sm text-gray-900">{schoolName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Department Head</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedDepartment.hod.firstName} {selectedDepartment.hod.lastName}
                    {selectedDepartment.hod.jobTitle && ` (${selectedDepartment.hod.jobTitle})`}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Number of Students</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedDepartment.studentsCount}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Faculty Members</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedDepartment.facultyCount}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedDepartment.projectsCount}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500">Programs Offered</h3>
                <div className="mt-2 space-y-1">
                  {selectedDepartment.programs.map((program, index) => (
                    <p key={index} className="text-sm text-gray-900">• {program}</p>
                  ))}
                </div>
              </div>

              {selectedDepartment.description && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedDepartment.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Department;