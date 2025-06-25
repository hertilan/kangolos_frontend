import React, { useEffect, useState } from 'react';
import { FiInfo, FiCheck, FiAlertTriangle, FiBell, FiMessageSquare} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  content: string;
  date: Date;
  type: 'info' | 'success' | 'warning' | 'error' | 'message';
  read: boolean;
}

const sampleNotifications: Notification[] = [
  {
    id: '1',
    content: 'Your project "AI Research Paper" has been approved by Dr. Mbonabucya',
    date: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    type: 'success',
    read: false
  },
  {
    id: '2',
    content: 'New message from your supervisor: "Please review the feedback on chapter 3"',
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    type: 'message',
    read: false
  },
  {
    id: '3',
    content: 'System maintenance scheduled for tomorrow at 2:00 AM (30 min downtime expected)',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    type: 'warning',
    read: true
  },
  {
    id: '4',
    content: 'Deadline reminder: Final submission for "Blockchain Implementation" due in 3 days',
    date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    type: 'info',
    read: true
  },
  {
    id: '5',
    content: 'Your recent submission requires revisions. Please check the feedback.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    type: 'error',
    read: true
  },
  {
    id: '6',
    content: 'Congratulations! Your paper has been cited by another researcher',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    type: 'success',
    read: true
  }
];

const notificationIcons = {
  info: <FiInfo className="text-blue-500" size={18} />,
  success: <FiCheck className="text-green-500" size={18} />,
  warning: <FiAlertTriangle className="text-yellow-500" size={18} />,
  error: <FiAlertTriangle className="text-red-500" size={18} />,
  message: <FiMessageSquare className="text-indigo-500" size={18} />
};

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        throw new Error('Failed to connect to server'); // Simulate error
        
        // In a real app, you would uncomment this:
        // const response = await fetch('https://api.example.com/notifications');
        // if (!response.ok) throw new Error('Failed to fetch notifications');
        // const data = await response.json();
        // setNotifications(data);
      } catch (err) {
        console.error("Failed to load notifications", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setNotifications(sampleNotifications);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime())) / 1000;
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center w-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mb-4"></div>
        <p className="text-gray-600">Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FiBell className="text-indigo-500" />
          Notifications
        </h2>
        {notifications.some(n => !n.read) && (
          <button 
            onClick={markAllAsRead}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Mark all as read
          </button>
        )}
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-amber-50 text-amber-700 p-3 text-sm flex items-center gap-2"
        >
          <FiInfo className="flex-shrink-0" />
          <span>{error} Showing sample notifications.</span>
        </motion.div>
      )}

      <AnimatePresence>
        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex gap-3">
                  <div className="pt-0.5">
                    {notificationIcons[notification.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!notification.read ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                      {notification.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(notification.date)}
                      {!notification.read && (
                        <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center p-8 text-center"
          >
            <FiInfo className="text-gray-400 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No notifications</h3>
            <p className="text-gray-500 text-sm">You're all caught up!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;