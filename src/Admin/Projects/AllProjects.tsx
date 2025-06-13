import React, { useEffect, useState } from 'react'
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface project{

    _id: number;
    title: string;
    team: string;
    supervisor: string;
    status: string;
    college: string;
}

const AllProjects :React.FC= () => {
    const [allProjects, setAllProjects] = useState<project[]>([])

    useEffect(()=>{
    fetch('https://www.kangalos.com/api/project/all')
    .then((Response)=>{
        return Response.json()
    })
    .then((data)=>{
        setAllProjects(data)
    })
    .catch((error)=>{
        console.error('Failed to view projects',error)
                })
        
            },[])
  return (
    <div className='grid grid-cols-1 gap-3 w-full'>
      <table className='w-full border bg-white '>
        <thead>
            <tr>
                <th className='border border-gray-700'>Id</th>
                <th className='border border-gray-700'>Title</th>
                <th className='border border-gray-700'>Team</th>
                <th className='border border-gray-700'>Supervisor</th>
                <th className='border border-gray-700'>Status</th>
                <th className='border border-gray-700'>College</th>
                <th className='border border-gray-700'>Action</th>
            </tr>
        </thead>
        <tbody>
            { allProjects.length === 0 ?(
            <tr>
             <td colSpan={7} className="text-center text-xl text-gray-700 p-2">No projects available in the system
             </td>
             </tr>)
            :
            (
            allProjects.map((project) =>{
                return(
                <tr key={project._id}>
                <td className='border border-gray-700'> {project._id} </td>
                <td className='border border-gray-700'> {project.title} </td>
                <td className='border border-gray-700'> {project.team} </td>
                <td className='border border-gray-700'> {project.supervisor} </td>
                <td className={`border border-gray-700 ${project.status === 'completed' ? 'text-green-500' : project.status === 'pending' ? 'text-orange-400' : 'text-red-500'}`}> {project.status} </td>
                <td className='border border-gray-700'> {project.college} </td>
                <td className='border border-gray-700 flex flex-row gap-4'>
                    <button type='button'>
                    <FaUserEdit size={25} className='text-gray-800 hover:text-red-400 cursor-pointer transition-colors duration-300 ease-in-out'/>
                    </button>
                    <button type='button'>
                    <MdDelete size={25} className='text-gray-800 hover:text-red-400 cursor-pointer transition-colors duration-300 ease-in-out'/>
                    </button>
                </td>
            </tr>
                )
            })
)
            }
        </tbody>
      </table>
    </div>
  )
}

export default AllProjects
