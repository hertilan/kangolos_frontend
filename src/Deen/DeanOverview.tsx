import React from 'react'
import DeanStats from './DeanStats';
import DepartmentsProgress from './DepartmentsProgress';
import DeanRecentActivities from './DeanRecentActivities';
import HodActions from '../HOD/HodActions';

const DeanOverview :React.FC= () => {
    
      // Sample data for University of Rwanda

  return (
            <div className="space-y-6">
              {/* School Stats Cards */}
              <DeanStats/>
              {/* Departments Progress */}
              <DepartmentsProgress/>
              {/* Recent Activities and Upcoming Events */}
              <DeanRecentActivities/>
              <HodActions/>
            </div>
  )
}

export default DeanOverview
