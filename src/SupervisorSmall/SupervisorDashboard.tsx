import React, { useState } from 'react'
import Status from './Status';
import ProjectProgress from './ProjectProgress';
import UpcomingDeadlines from './UpcomingDeadlines';
import PendingApprovals from './PendingApprovals';



    const SupervisorDashboard: React.FC = () => {
      const [notifications] = useState([
        { id: 1, text: 'New submission from Student A', time: '10 min ago', read: false },
        { id: 2, text: 'Project B needs approval', time: '2 hours ago', read: true }
      ]);
    
      // Sample data - replace with real data

  return (
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

          {/* Stats Cards */}
          <Status/>

          {/* Students Progress */}
          <ProjectProgress/>

          {/* Projects Needing Attention */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PendingApprovals/>
            <UpcomingDeadlines/>
          </div>
        </main>
  )
}

export default SupervisorDashboard
