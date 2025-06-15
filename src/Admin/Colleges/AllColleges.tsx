import React, { useState } from 'react'
interface college {
    name: string;
    location: string;
    schools:[];
    projects: number;
    principal: string;
}

const AllColleges :React.FC= () => {
  const [colleges, setColleges] = useState<college[]>([])
  return (
    <div>
      
    </div>
  )
}

export default AllColleges
