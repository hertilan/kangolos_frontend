import React, { useEffect, useState } from 'react';
import { FaUserEdit, FaSearch, FaSort, FaSync } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Member {
  _id: number;
  name: string;
  email: string;
  role: string;
}

interface Team {
  _id: number;
  name: string;
  members: Member[];
  supervisor: string;
  project: string;
  college: string;
}

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Team; direction: 'ascending' | 'descending' } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const teamsPerPage = 10;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://www.binary.com/api/teams');
        if (!response.ok) throw new Error('Failed to fetch teams');
        const data = await response.json();
        setTeams(data);
        setFilteredTeams(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setTeams([]);
        setFilteredTeams([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    const results = teams.filter(team =>
      Object.values(team).some(val =>
        typeof val === 'string' ? val.toLowerCase().includes(searchTerm.toLowerCase()) :
        Array.isArray(val) ? val.some(member => 
          member.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) : false
      )
    );
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
      // Handle member arrays differently
      if (key === 'members') {
        const aNames = a.members.map(m => m.name).join(', ');
        const bNames = b.members.map(m => m.name).join(', ');
        if (aNames < bNames) return direction === 'ascending' ? -1 : 1;
        if (aNames > bNames) return direction === 'ascending' ? 1 : -1;
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

  return (
    <div className="w-full p-6 space-y-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800">Team Management</h1>
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
            title="Refresh teams"
          >
            <FaSync className={`${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <div className="relative w-full md:w-96">
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
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['_id', 'name', 'members', 'supervisor', 'project', 'college', 'action'].map((header) => (
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
              {filteredTeams.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    {error ? 'Failed to load teams' : 'No teams available in the system'}
                  </td>
                </tr>
              ) : (
                currentTeams.map((team) => (
                  <tr key={team._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{team._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {team.members.map(member => (
                          <span key={member._id} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                            {member.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.supervisor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.project}</td>
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
      )}

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
    </div>
  );
};

export default Teams;