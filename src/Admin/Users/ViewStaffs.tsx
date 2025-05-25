import React, { useEffect, useState } from 'react'
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface staff{

    _id: number;
    name: string;
    email: string;
    gender: string;
    role: string;
    college: string;
    school: string;
    department: string;
}

const ViewStaffs :React.FC= () => {
   const [registeredStaffs, setRegisteredStaffs] = useState<staff[]>([])

    useEffect(()=>{
     fetch('https://www.kangalos.com/users/students')
   
     .then((Response)=>{return Response.json()})
     .then((data)=>{setRegisteredStaffs(data)})
     .catch((error)=>{console.error('Failed to view users',error)})
   
    },[])
  return (
    <div className='grid grid-cols-1 gap-3 w-full'>
      <table className='w-full border bg-white '>
        <thead>
         <tr>
          <th className='border border-gray-700'>Id</th>
          <th className='border border-gray-700'>Names</th>
          <th className='border border-gray-700'>Email</th>
          <th className='border border-gray-700'>Gender</th>
          <th className='border border-gray-700'>Role</th>
          <th className='border border-gray-700'>College</th>
          <th className='border border-gray-700'>School</th>
          <th className='border border-gray-700'>Department</th>
          <th className='border border-gray-700'>Action</th>
         </tr>
        </thead>
        <tbody>
         { registeredStaffs.length === 0 ?(
         <tr>
          <td colSpan='100%' className="text-center text-xl text-gray-700 p-2">No staffs available in the system
          </td>
         </tr>)
            :
            (
          registeredStaffs.map((student) =>{
           return(
          <tr key={student._id}>
           <td className='border border-gray-700'> {student._id} </td>
           <td className='border border-gray-700'> {student.name} </td>
           <td className='border border-gray-700'> {student.email} </td>
           <td className='border border-gray-700'> {student.gender} </td>
           <td className='border border-gray-700'> {student.role} </td>
           <td className='border border-gray-700'> {student.college} </td>
           <td className='border border-gray-700'> {student.school} </td>
           <td className='border border-gray-700'> {student.department} </td>
           <td className='border border-gray-700 flex flex-row gap-4'>
            <button type='button'>
            <FaUserEdit size={25} className='text-gray-800 hover:text-red-400 cursor-pointer transition-colors duration-300 ease-in-out'/>
            </button>
            <button type='button'>
            <MdDelete size={25} className='text-gray-800 hover:text-red-400 cursor-pointer transition-colors duration-300 ease-in-out'/>
            </button></td>
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

export default ViewStaffs 