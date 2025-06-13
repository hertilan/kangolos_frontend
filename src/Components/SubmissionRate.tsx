import React, { useEffect, useState } from 'react'

const SubmissionRate :React.FC= () => {
      const [number, setNumber] = useState(0);
    
        useEffect(function () {
        const interval = setInterval(function () {
          setNumber(prev => {
            if (prev < 95) {
              return prev + 1;
            } else {
              clearInterval(interval);
              return prev;
            }
          });
        }, 150); // Change speed here (500ms = half a second)
    
        return () => clearInterval(interval); // Clean up on unmount
      }, []);
  return (
            <div className="p-8 rounded-xl bg-blue-50 shadow-sm hover:shadow-md">
              <div className="text-4xl font-bold text-indigo-600 mb-2">{number}%</div>
              <div className="text-gray-600">Submission Rate</div>
            </div>
  )
}

export default SubmissionRate
