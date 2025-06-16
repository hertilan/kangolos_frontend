import React from 'react'
import { BsPeopleFill } from 'react-icons/bs';
import { FaUniversity } from 'react-icons/fa';

import {  
  FiEye, 
  FiTrendingUp, 
  FiFileText,
  FiCheckCircle
} from 'react-icons/fi';

const PrincipalOverview :React.FC= () => {
      const campusProgress = [
    { name: "CST", projects: 320, completed: 240, color: "bg-blue-500" },
    { name: "CMHS", projects: 220, completed: 180, color: "bg-green-500" },
    { name: "CBE", projects: 200, completed: 150, color: "bg-yellow-500" },
    { name: "CE", projects: 180, completed: 120, color: "bg-red-500" },
    { name: "CA", projects: 160, completed: 100, color: "bg-purple-500" },
    { name: "CASS", projects: 168, completed: 82, color: "bg-indigo-500" },
  ];
    const campuses = [
    { name: "College of Science and Technology", location: "Nyarugenge", code: "CST" },
    { name: "College of Medicine and Health Sciences", location: "Huye", code: "CMHS" },
    { name: "College of Business and Economics", location: "Gikondo", code: "CBE" },
    { name: "College of Education", location: "Rukara", code: "CE" },
    { name: "College of Agriculture", location: "Busogo", code: "CA" },
    { name: "College of Arts and Social Sciences", location: "Nyagatare", code: "CASS" },
  ];
    const campusStats = {
    totalProjects: 1248,
    completed: 872,
    inProgress: 376,
    supervisors: 284,
    students: 2496
  };
    const recentActivities = [
    { id: 1, campus: "CST", action: 'Completed final defenses', time: '2 days ago' },
    { id: 2, campus: "CMHS", action: 'Submitted examination results', time: '3 days ago' },
    { id: 3, campus: "CBE", action: 'Started new projects', time: '1 week ago' },
  ];
    const upcomingEvents = [
    { id: 1, title: 'University Senate Meeting', date: '2023-06-20', time: '9:00 AM', venue: 'Main Campus Senate Hall' },
    { id: 2, title: 'UR Annual Research Conference', date: '2023-06-25', time: '8:00 AM', venue: 'ICT Innovation Hub' },
  ];
  return (
            <div className="space-y-6">
              {/* University Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-blue-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Campuses</p>
                      <h3 className="text-xl md:text-2xl font-bold">6</h3>
                    </div>
                    <div className="p-2 md:p-3 rounded-full bg-blue-100 text-blue-600">
                      <FaUniversity size={18} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-green-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Projects</p>
                      <h3 className="text-xl md:text-2xl font-bold">{campusStats.totalProjects}</h3>
                    </div>
                    <div className="p-2 md:p-3 rounded-full bg-green-100 text-green-600">
                      <FiFileText size={18} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-purple-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Completed</p>
                      <h3 className="text-xl md:text-2xl font-bold text-purple-600">{campusStats.completed}</h3>
                    </div>
                    <div className="p-2 md:p-3 rounded-full bg-purple-100 text-purple-600">
                      <FiCheckCircle size={18} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-yellow-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Supervisors</p>
                      <h3 className="text-xl md:text-2xl font-bold">{campusStats.supervisors}</h3>
                    </div>
                    <div className="p-2 md:p-3 rounded-full bg-yellow-100 text-yellow-600">
                      <BsPeopleFill size={18} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Campuses Progress */}
              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FiTrendingUp className="mr-2" /> Campuses Project Completion
                </h3>
                <div className="space-y-4">
                  {campusProgress.map(campus => (
                    <div key={campus.name} className="mb-3">
                      <div className="flex justify-between mb-1 text-sm md:text-base">
                        <span className="font-medium">
                          {campuses.find(c => c.code === campus.name)?.name || campus.name}
                        </span>
                        <span>{campus.completed}/{campus.projects} projects</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${campus.color}`} 
                          style={{ width: `${(campus.completed/campus.projects)*100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activities and Upcoming Events */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow p-4 md:p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                  <div className="space-y-4">
                    {recentActivities.map(activity => (
                      <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                          <FiEye size={16} />
                        </div>
                        <div>
                          <p className="font-medium">
                            {campuses.find(c => c.code === activity.campus)?.name || activity.campus}
                          </p>
                          <p className="text-gray-600 text-sm md:text-base">{activity.action}</p>
                          <p className="text-xs md:text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 md:p-6">
                  <h3 className="text-lg font-semibold mb-4">Upcoming University Events</h3>
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="pb-4 border-b border-gray-100 last:border-0">
                        <h4 className="font-medium text-sm md:text-base">{event.title}</h4>
                        <p className="text-xs md:text-sm text-gray-600 mt-1">
                          <span className="font-medium">{event.date}</span> at {event.time}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600">
                          <span className="font-medium">Venue:</span> {event.venue}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
  )
}

export default PrincipalOverview
