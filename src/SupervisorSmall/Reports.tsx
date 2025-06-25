import React, { useState, useEffect } from 'react';
import { FaFileAlt, FaDownload, FaFilter, FaChartBar, FaChartLine, FaChartPie, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface Report {
  id: number;
  title: string;
  type: 'summary' | 'detailed' | 'analytical';
  dateGenerated: string;
  generatedBy: string;
  format: 'PDF' | 'CSV' | 'XLSX';
  size: string;
}

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    format: '',
    dateRange: '',
  });

  // Mock data for reports
  const mockReports: Report[] = [
    { id: 1, title: 'Monthly Projects Summary', type: 'summary', dateGenerated: '2023-05-15', generatedBy: 'System', format: 'PDF', size: '2.4 MB' },
    { id: 2, title: 'Team Performance Q2', type: 'analytical', dateGenerated: '2023-06-20', generatedBy: 'Admin', format: 'XLSX', size: '1.8 MB' },
    { id: 3, title: 'Detailed Project Audit', type: 'detailed', dateGenerated: '2023-07-05', generatedBy: 'Auditor', format: 'CSV', size: '3.2 MB' },
    { id: 4, title: 'Weekly Activity Report', type: 'summary', dateGenerated: '2023-07-10', generatedBy: 'System', format: 'PDF', size: '1.1 MB' },
    { id: 5, title: 'User Engagement Analysis', type: 'analytical', dateGenerated: '2023-06-28', generatedBy: 'Analyst', format: 'XLSX', size: '2.7 MB' },
    { id: 6, title: 'Comprehensive System Report', type: 'detailed', dateGenerated: '2023-05-30', generatedBy: 'Admin', format: 'PDF', size: '4.5 MB' },
    { id: 7, title: 'Quarterly Review', type: 'summary', dateGenerated: '2023-04-01', generatedBy: 'System', format: 'PDF', size: '3.0 MB' },
    { id: 8, title: 'Team Productivity Metrics', type: 'analytical', dateGenerated: '2023-07-12', generatedBy: 'Manager', format: 'CSV', size: '2.1 MB' },
  ];

  useEffect(() => {
    // Simulate API fetch
    const fetchReports = async () => {
      try {
        setLoading(true);
        // Fetching Reports
        const response = await fetch('https://www.kangalos.com/api/admin/reports');
        const data = await response.json();
        setReports(mockReports);
        setFilteredReports(mockReports);
      } catch (err) {
        setError('Failed to load reports. Using sample data.');
        setReports(mockReports);
        setFilteredReports(mockReports);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let results = [...reports];
    
    // Apply search
    if (searchTerm) {
      results = results.filter(report =>
        Object.values(report).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // Apply filters
    if (filters.type) {
      results = results.filter(report => report.type === filters.type);
    }
    if (filters.format) {
      results = results.filter(report => report.format === filters.format);
    }
    if (filters.dateRange) {
      const now = new Date();
      let cutoffDate = new Date();
      
      switch (filters.dateRange) {
        case 'last-week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'last-month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'last-quarter':
          cutoffDate.setMonth(now.getMonth() - 3);
          break;
        case 'last-year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      results = results.filter(report => {
        const reportDate = new Date(report.dateGenerated);
        return reportDate >= cutoffDate;
      });
    }
    
    setFilteredReports(results);
  }, [searchTerm, filters, reports]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      type: '',
      format: '',
      dateRange: '',
    });
    setSearchTerm('');
  };

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'summary': return <FaFileAlt className="text-blue-500" />;
      case 'detailed': return <FaChartBar className="text-green-500" />;
      case 'analytical': return <FaChartLine className="text-purple-500" />;
      default: return <FaFileAlt className="text-gray-500" />;
    }
  };

  const getFormatBadge = (format: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (format) {
      case 'PDF': return <span className={`${baseClasses} bg-red-100 text-red-800`}>PDF</span>;
      case 'CSV': return <span className={`${baseClasses} bg-green-100 text-green-800`}>CSV</span>;
      case 'XLSX': return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>XLSX</span>;
      default: return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{format}</span>;
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaFileAlt className="mr-2 text-indigo-500" />
          Reports
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
          >
            <FaFilter className="mr-2" />
            Filters
            {showFilters ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
          </button>
        </div>
      </div>

      {/* {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )} */}

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <select
                id="type-filter"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Types</option>
                <option value="summary">Summary</option>
                <option value="detailed">Detailed</option>
                <option value="analytical">Analytical</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="format-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Format
              </label>
              <select
                id="format-filter"
                name="format"
                value={filters.format}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Formats</option>
                <option value="PDF">PDF</option>
                <option value="CSV">CSV</option>
                <option value="XLSX">XLSX</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select
                id="date-filter"
                name="dateRange"
                value={filters.dateRange}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Time</option>
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-quarter">Last Quarter</option>
                <option value="last-year">Last Year</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-3">
              <FaFileAlt />
            </div>
            <div>
              <p className="text-sm text-blue-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-800">{reports.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-3">
              <FaChartBar />
            </div>
            <div>
              <p className="text-sm text-green-600">Summary Reports</p>
              <p className="text-2xl font-bold text-gray-800">
                {reports.filter(r => r.type === 'summary').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-3">
              <FaChartLine />
            </div>
            <div>
              <p className="text-sm text-purple-600">Analytical Reports</p>
              <p className="text-2xl font-bold text-gray-800">
                {reports.filter(r => r.type === 'analytical').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-3">
              <FaChartPie />
            </div>
            <div>
              <p className="text-sm text-yellow-600">This Month</p>
              <p className="text-2xl font-bold text-gray-800">
                {reports.filter(r => {
                  const reportDate = new Date(r.dateGenerated);
                  const now = new Date();
                  return reportDate.getMonth() === now.getMonth() && 
                         reportDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated On
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Format
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    {reports.length === 0 ? 'No reports available' : 'No reports match your filters'}
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                          {getReportIcon(report.type)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{report.title}</div>
                          <div className="text-sm text-gray-500">by {report.generatedBy}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        {new Date(report.dateGenerated).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getFormatBadge(report.format)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 flex items-center">
                        <FaDownload className="mr-1" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Generate New Report Section */}
      <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Generate New Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 flex flex-col items-center">
            <FaFileAlt className="text-blue-500 text-2xl mb-2" />
            <span className="font-medium">Project Summary</span>
            <span className="text-sm text-gray-500">High-level overview</span>
          </button>
          
          <button className="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 flex flex-col items-center">
            <FaChartBar className="text-green-500 text-2xl mb-2" />
            <span className="font-medium">Team Performance</span>
            <span className="text-sm text-gray-500">Metrics and analytics</span>
          </button>
          
          <button className="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 flex flex-col items-center">
            <FaChartLine className="text-purple-500 text-2xl mb-2" />
            <span className="font-medium">Custom Report</span>
            <span className="text-sm text-gray-500">Configure your own</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;