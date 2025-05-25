import React, { useEffect, useState } from 'react'
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";

interface member {
  _id: number;
  name: string;
  email: string;
  role: string;
}

interface team {
  _id: number;
  name: string;
  members: member[];
  supervisor: string;
  project: string;
  college: string;
}

const Teams :React.FC= () => {
  const [teams, setTeams] = useState<team[]>([])
  const [search, setSearch] = useState<string>('')

  useEffect(()=>{
   fetch('https://www.binary.com/api/teams')
   .then((response)=>{
    if(!response.ok) throw new Error('An error occured while fetching teams.')
    return response.json()
   })
   .then((data)=>{
    setTeams(data)
   })
   .catch((error)=>{
    console.error('Failed to fetch teams',error)
   })
  },[])
  return (
  <div className="min-w-full right-0 grid grid-cols-1 justify-items-start gap-3 p-2">
        <h1 className="text-2xl font-bold">Team Management</h1>
          <div className='flex flex-row justify-center  bg-white w-fit justify-self-end'>
            <div className='relative'>
              <input
                type='text'
                name='search'
                aria-label='Search teams'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search teams...'
                className='border-1 border-gray-400 px-6 p-2 rounded-l-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-80'
              />
              <button className='absolute left-0 top-2 text-gray-500' aria-label='Search by name'>
                <IoMdSearch size={23} />
              </button>
            </div>

            <button className='flex flex-row items-center text-white bg-[#00628B] rounded-r-sm cursor-pointer hover:bg-[#3d94bd] transition-colors duration-500 ease-in-out px-2 py-1'>Search</button>
          </div>
    <table className='w-full border bg-white '>
     <thead>
     <tr>
      <th className='border border-gray-700'>Id</th>
      <th className='border border-gray-700'>Name</th>
      <th className='border border-gray-700'>Team</th>
      <th className='border border-gray-700'>Members</th>
      <th className='border border-gray-700'>Supervisor</th>
      <th className='border border-gray-700'>College</th>
      <th className='border border-gray-700'>Action</th>
     </tr>
     </thead>
     <tbody>
     { teams.length === 0 ?(
     <tr>
     <td colSpan={7} className="text-center text-xl text-gray-700 p-2">No projects available in the system
     </td>
     </tr>)
     :
     (
     teams.map((team) =>{
      return(
    <tr key={team._id}>
      <td className='border border-gray-700'> {team._id} </td>
      <td className='border border-gray-700'> {team.name} </td>
      <td className='border border-gray-700'>{team.members.map((member) => member.name).join(', ')}</td>
      <td className='border border-gray-700'> {team.supervisor} </td>
      <td className={`border border-gray-700 `}> {team.project} </td>
      <td className='border border-gray-700'> {team.college} </td>
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

export default Teams
