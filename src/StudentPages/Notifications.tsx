import React, { useEffect, useState } from 'react'
import { FiInfo } from 'react-icons/fi';
import { FaRegMessage } from "react-icons/fa6";

interface notifications{
  content: string;
  date: Date;
}

const Notifications :React.FC= () => {
  const [yourNotifications, setYourNotifications] = useState<notifications[]>([])

  useEffect(()=>{
    fetch('https://www.binary.com/users/myprojects')
    .then((Response) =>{
      if(!Response.ok) throw new Error('Something wrong has hapened')
      return Response.json()
    })
    .then((data)=>{
      setYourNotifications(data)
    })
    .catch((error)=>{
      console.error("Failed to load notifications", error)
    })
  },[])
  return (
    <div className='w-full grid grid-cols-1'>
      {
        yourNotifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center w-full">
         <FiInfo className="text-orange-300 text-4xl mb-4" />
         <h2 className="text-xl font-semibold text-gray-800 mb-2">No  notifications yet</h2>
         <p className="text-gray-600">It seems like , your notifications storage is empty</p>
        </div>)
      :(
        yourNotifications.map((notification)=>{
          return(
            <div key={notification.content} className='flex flex-row gap-2 p-4 focus:bg-[#c9d9e8] rounded-md'>
              <FaRegMessage size={25} className='text-[#2C4FFF]'/>
              <div className='flex flex-col'>
                <h1 className='text-black'>{notification.content}</h1>
                <p className='text-[#A6A6A6] text-[12px]'>{notification.content.toString()}</p>

              </div>
            </div>
          )
        })
      )

      
      }
      
    </div>
  )
}

export default Notifications
