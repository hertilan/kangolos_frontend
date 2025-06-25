import React, { useEffect, useState, useCallback } from 'react';
import { FaUserEdit, FaSearch, FaSort, FaSync } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Team {
  _id: number;
  name: string;
  members: string[];
  leader: string;
  project: string;
  status: 'active' | 'inactive' | 'pending' | string;
  college: string;
  createdAt?: string;
  updatedAt?: string;
}

const AllTeams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Team; direction: 'ascending' | 'descending' } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const teamsPerPage = 10;

  // Mock data for fallback
  const mockTeams: Team[] = [
    { _id: 1, name: 'Team Alpha', members: ['Alice', 'Bob', 'Charlie'], leader: 'Alice', project: 'AI Based Learning System', status: 'active', college: 'Engineering' },
    { _id: 2, name: 'Team Beta', members: ['David', 'Eve'], leader: 'David', project: 'Blockchain Voting System', status: 'active', college: 'Computer Science' },
    { _id: 3, name: 'Team Gamma', members: ['Frank', 'Grace', 'Hank'], leader: 'Frank', project: 'IoT Smart Home', status: 'inactive', college: 'Electronics' },
    { _id: 4, name: 'Team Delta', members: ['Ivy', 'Jack', 'Karen'], leader: 'Ivy', project: 'VR Classroom', status: 'pending', college: 'Education' },
    { _id: 5, name: 'Team Epsilon', members: ['Leo', 'Mia'], leader: 'Leo', project: 'Autonomous Drone', status: 'active', college: 'Aeronautics' },
    { _id: 6, name: 'Team Zeta', members: ['Noah', 'Olivia', 'Peter'], leader: 'Noah', project: 'Health Monitoring App', status: 'inactive', college: 'Medical' },
    { _id: 7, name: 'Team Eta', members: ['Quinn', 'Rachel'], leader: 'Quinn', project: 'E-commerce Recommendation', status: 'pending', college: 'Business' },
    { _id: 8, name: 'Team Theta', members: ['Sam', 'Tina', 'Uma'], leader: 'Sam', project: 'AR Museum Guide', status: 'active', college: 'Arts' },
    { _id: 9, name: 'Team Iota', members: ['Victor', 'Wendy'], leader: 'Victor', project: 'Smart Traffic System', status: 'inactive', college: 'Civil' },
    { _id: 10, name: 'Team Kappa', members: ['Xander', 'Yara', 'Zane'], leader: 'Xander', project: 'Biometric Attendance', status: 'active', college: 'Security' },
    { _id: 11, name: 'Team Lambda', members: ['Aaron', 'Bella'], leader: 'Aaron', project: 'Language Learning Chatbot', status: 'pending', college: 'Linguistics' },
    { _id: 12, name: 'Team Mu', members: ['Chris', 'Dana', 'Evan'], leader: 'Chris', project: 'Solar Power Optimizer', status: 'active', college: 'Energy' },
  ];

  const fetchTeams = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://www.kangalos.com/api/team/all');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setTeams(data);
      setFilteredTeams(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      // Use mock data when fetch fails
      setTeams(mockTeams);
      setFilteredTeams(mockTeams);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  useEffect(() => {
    const results = teams.filter(team =>
      Object.values(team).some(val =>
        Array.isArray(val) 
          ? val.some(item => String(item).toLowerCase().includes(searchTerm.toLowerCase()))
          : String(val).toLowerCase().includes(searchTerm.toLowerCase())
    ));
    setFilteredTeams(results);
    setCurrentPage(1);
  }, [searchTerm, teams]);

  const handleSort = (key: keyof Team) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedTeams = [...filteredTeams].sort((a, b) => {
      // Handle null/undefined values
      if (!a[key]) return direction === 'ascending' ? -1 : 1;
      if (!b[key]) return direction === 'ascending' ? 1 : -1;
      
      // Handle array values (members)
      if (Array.isArray(a[key])) {
        const aValue = (a[key] as string[]).join(', ');
        const bValue = (b[key] as string[]).join(', ');
        if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
        return 0;
      }
      
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setFilteredTeams(sortedTeams);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTeams();
  };

  // Pagination logic
  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);
  const totalPages = Math.ceil(filteredTeams.length / teamsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full p-6 space-y-6 bg-white rounded-lg shadow-sm">
      {/* {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error} - Showing mock data instead
        </div>
      )} */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800">All Teams</h1>
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
            title="Refresh teams"
          >
            <FaSync className={`${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search teams..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading && !refreshing ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['_id', 'name', 'members', 'leader', 'project', 'status', 'college', 'action'].map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => header !== 'action' ? handleSort(header as keyof Team) : null}
                    >
                      <div className="flex items-center">
                        {header === '_id' ? 'ID' : header.charAt(0).toUpperCase() + header.slice(1)}
                        {header !== 'action' && (
                          <FaSort className="ml-1 text-gray-400 hover:text-gray-600" size={12} />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTeams.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                      {teams.length === 0 ? 'No teams available in the system' : 'No matching teams found'}
                    </td>
                  </tr>
                ) : (
                  currentTeams.map((team) => (
                    <tr key={team._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{team._id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {team.members.map((member, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                              {member}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.leader}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.project}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(team.status)}`}>
                          {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.college}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button 
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 transition-colors"
                            title="Edit team"
                          >
                            <FaUserEdit size={18} />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                            title="Delete team"
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

          {/* Pagination */}
          {filteredTeams.length > teamsPerPage && (
            <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
              <div className="text-sm text-gray-500">
                Showing {indexOfFirstTeam + 1} to {Math.min(indexOfLastTeam, filteredTeams.length)} of {filteredTeams.length} teams
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
                  aria-label="Previous page"
                >
                  <FiChevronLeft />
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`px-3 py-1 rounded-md ${currentPage === pageNum ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <span className="px-3 py-1 text-gray-700">...</span>
                )}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <button
                    onClick={() => paginate(totalPages)}
                    className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                  >
                    {totalPages}
                  </button>
                )}
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
                  aria-label="Next page"
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllTeams;