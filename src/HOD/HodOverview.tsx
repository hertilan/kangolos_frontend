import React from 'react'
import {  FiFileText} from 'react-icons/fi';
import { BsGraphUp, BsCalendarCheck } from 'react-icons/bs';

import HodStats from './HodStats';
import HodActions from './HodActions';

const HodOverview :React.FC= () => {


  const recentActivities = [
    { id: 1, action: 'Approved project proposal', user: 'Team Innovators', time: '1 hour ago' },
    { id: 2, action: 'Assigned supervisor', user: 'Dr. Uwimana', time: '3 hours ago' },
    { id: 3, action: 'Scheduled defense', user: 'Team TechSol', time: '1 day ago' },
  ];

  const upcomingDefenses = [
    { id: 1, title: 'AI for Crop Disease Detection', date: '2023-06-15', time: '10:00 AM', venue: 'ICT Building Room 101', team: 'Team AgriTech' },
    { id: 2, title: 'Blockchain for Land Registry', date: '2023-06-18', time: '2:00 PM', venue: 'Main Campus Hall B', team: 'Team ChainSafe' },
  ];
  return (
            <div className="space-y-6">
              {/* Stats Cards */}
              <HodStats/>
              {/* Recent Activities and Upcoming Defenses */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <BsGraphUp className="mr-2" /> Recent Activities
                  </h3>
                  <div className="space-y-4">
                    {recentActivities.map(activity => (
                      <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                          <FiFileText size={16} />
                        </div>
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-gray-600">
                            {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <BsCalendarCheck className="mr-2" /> Upcoming Defenses
                  </h3>
                  <div className="space-y-4">
                    {upcomingDefenses.map(defense => (
                      <div key={defense.id} className="pb-4 border-b border-gray-100 last:border-0">
                        <h4 className="font-medium">{defense.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">{defense.date}</span> at {defense.time}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Team:</span> {defense.team}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Venue:</span> {defense.venue}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <HodActions/>
            </div>
  )
}

export default HodOverview
