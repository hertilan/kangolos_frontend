import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiFileText, FiUsers as FiTeam, FiHeart } from 'react-icons/fi';

interface Project {
  _id: number;
  title: string;
  team: string;
  supervisor: string;
  status: string;
  college: string;
}

interface User {
  _id: number;
  name: string;
  email: string;
  gender: string;
  role: string;
  college: string;
  school: string;
  department: string;
}

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

const Total: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState({
    users: true,
    projects: true,
    teams: true
  });
  const [error, setError] = useState({
    users: '',
    projects: '',
    teams: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(prev => ({ ...prev, users: true }));
        const response = await fetch('https://www.binary.com/api/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(prev => ({ ...prev, users: err.message }));
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(prev => ({ ...prev, users: false }));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(prev => ({ ...prev, projects: true }));
        const response = await fetch('https://www.binary.com/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(prev => ({ ...prev, projects: err.message }));
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(prev => ({ ...prev, projects: false }));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(prev => ({ ...prev, teams: true }));
        const response = await fetch('https://www.binary.com/api/teams');
        if (!response.ok) throw new Error('Failed to fetch teams');
        const data = await response.json();
        setTeams(data);
      } catch (err) {
        setError(prev => ({ ...prev, teams: err.message }));
        console.error('Failed to fetch teams:', err);
      } finally {
        setLoading(prev => ({ ...prev, teams: false }));
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      id: 'users',
      title: 'Total Users',
      icon: <FiUsers className="text-xl" />,
      value: users.length,
      change: '+156% from last semester',
      loading: loading.users,
      error: error.users
    },
    {
      id: 'projects',
      title: 'Total Projects',
      icon: <FiFileText className="text-xl" />,
      value: projects.length,
      change: '+156 from last semester',
      loading: loading.projects,
      error: error.projects
    },
    {
      id: 'teams',
      title: 'Active Teams',
      icon: <FiTeam className="text-xl" />,
      value: teams.length,
      change: '+156 from last semester',
      loading: loading.teams,
      error: error.teams
    },
    {
      id: 'health',
      title: 'System Health',
      icon: <FiHeart className="text-xl" />,
      value: '12%',
      change: '+156 from last semester',
      loading: false,
      error: ''
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-5 w-full">
      {stats.map((stat) => (
        <motion.div
          key={stat.id}
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-[#00628B] to-[#004466] rounded-lg p-4 md:p-5 shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-300 text-sm md:text-base">{stat.title}</p>
            <div className=" bg-white bg-opacity-20 p-2 rounded-full">
              {stat.icon}
            </div>
          </div>
          
          {stat.loading ? (
            <div className="h-8 w-3/4 bg-gray-400 bg-opacity-20 rounded mt-2 animate-pulse"></div>
          ) : stat.error ? (
            <p className="text-red-200 text-sm mt-2">Error loading data</p>
          ) : (
            <p className="text-white text-2xl md:text-3xl font-semibold mt-2">
              {stat.value}
            </p>
          )}
          
          <p className="text-[#2AD300] text-xs md:text-sm mt-2">
            {stat.change}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default Total;