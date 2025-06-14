import React, { useEffect, useState, useRef } from 'react';
import Header from '../StudentSmall/Header';
import { IoSend } from "react-icons/io5";
import { FiAlertCircle } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    text: string;
    sender: string;
    time: Date;
    status?: 'sent' | 'sending' | 'failed';
}

const Team: React.FC = () => {
    const [messageInput, setMessageInput] = useState<string>('');
    const currentUser = 'me';
    const [messages, setMessages] = useState<Message[]>([]);
    const [teamMembers, setTeamMembers] = useState<string[]>(['Kayitsinga TH', 'Eric TUYISHIME', 'Merci RUYANGA']);
    const [activeMember, setActiveMember] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

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
            status: 'sending'
        };

        // Optimistic update
        setMessages(prev => [...prev, newMessage]);
        setMessageInput('');

        try {
            const response = await fetch('https://www.binary.com/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    message: messageInput,
                    user: currentUser
                })
            });

            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            
            // Update message status
            setMessages(prev => prev.map(msg => 
                msg.id === tempId ? { ...msg, id: data.id, status: 'sent' } : msg
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
            const response = await fetch('https://www.binary.com/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    message: messageToResend.text,
                    user: currentUser
                })
            });

            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            
            setMessages(prev => prev.map(msg => 
                msg.id === messageId ? { ...msg, id: data.id, status: 'sent' } : msg
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
                const [receivedRes, sentRes] = await Promise.all([
                    fetch('https://www.binary.com/api/messages/received'),
                    fetch('https://www.binary.com/api/messages/sent')
                ]);

                if (!receivedRes.ok || !sentRes.ok) {
                    throw new Error('Network response was not ok');
                }

                const [receivedData, sentData] = await Promise.all([
                    receivedRes.json(),
                    sentRes.json()
                ]);

                setMessages([
                    ...receivedData.map((msg: any) => ({ ...msg, time: new Date(msg.time), status: 'sent' })),
                    ...sentData.map((msg: any) => ({ ...msg, time: new Date(msg.time), status: 'sent' }))
                ]);
                
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

    return (
        <div className='h-screen flex flex-col bg-gray-50'>
            <Header />
            
            <div className='flex flex-row flex-1 overflow-hidden'>
                {/* Team members sidebar */}
                <div className='w-72 flex flex-col h-full border-r bg-white'>
                    <div className='p-4 border-b'>
                        <h2 className='text-xl font-bold text-gray-800'>Team Members</h2>
                    </div>
                    <div className='overflow-y-auto flex-1'>
                        {teamMembers.map((member, index) => (
                            <div 
                                key={index}
                                className={`p-3 hover:bg-gray-100 cursor-pointer transition-colors flex items-center ${
                                    activeMember === member ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                                }`}
                                onClick={() => setActiveMember(member)}
                            >
                                <div className='w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold mr-3'>
                                    {member.charAt(0)}
                                </div>
                                <div>
                                    <p className='font-medium text-gray-800'>{member}</p>
                                    <p className='text-xs text-gray-500'>Last active: 2h ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat area */}
                <div className='flex-1 flex flex-col h-full'>
                    {/* Chat header */}
                    <div className='p-4 border-b bg-white flex items-center'>
                        {activeMember ? (
                            <>
                                <div className='w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold mr-3'>
                                    {activeMember.charAt(0)}
                                </div>
                                <div>
                                    <h2 className='font-bold text-gray-800'>{activeMember}</h2>
                                    <p className='text-xs text-gray-500'>Online</p>
                                </div>
                            </>
                        ) : (
                            <h2 className='font-bold text-gray-800'>Team Chat</h2>
                        )}
                    </div>
                    
                    {/* Messages container */}
                    <div className='flex-1 overflow-y-auto p-4 bg-gray-50'>
                        {isLoading ? (
                            <div className='flex justify-center items-center h-full'>
                                <div className='animate-pulse flex flex-col items-center'>
                                    <div className='w-16 h-16 rounded-full bg-gray-200 mb-4'></div>
                                    <div className='h-4 bg-gray-200 rounded w-3/4'></div>
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
                                        <div className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl ${message.sender === currentUser ? 'flex flex-col items-end' : 'flex flex-col items-start'}`}>
                                            <div className={`flex items-center mb-1 ${message.sender === currentUser ? 'justify-end' : 'justify-start'}`}>
                                                <span className={`text-sm font-medium ${message.sender === currentUser ? 'text-blue-600' : 'text-green-600'}`}>
                                                    {message.sender === currentUser ? 'You' : message.sender}
                                                </span>
                                                <span className='text-xs text-gray-500 ml-2'>
                                                    {formatTime(new Date(message.time))}
                                                </span>
                                            </div>
                                            <div
                                                className={`p-3 rounded-lg relative ${
                                                    message.sender === currentUser 
                                                        ? 'bg-blue-500 text-white rounded-tr-none' 
                                                        : 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                                                }`}
                                            >
                                                <p>{message.text}</p>
                                                {message.status === 'failed' && (
                                                    <div className='absolute -bottom-5 right-0 flex items-center'>
                                                        <FiAlertCircle className='text-red-500 mr-1' size={14} />
                                                        <span className='text-xs text-red-500'>Failed to send</span>
                                                        <button 
                                                            onClick={() => retrySendMessage(message.id)}
                                                            className='ml-2 text-xs text-blue-500 hover:underline'
                                                        >
                                                            Retry
                                                        </button>
                                                    </div>
                                                )}
                                                {message.status === 'sending' && (
                                                    <div className='absolute -bottom-5 right-0 flex items-center'>
                                                        <span className='text-xs text-gray-500'>Sending...</span>
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
                        className='sticky bottom-0 bg-white border-t p-4 shadow-sm'
                    >
                        <div className='flex items-center rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all'>
                            <input
                                type='text'
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder='Type your message...'
                                className='flex-1 p-3 outline-none rounded-l-lg placeholder-gray-400'
                            />
                            <button
                                type="submit"
                                disabled={!messageInput.trim()}
                                className={`p-3 rounded-r-lg transition-colors ${
                                    messageInput.trim() 
                                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                <IoSend size={20} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Team;