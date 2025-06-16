import React, { useState } from 'react'
import { 
  FiMessageSquare,
  FiUser,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const PrincipalHeader :React.FC= () => {

    const navigate = useNavigate();
    const [selectedCampus, setSelectedCampus] = useState('All Campuses');
    const [activeTab, setActiveTab] = useState('overview');
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const campuses = [
    { name: "College of Science and Technology", location: "Nyarugenge", code: "CST" },
    { name: "College of Medicine and Health Sciences", location: "Huye", code: "CMHS" },
    { name: "College of Business and Economics", location: "Gikondo", code: "CBE" },
    { name: "College of Education", location: "Rukara", code: "CE" },
    { name: "College of Agriculture", location: "Busogo", code: "CA" },
    { name: "College of Arts and Social Sciences", location: "Nyagatare", code: "CASS" },
  ];
    const handleLogout = () => {
    localStorage.removeItem('principalToken');
    navigate('/');
  };
  return (
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab === 'overview' && 'University Overview'}
              {activeTab === 'campuses' && 'Campus Monitoring'}
              {activeTab === 'progress' && 'Academic Progress'}
              {activeTab === 'calendar' && 'Academic Calendar'}
              {activeTab === 'reports' && 'Institutional Reports'}
            </h2>
            {activeTab !== 'overview' && (
              <select 
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option>All Campuses</option>
                {campuses.map(campus => (
                  <option key={campus.code} value={campus.code}>{campus.name}</option>
                ))}
              </select>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowFeedbackModal(true)}
              className="p-2 rounded-full hover:bg-gray-100"
              title="Send feedback"
            >
              <FiMessageSquare className="text-gray-600" />
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white font-medium">
                <FiUser />
              </div>
              <div className="ml-2 text-right hidden sm:block">
                <p className="text-sm font-medium">Principal</p>
                <button 
                  onClick={handleLogout}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>
  )
}

export default PrincipalHeader
