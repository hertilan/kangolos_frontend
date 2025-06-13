import React, { useEffect, useState } from 'react'

const StudentSatsfaction :React.FC= () => {
          const [number, setNumber] = useState(0);
        
            useEffect(function () {
            const interval = setInterval(function () {
              setNumber(prev => {
                if (prev < 8) {
                  return prev + 0.5;
                } else {
                  clearInterval(interval);
                  return prev;
                }
              });
            }, 850); // Change speed here (500ms = half a second)
        
            return () => clearInterval(interval); // Clean up on unmount
          }, []);
  return (
            <div className="p-8 rounded-xl bg-purple-50 shadow-sm hover:shadow-md">
              <div className="text-4xl font-bold text-purple-600 mb-2">{number}/10</div>
              <div className="text-gray-600">Student Satisfaction</div>
            </div>
  )
}

export default StudentSatsfaction
