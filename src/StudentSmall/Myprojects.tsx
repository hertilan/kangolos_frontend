import { Date } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { FiInfo } from 'react-icons/fi';

interface MyProject {  
  title: string;
  supervisor: string;
  status: string;
  date: Date;
  reviews: number;
  document: File | null;
}

const MyProjects: React.FC = () => {  
  const [yourProjects, setYourProjects] = useState<MyProject[]>([]);  
  
  useEffect(() => {
    fetch('https://www.binary.com/users/myprojects')  
      .then((response) => {  
        if (!response.ok) throw new Error("An error occurred.");
        return response.json();
      })
      .then((data) => {
        setYourProjects(data);
      })
      .catch(error => {
        console.error("Fetch error:", error);
      });
  }, []); 

  return (
    <div className='w-full grid grid-cols-1'>
      {yourProjects.length === 0 ? (  
        <div className="flex flex-col items-center justify-center p-8 text-center w-full">
          <FiInfo className="text-blue-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Projects Available</h2>
          <p className="text-gray-600">Check back later or add new projects</p>
        </div>
      ) : (
        yourProjects.map((project) => {  
          return (
            <div key={project.title} className='grid grid-cols-1 gap-2 p-4 border-b'> 
              <div className='grid grid-cols-2 w-full'>
                <div className='flex flex-col gap-1'>
                  <h1 className='font-bold'>
                    {project.title}
                  </h1>
                  <p className='text-gray-400 text-[12px]'>
                    Supervisor: {project.supervisor}
                  </p>
                </div>
                <p className='grid justify-self-end text-[#2C4FFF]'>
                  {project.status}
                </p>
              </div>
              <div className='grid grid-cols-2'>
                <p className='text-gray-400 text-[12px]'>
                  Last updated {project.date.toString()} 
                </p>
                <p className='text-[#25A704] grid justify-self-end'>
                  Has been reviewed {project.reviews} times
                </p>
              </div>
              <div className='grid justify-items-center border border-gray-300 p-2'>  
                {project.document ? project.document.name : 'No document'}  
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyProjects;