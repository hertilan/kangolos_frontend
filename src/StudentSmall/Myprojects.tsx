import React, { useEffect, useState } from 'react';
import { FiInfo, FiDownload, FiClock, FiUser, FiFile } from 'react-icons/fi';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface MyProject {
  _id: string;
  title: string;
  supervisor: string;
  status: 'pending' | 'approved' | 'rejected' | 'revisions';
  updatedAt: string;
  reviews: number;
  document?: {
    name: string;
    url: string;
  };
}
    const sampleProjects: MyProject[] = [
    {
      _id: '1',
      title: "Assets Management System",
      supervisor: 'Mbonabucya',
      status:'pending',
      updatedAt: "21 June 2025",
      reviews: 23,
      document: {
      name: 'Umutungo.pdf',
      url: '#'}
    },
    
    {
      _id: '2',
      title: "Final Year projects Management System",
      supervisor: 'Ntaganda',
      status:'approved',
      updatedAt: "02 July 2024",
      reviews: 33,
      document: {
      name: 'FYPMS.pdf',
      url: '#'}
    },
    {
      _id: '4',
      title: "University Full web application",
      supervisor: 'Kanakuze',
      status:'rejected',
      updatedAt: new Date().toISOString(),
      reviews: 5,
      document: {
      name: 'blockchain_whitepaper.pdf',
      url: '#'}
    },
  {
    _id: '1',
    title: "AI Research Project",
    supervisor: 'Dr. Mbonabucya',
    status: 'pending',
    updatedAt: new Date().toISOString(),
    reviews: 5,
    document: {
      name: 'research_paper.pdf',
      url: '#'
    }
  },
  {
    _id: '2',
    title: "Blockchain Implementation",
    supervisor: 'Prof. Johnson',
    status: 'approved',
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    reviews: 12,
    document: {
      name: 'blockchain_whitepaper.pdf',
      url: '#'
    }
  },
  {
    _id: '3',
    title: "Renewable Energy Study",
    supervisor: 'Dr. Smith',
    status: 'revisions',
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    reviews: 8
  }
    // ... other sample colleges
  ];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  revisions: 'bg-blue-100 text-blue-800'
};

const MyProjects: React.FC = () => {  
  const [projects, setProjects] = useState<MyProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://www.binary.com/users/myprojects');
        
        if (!response.ok) {
          throw new Error(response.status === 404 
            ? "No projects found" 
            : "Failed to load projects");
        }

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        // setError(err instanceof Error ? err.message : "An unknown error occurred");
        setProjects(sampleProjects)
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDownload = (url: string, name: string) => {
    // Implement download logic
    console.log(`Downloading ${name} from ${url}`);
    // Typically you would use something like:
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = name;
    // link.click();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <FiInfo className="text-red-500 text-4xl mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Projects</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <FiInfo className="text-indigo-500 text-4xl mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">No Projects Found</h2>
        <p className="text-gray-600 mb-4">You haven't submitted any projects yet</p>
        <Link 
          to="/student/create-project"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <FiFile className="inline" />
          Submit Your First Project
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div 
          key={project._id}
          className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">{project.title}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <FiUser className="mr-1" />
                  <span>Supervisor: {project.supervisor}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>

            <div className="flex flex-wrap justify-between items-center mt-3 text-sm">
              <div className="flex items-center text-gray-500 mb-2 sm:mb-0">
                <FiClock className="mr-1" />
                <span>Last updated: {format(new Date(project.updatedAt), 'PPp')}</span>
              </div>
              <div className="text-green-600">
                Reviewed {project.reviews} {project.reviews === 1 ? 'time' : 'times'}
              </div>
            </div>
          </div>

          {project.document && (
            <div className="border-t border-gray-100 p-3 bg-gray-50 flex justify-between items-center">
              <div className="flex items-center text-gray-600">
                <FiFile className="mr-2" />
                <span>{project.document.name}</span>
              </div>
              <button
                onClick={() => handleDownload(project.document.url, project.document.name)}
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm"
              >
                <FiDownload />
                Download
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyProjects;