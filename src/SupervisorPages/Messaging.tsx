import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiPaperclip, FiUsers, FiSearch, FiChevronDown } from 'react-icons/fi';

interface Message {
  id: string;
  text: string;
  sender: string;
  time: Date;
  status: 'sending' | 'sent' | 'failed' | 'delivered' | 'read';
}

interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  role: string;
}

const SupervisorMessages: React.FC = () => {
  const [messageInput, setMessageInput] = useState<string>('');
  const currentUser = 'Supervisor';
  const [messages, setMessages] = useState<Message[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showMembers, setShowMembers] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch team members when showMembers is true
  useEffect(() => {
    if (showMembers) {
      const fetchTeamMembers = async () => {
        setIsLoading(true);
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Mock data - replace with actual API call
          const mockMembers: TeamMember[] = [
            { id: '1', name: 'Kayitsinga TH', role: 'Developer' },
            { id: '2', name: 'Eric TUYISHIME', role: 'Designer' },
            { id: '3', name: 'Merci RUYANGA', role: 'QA Engineer' },
            { id: '4', name: 'Alice MUKESHIMA', role: 'Project Manager' },
            { id: '5', name: 'Bob IRADUKUNDA', role: 'Frontend Dev' },
          ];
          
          setTeamMembers(mockMembers);
        } catch (error) {
          console.error('Error fetching team members:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchTeamMembers();
    }
  }, [showMembers]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    const tempId = Date.now().toString();
    const newMessage: Message = {
      id: tempId,
      text: messageInput,
      sender: currentUser,
      time: new Date(),
      status: 'sending'
    };

    // Optimistic update
    setMessages(prev => [...prev, newMessage]);
    setMessageInput('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update message status
      setMessages(prev => prev.map(msg => 
        msg.id === tempId ? { ...msg, status: 'sent' } : msg
      ));
      
    } catch (error) {
      console.error('Message not sent', error);
      // Update message status to failed
      setMessages(prev => prev.map(msg => 
        msg.id === tempId ? { ...msg, status: 'failed' } : msg
      ));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const generateAvatar = (name: string) => {
    const initials = name.split(' ').map(n => n[0]).join('');
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-medium">
        {initials}
      </div>
    );
  };

  return (
    <div className="flex h-full bg-gray-50 rounded-xl overflow-hidden">
      {/* Sidebar - Collapsible Team Members */}
      <div className={`${showMembers ? 'w-64' : 'w-0'} md:w-64 transition-all duration-300 border-r border-gray-200 bg-white flex flex-col overflow-hidden`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Team Members</h2>
          <button 
            onClick={() => setShowMembers(false)}
            className="md:hidden p-1 text-gray-500 hover:text-gray-700"
          >
            <FiChevronDown className="transform rotate-90" />
          </button>
        </div>
        
        <div className="relative p-2 border-b border-gray-200">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search members..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            teamMembers.map(member => (
              <div
                key={member.id}
                className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              >
                {generateAvatar(member.name)}
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">{member.name}</h3>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center">
            <button 
              onClick={() => setShowMembers(!showMembers)}
              className="mr-3 p-2 text-gray-700 hover:bg-gray-200 rounded-full md:hidden"
            >
              <FiUsers />
            </button>
            <div>
              <h3 className="font-semibold text-gray-900">Development Team</h3>
              <p className="text-xs text-gray-500">
                {teamMembers.length > 0 
                  ? `${teamMembers.length} members online` 
                  : 'Loading team...'}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            {teamMembers.slice(0, 3).map(member => (
              <div key={member.id} className="hidden md:block">
                {generateAvatar(member.name)}
              </div>
            ))}
            {teamMembers.length > 3 && (
              <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-600 text-xs font-medium">
                +{teamMembers.length - 3}
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">No messages yet</h3>
              <p className="text-gray-500 max-w-md">
                Start the conversation with your team. Type a message below to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === currentUser ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender !== currentUser && (
                    <div className="mr-2">
                      {generateAvatar(message.sender)}
                    </div>
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === currentUser
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-white border border-gray-200 rounded-bl-none'
                    } ${
                      message.status === 'failed' ? 'bg-red-100 text-red-800' : ''
                    }`}
                  >
                    {message.sender !== currentUser && (
                      <p className="text-xs font-medium text-gray-700 mb-1">{message.sender}</p>
                    )}
                    <p>{message.text}</p>
                    <div className={`flex items-center justify-end mt-1 text-xs ${
                      message.sender === currentUser ? 'text-indigo-200' : 'text-gray-500'
                    }`}>
                      <span>{message.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {message.sender === currentUser && (
                        <span className="ml-1">
                          {message.status === 'sending' && '🕒'}
                          {message.status === 'sent' && '✓'}
                          {message.status === 'failed' && '✕'}
                          {message.status === 'delivered' && '✓✓'}
                          {message.status === 'read' && '✓✓✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
              <FiPaperclip />
            </button>
            <input
              type="text"
              placeholder="Type a message to the team..."
              className="flex-1 mx-2 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              type="submit"
              className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50"
              disabled={!messageInput.trim()}
            >
              <FiSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupervisorMessages;