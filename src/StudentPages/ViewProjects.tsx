import React, { useState } from 'react';
import Header from '../StudentSmall/Header';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { FiEye, FiDownload } from 'react-icons/fi';
import Footer from '../Components/Footer';

interface showStudent{
  onClose: boolean;
}

const BrowseProjects: React.FC <showStudent>= ({onClose}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const tags = [
    'AI', 'Machine Learning', 'AoT',
    'Blockchain', 'Web Development', 'Mobile Development'
  ];

  const projects = [
    {
      id: 1,
      title: 'Blockchain-Based Academic Credential Verification',
      description: 'A decentralized system for verifying academic credentials using smart contracts',
      department: 'Computer Science',
      published: 'May 2024',
      tag: 'Blockchain'
    },
    {
      id: 2,
      title: 'AI-Powered Campus Navigation System',
      description: 'Machine learning model to provide optimal routes across university campus',
      department: 'Computer Science',
      published: 'April 2024',
      tag: 'AI'
    },
    {
      id: 3,
      title: 'Automated Lecture Transcription Service',
      description: 'Real-time speech-to-text conversion with speaker identification',
      department: 'Information Technology',
      published: 'March 2024',
      tag: 'Machine Learning'
    },
    {
      id: 4,
      title: 'Smart Attendance Using Facial Recognition',
      description: 'Contactless attendance system with deep learning models',
      department: 'Computer Engineering',
      published: 'February 2024',
      tag: 'AoT'
    },
    {
      id: 5,
      title: 'University Event Management Platform',
      description: 'Full-stack solution for organizing and tracking campus events',
      department: 'Software Engineering',
      published: 'January 2024',
      tag: 'Web Development'
    },
    {
      id: 6,
      title: 'Mobile-Based Library Access System',
      description: 'Cross-platform app for searching and reserving library resources',
      department: 'Information Systems',
      published: 'December 2023',
      tag: 'Mobile Development'
    },
    {
      id: 7,
      title: 'Predictive Analytics for Student Performance',
      description: 'Using historical data to identify at-risk students early',
      department: 'Data Science',
      published: 'November 2023',
      tag: 'Machine Learning'
    },
    {
      id: 8,
      title: 'IoT-Based Classroom Environment Monitoring',
      description: 'Real-time monitoring of temperature, humidity and air quality',
      department: 'Computer Engineering',
      published: 'October 2023',
      tag: 'AoT'
    }
  ];

  const toggleTag = (tag: string) => {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeTags.length === 0 || activeTags.includes(project.tag)) &&
    (selectedDepartment === '' || project.department === selectedDepartment) &&
    (selectedYear === '' || project.published.includes(selectedYear))
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header onClose={true}/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back + Title */}
        <div className="flex items-center gap-3 mb-4">
          <Link to="/student" className={`${!onClose ? 'block' :'hidden'} text-gray-600 hover:text-indigo-600`}>
            <FaArrowLeft size={20} />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Browse Projects</h1>
        </div>

        {/* Mobile Filter Toggle */}
        <button 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden mb-4 w-full py-2 px-4 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2"
        >
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Search + Filters */}
        <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block mb-6`}>
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <input
              type="text"
              placeholder="Search Project"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-4">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg w-full"
              >
                <option value="">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Information Systems">Information Systems</option>
                <option value="Data Science">Data Science</option>
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg w-full"
              >
                <option value="">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 border rounded-full text-xs sm:text-sm ${
                  activeTags.includes(tag)
                    ? 'bg-indigo-100 text-indigo-600 border-indigo-400'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Project Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-600 font-semibold text-left">
              <tr>
                <th className="px-4 sm:px-6 py-3">Project Title</th>
                <th className="px-4 sm:px-6 py-3 hidden sm:table-cell">Department</th>
                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Published</th>
                <th className="px-4 sm:px-6 py-3 hidden lg:table-cell">Tags</th>
                <th className="px-4 sm:px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="font-medium text-gray-800">
                      {project.title}
                    </div>
                    <div className="text-gray-500 text-sm">{project.description}</div>
                    <div className="sm:hidden mt-2 flex flex-wrap gap-2">
                      <span className="text-xs text-gray-600">{project.department}</span>
                      <span className="text-xs text-gray-600">•</span>
                      <span className="text-xs text-gray-600">{project.published}</span>
                      <span className="text-xs text-gray-600">•</span>
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-xs">
                        {project.tag}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">{project.department}</td>
                  <td className="px-4 sm:px-6 py-4 hidden md:table-cell">{project.published}</td>
                  <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs">
                      {project.tag}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex gap-3 sm:gap-4 text-indigo-600">
                      <button className="hover:text-indigo-800" title="View">
                        <FiEye size={18} />
                      </button>
                      <button className="hover:text-indigo-800" title="Download">
                        <FiDownload size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    No projects found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default BrowseProjects;