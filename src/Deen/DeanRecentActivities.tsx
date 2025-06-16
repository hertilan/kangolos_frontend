import React from 'react'
import { FiFileText } from 'react-icons/fi';

const DeanRecentActivities :React.FC= () => {
        
      const recentActivities = [
        { id: 1, action: 'Approved department budget', user: 'Finance Committee', time: '2 hours ago' },
        { id: 2, action: 'Reviewed projects report', user: 'Quality Assurance', time: '1 day ago' },
        { id: 3, action: 'Scheduled school-wide defenses', user: 'Academic Committee', time: '2 days ago' },
      ];
    
      const upcomingEvents = [
        { id: 1, title: 'School Board Meeting', date: '2023-06-20', time: '9:00 AM', venue: 'Main Campus Senate Hall' },
        { id: 2, title: 'Final Projects Exhibition', date: '2023-06-25', time: '8:00 AM', venue: 'ICT Innovation Hub' },
      ];
  return (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow p-4 md:p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                  <div className="space-y-4">
                    {recentActivities.map(activity => (
                      <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                          <FiFileText size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-sm md:text-base">{activity.action}</p>
                          <p className="text-xs md:text-sm text-gray-600">
                            {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 md:p-6">
                  <h3 className="text-lg font-semibold mb-4">Upcoming School Events</h3>
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
  )
}

export default DeanRecentActivities
