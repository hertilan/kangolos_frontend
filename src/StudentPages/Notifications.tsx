import React, { useEffect, useState } from 'react'
import { FiInfo } from 'react-icons/fi';
import { FaRegMessage } from "react-icons/fa6";

interface Notification {
  content: string;
  date: Date;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://www.binary.com/users/myprojects');
        if (!response.ok) throw new Error('Failed to fetch notifications');
        const data = await response.json();
        
        // Assuming the API returns an array of notifications
        // You might need to transform the data here based on actual API response
        setNotifications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load notifications", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center w-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
        <p className="text-gray-600">Loading notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center w-full">
        <FiInfo className="text-red-500 text-4xl mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Error loading notifications</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center w-full">
        <FiInfo className="text-orange-300 text-4xl mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">No notifications yet</h2>
        <p className="text-gray-600">It seems like your notifications storage is empty</p>
      </div>
    );
  }

  return (
    <div className='w-full grid grid-cols-1 divide-y divide-gray-200'>
      {notifications.map((notification, index) => (
        <div 
          key={`${notification.content}-${index}`} 
          className='flex flex-row gap-3 p-4 hover:bg-[#c9d9e8] rounded-md transition-colors duration-200'
        >
          <div className="pt-1">
            <FaRegMessage size={20} className='text-[#2C4FFF]'/>
          </div>
          <div className='flex flex-col'>
            <h1 className='text-black text-sm font-medium'>{notification.content}</h1>
            <p className='text-[#A6A6A6] text-xs mt-1'>
              {formatDate(notification.date)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notifications;