import React, { useEffect, useState, useRef } from 'react';
import { IoSend, IoChevronBack, IoClose, IoSearchOutline } from "react-icons/io5";
import { FiAlertCircle, FiMoreVertical } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';
import { BsCheck2All } from "react-icons/bs";

interface Message {
    id: string;
    text: string;
    sender: string;
    time: Date;
    status?: 'sent' | 'sending' | 'failed' | 'read';
    avatar?: string;
}

interface TeamMember {
    id: string;
    name: string;
    status: 'online' | 'offline' | 'away';
    lastActive: string;
    role: string;
}

interface CloseProp {
    onClose: () => void;
}

const Team: React.FC<CloseProp> = ({ onClose }) => {
    const [messageInput, setMessageInput] = useState<string>('');
    const currentUser = 'me';
    const [messages, setMessages] = useState<Message[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
        { id: '1', name: 'Kayitsinga TH', status: 'online', lastActive: '2h ago', role: 'Frontend Lead' },
        { id: '2', name: 'Eric TUYISHIME', status: 'away', lastActive: '30m ago', role: 'Backend Developer' },
        { id: '3', name: 'Merci RUYANGA', status: 'offline', lastActive: '5h ago', role: 'UI/UX Designer' }
    ]);
    const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showSidebar, setShowSidebar] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    // Toggle sidebar on mobile
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    // Auto-close sidebar on mobile when a member is selected
    useEffect(() => {
        if (window.innerWidth < 768 && activeMember) {
            setShowSidebar(false);
        }
    }, [activeMember]);

    // Scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim()) return;
        
        const tempId = Date.now().toString();
        const newMessage: Message = {
            id: tempId,
            text: messageInput,
            sender: currentUser,
            time: new Date(),
            status: 'sending',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        };

        // Optimistic update
        setMessages(prev => [...prev, newMessage]);
        setMessageInput('');

        try {
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update message status
            setMessages(prev => prev.map(msg => 
                msg.id === tempId ? { ...msg, status: 'read' } : msg
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

    const retrySendMessage = async (messageId: string) => {
        const messageToResend = messages.find(msg => msg.id === messageId);
        if (!messageToResend) return;

        setMessages(prev => prev.map(msg => 
            msg.id === messageId ? { ...msg, status: 'sending' } : msg
        ));

        try {
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setMessages(prev => prev.map(msg => 
                msg.id === messageId ? { ...msg, status: 'read' } : msg
            ));
            
        } catch (error) {
            console.error('Message not sent', error);
            setMessages(prev => prev.map(msg => 
                msg.id === messageId ? { ...msg, status: 'failed' } : msg
            ));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Simulated data fetching
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                const mockMessages = [
                    {
                        id: '1',
                        text: 'Hello team! How is the project going?',
                        sender: 'Kayitsinga TH',
                        time: new Date(Date.now() - 3600000),
                        status: 'sent',
                        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                    },
                    {
                        id: '2',
                        text: 'We are making good progress on the frontend. The new design system is coming together nicely!',
                        sender: 'me',
                        time: new Date(Date.now() - 1800000),
                        status: 'read',
                        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
                    },
                    {
                        id: '3',
                        text: 'That sounds great! I\'ve been working on the API endpoints for the new features.',
                        sender: 'Eric TUYISHIME',
                        time: new Date(Date.now() - 900000),
                        status: 'sent',
                        avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
                    }
                ];
                
                setMessages(mockMessages);
                
            } catch (error) {
                console.error('Error fetching messages', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'online': return 'bg-green-500';
            case 'away': return 'bg-yellow-500';
            default: return 'bg-gray-400';
        }
    };

    const filteredMembers = teamMembers.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div 
                ref={popupRef}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative w-full max-w-6xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100"
            >
                {/* Header with close button */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-center">
                        <button 
                            onClick={toggleSidebar}
                            className="md:hidden mr-3 p-1 text-gray-500 hover:text-gray-700"
                        >
                            <IoChevronBack size={20} />
                        </button>
                        <h2 className="text-xl font-bold text-gray-800">Team Chat</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <IoClose size={22} />
                    </button>
                </div>
                
                {/* Main content */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Team members sidebar */}
                    <div className={`${showSidebar ? 'flex' : 'hidden'} md:flex w-full md:w-80 flex-col h-full border-r border-gray-100 bg-gray-50`}>
                        <div className="p-4 border-b border-gray-100 bg-white">
                            <div className="relative">
                                <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search team members..."
                                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="overflow-y-auto flex-1">
                            <h3 className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Team Members ({filteredMembers.length})
                            </h3>
                            {filteredMembers.map((member) => (
                                <div 
                                    key={member.id}
                                    className={`px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors flex items-center ${
                                        activeMember?.id === member.id ? 'bg-blue-50' : ''
                                    }`}
                                    onClick={() => setActiveMember(member)}
                                >
                                    <div className="relative mr-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                                            {member.name.charAt(0)}
                                        </div>
                                        <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-white`}></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-800 truncate">{member.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{member.role}</p>
                                    </div>
                                    <div className="text-xs text-gray-400 ml-2">
                                        {member.lastActive}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat area */}
                    <div className={`${!showSidebar ? 'flex' : 'hidden'} md:flex flex-1 flex-col h-full bg-white`}>
                        {activeMember ? (
                            <>
                                {/* Chat header */}
                                <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between">
                                    <div className="flex items-center">
                                        <button 
                                            onClick={toggleSidebar}
                                            className="md:hidden mr-3 p-1 text-gray-500 hover:text-gray-700"
                                        >
                                            <IoChevronBack size={20} />
                                        </button>
                                        <div className="relative mr-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                                                {activeMember.name.charAt(0)}
                                            </div>
                                            <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(activeMember.status)} rounded-full border-2 border-white`}></div>
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-gray-800">{activeMember.name}</h2>
                                            <p className="text-xs text-gray-500 capitalize">{activeMember.status} • {activeMember.role}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                                        <FiMoreVertical size={18} />
                                    </button>
                                </div>
                                
                                {/* Messages container */}
                                <div className="flex-1 overflow-y-auto p-4 bg-[url('https://uploads-ssl.webflow.com/5f5b3208b507493089d50445/60a3d9d5c717027a1febd8b5_Group%201255.svg')] bg-repeat bg-opacity-5">
                                    {isLoading ? (
                                        <div className="flex justify-center items-center h-full">
                                            <div className="animate-pulse flex flex-col items-center">
                                                <div className="w-16 h-16 rounded-full bg-gray-200 mb-4"></div>
                                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <AnimatePresence>
                                            {messages.map((message) => (
                                                <motion.div
                                                    key={message.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className={`mb-4 flex ${message.sender === currentUser ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div className={`max-w-xs md:max-w-md lg:max-w-lg ${message.sender === currentUser ? 'flex flex-col items-end' : 'flex flex-col items-start'}`}>
                                                        {message.sender !== currentUser && (
                                                            <div className="flex items-center mb-1">
                                                                <span className="text-sm font-medium text-gray-700">
                                                                    {message.sender}
                                                                </span>
                                                                <span className="text-xs text-gray-400 ml-2">
                                                                    {formatTime(new Date(message.time))}
                                                                </span>
                                                            </div>
                                                        )}
                                                        <div
                                                            className={`p-3 rounded-2xl relative ${
                                                                message.sender === currentUser 
                                                                    ? 'bg-blue-500 text-white rounded-br-none' 
                                                                    : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                                                            }`}
                                                        >
                                                            <p className={message.sender === currentUser ? 'text-white' : 'text-gray-800'}>{message.text}</p>
                                                            {message.sender === currentUser && (
                                                                <div className="absolute -bottom-5 right-0 flex items-center">
                                                                    <span className="text-xs text-gray-400 mr-1">
                                                                        {formatTime(new Date(message.time))}
                                                                    </span>
                                                                    {message.status === 'sent' && (
                                                                        <BsCheck2All className="text-gray-400" size={14} />
                                                                    )}
                                                                    {message.status === 'read' && (
                                                                        <BsCheck2All className="text-blue-400" size={14} />
                                                                    )}
                                                                    {message.status === 'failed' && (
                                                                        <div className="flex items-center">
                                                                            <FiAlertCircle className="text-red-500 mr-1" size={14} />
                                                                            <button 
                                                                                onClick={() => retrySendMessage(message.id)}
                                                                                className="ml-1 text-xs text-blue-500 hover:underline"
                                                                            >
                                                                                Retry
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                    {message.status === 'sending' && (
                                                                        <span className="text-xs text-gray-400">Sending...</span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                            <div ref={messagesEndRef} />
                                        </AnimatePresence>
                                    )}
                                </div>
                                
                                {/* Message input */}
                                <form 
                                    onSubmit={handleSendMessage} 
                                    className="sticky bottom-0 bg-white border-t border-gray-100 p-4 shadow-sm"
                                >
                                    <div className="flex items-center rounded-xl bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all">
                                        <input
                                            type="text"
                                            value={messageInput}
                                            onChange={(e) => setMessageInput(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder={`Message ${activeMember?.name.split(' ')[0]}...`}
                                            className="flex-1 p-3 bg-transparent outline-none rounded-l-xl placeholder-gray-500"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!messageInput.trim()}
                                            className={`p-3 rounded-r-xl transition-colors ${
                                                messageInput.trim() 
                                                    ? 'text-blue-500 hover:text-blue-600' 
                                                    : 'text-gray-400 cursor-not-allowed'
                                            }`}
                                        >
                                            <IoSend size={20} />
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Select a team member</h3>
                                <p className="text-gray-500 max-w-md">
                                    Choose a team member from the sidebar to start chatting. Your messages will appear here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Team;