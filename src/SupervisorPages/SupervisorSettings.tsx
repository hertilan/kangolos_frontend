import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiBell, FiCreditCard, FiGlobe, FiMoon, FiLogOut } from 'react-icons/fi';

const SupervisorSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [formData, setFormData] = useState({
    name: 'Supervisor Name',
    email: 'supervisor@example.com',
    phone: '+250 78X XXX XXX',
    language: 'English',
    timezone: 'GMT+2 (Central Africa Time)'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (API call would go here)
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'profile', icon: <FiUser />, label: 'Profile' },
    { id: 'security', icon: <FiLock />, label: 'Security' },
    { id: 'notifications', icon: <FiBell />, label: 'Notifications' },
    { id: 'billing', icon: <FiCreditCard />, label: 'Billing' },
    { id: 'preferences', icon: <FiGlobe />, label: 'Preferences' }
  ];

  return (
    <div className="flex flex-col md:flex-row h-full bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-md p-4">
        <h2 className="text-xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">Settings</h2>
        <nav className="space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-3">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
          <button className="flex items-center w-full px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 mt-6">
            <span className="mr-3"><FiLogOut /></span>
            Log Out
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <FiUser className="mr-2" /> Profile Information
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Timezone</label>
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                  >
                    <option>GMT+2 (Central Africa Time)</option>
                    <option>GMT+1 (West Africa Time)</option>
                    <option>GMT+0 (Greenwich Mean Time)</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <FiLock className="mr-2" /> Security Settings
            </h3>
            
            <div className="space-y-6">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-medium mb-2">Change Password</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Ensure your account is using a long, random password to stay secure.
                </p>
                <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Change Password
                </button>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Add additional security to your account using two-factor authentication.
                </p>
                <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Enable 2FA
                </button>
              </div>
              
              <div className="p-4 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-medium mb-2 text-red-600 dark:text-red-400">Danger Zone</h4>
                <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button className="px-4 py-2 text-sm border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <FiBell className="mr-2" /> Notification Preferences
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive push notifications on your device
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive important updates via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-medium mb-2">Notification Sounds</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Customize the sounds for different notification types
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700">
                    <option>Default Sound</option>
                    <option>Chime</option>
                    <option>Bell</option>
                    <option>None</option>
                  </select>
                  <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Test Sound
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <FiCreditCard className="mr-2" /> Billing Information
            </h3>
            
            <div className="space-y-6">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-medium mb-2">Current Plan</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">Premium Plan</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">$29/month</p>
                  </div>
                  <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Change Plan
                  </button>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-medium mb-4">Payment Methods</h4>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-6 bg-blue-500 rounded mr-3"></div>
                    <span>•••• •••• •••• 4242</span>
                  </div>
                  <button className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                    Remove
                  </button>
                </div>
                <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Add Payment Method
                </button>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-medium mb-4">Billing History</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap">Jun 15, 2023</td>
                        <td className="px-4 py-2 whitespace-nowrap">$29.00</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Paid</span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <button className="text-indigo-600 dark:text-indigo-400 hover:underline">Download</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap">May 15, 2023</td>
                        <td className="px-4 py-2 whitespace-nowrap">$29.00</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Paid</span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <button className="text-indigo-600 dark:text-indigo-400 hover:underline">Download</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <FiGlobe className="mr-2" /> Preferences
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium">Dark Mode</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Switch between light and dark theme
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-medium mb-2">Language</h4>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                >
                  <option>English</option>
                  <option>French</option>
                  <option>Kinyarwanda</option>
                  <option>Swahili</option>
                </select>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-medium mb-2">Timezone</h4>
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                >
                  <option>GMT+2 (Central Africa Time)</option>
                  <option>GMT+1 (West Africa Time)</option>
                  <option>GMT+0 (Greenwich Mean Time)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupervisorSettings;