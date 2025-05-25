import React, { useEffect, useState } from 'react'

interface project{

    _id: number;
    title: string;
    team: string;
    supervisor: string;
    status: string;
    college: string;
}
interface user{

    _id: number;
    name: string;
    email: string;
    gender: string;
    role: string;
    college: string;
    school: string;
    department: string;
}
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


const Total :React.FC= () => {
    const [users, setUsers] = useState<user[]>([])
    const [projects, setProjects] = useState<project[]>([])
    const [teams, setTeams] = useState<team[]>([])

    useEffect(()=>{
        fetch('https://www.binary.com/api/users')
        .then((response)=>{
            if(!response.ok) throw new Error('An error occured while fetching users.')
            return response.json()
        })
        .then((data)=>{
            setUsers(data)
        })
        .catch((error)=>{
            console.error('Failed to fetch users',error)
        })
    },[])
    useEffect(()=>{
        fetch('https://www.binary.com/api/projects')
        .then((response)=>{
            if(!response.ok) throw new Error('An error occured while fetching projects.')
            return response.json()
        })
        .then((data)=>{
            setProjects(data)
        })
        .catch((error)=>{
            console.error('Failed to fetch projects',error)
        })
    },[])
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
      <div className='flex flex-row gap-9 mt-5 w-full'>
        <div className='bg-[#00628B] flex flex-col gap-2 rounded-sm hover:scale-105 transition w-full py-3 px-5 cursor-pointer'>
            <p className='text-[#808080]'>Total Users</p>
            <p className='text-gray-100'>{users.length}</p>
            <p className='text-[#2AD300]'>156% from last semester</p>
        </div>
        <div className='bg-[#00628B] flex flex-col gap-2 rounded-sm hover:scale-105 transition w-full py-3 px-5 cursor-pointer'>
            <p className='text-[#808080]'>Total Projects</p>
            <p className='text-gray-100'>{projects.length}</p>
            <p className='text-[#2AD300]'>+156 from last semester</p>
        </div>
        <div className='bg-[#00628B] flex flex-col gap-2 rounded-sm hover:scale-105 w-full transition py-3 px-5 cursor-pointer'>
            <p className='text-[#808080]'>Active Teams</p>
            <p className='text-gray-100'>{teams.length}</p>
            <p className='text-[#2AD300]'>+156 from last semester</p>
        </div>
        <div className='bg-[#00628B] flex flex-col gap-2 rounded-sm hover:scale-105 transition w-full py-3 px-5 cursor-pointer'>
            <p className='text-[#808080]'>System Health</p>
            <p className='text-gray-100'>12%</p>
            <p className='text-[#2AD300]'>+156 from last semester</p>
        </div>
        
      </div>
  )
}

export default Total


