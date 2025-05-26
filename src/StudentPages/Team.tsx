import React, { useEffect, useState } from 'react';
import Header from '../StudentSmall/Header';
import { IoSend } from "react-icons/io5";

interface Message {
    text: string;
    sender: string;
    time: Date;
}

const Team: React.FC = () => {
    const [messageInput, setMessageInput] = useState<string>('');
    const currentUser = 'me';
    const [received, setReceived] = useState<Message[]>([]);
    const [sent, setSent] = useState<Message[]>([]);
    const [notSent, setNotSent] = useState<boolean>(false)

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim()) return;
        
        fetch('https://www.binary.com/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                message: messageInput,
                user: currentUser
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            if (data.ok) {
                // Add the sent message to local state for immediate display
                const newMessage: Message = {
                    text: messageInput,
                    sender: currentUser,
                    time: new Date()
                };
                setSent(prev => [...prev, newMessage]);
                setMessageInput('');
            }
        })
.catch((error) => {
    console.error('Message not sent', error);
    const failedMessage: Message = {
        text: messageInput,
        sender: currentUser,
        time: new Date()
    };
    setSent(prev => [...prev, failedMessage]);
    setMessageInput('');
    setNotSent(true)
});
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    useEffect(() => {
        fetch('https://www.binary.com/api/messages/received')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setReceived(data);
        })
        .catch((error) => {
            console.error('An error occurred while fetching received messages', error);
        });

        fetch('https://www.binary.com/api/messages/sent')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setSent(data);
        })
        .catch((error) => {
            console.error('An error occurred while fetching sent messages', error);
        });
    }, []);

    return (
        <div className='h-screen flex flex-col max-w-screen'>
            <Header />

            <div className='max-w-full flex flex-row justify-center h-full'>
                {/* Team members */}
                <div className='w-1/3 flex flex-col h-full border-r p-4'>
                    <h2 className='text-lg font-semibold mb-4'>Team Members</h2>
                    {/* Add team members list here */}
                </div>

                {/* Message box */}
                <div className='w-full flex flex-col justify-between h-full'>
                    {/* messages */}
                    <div className='flex flex-col w-full p-4 bg-white h-full'>
                        {/* Received messages */}
                        {received.map((message, index) => (
                            <div 
                                key={`received-${index}`} 
                                className="mb-3 flex flex-col items-start"
                            >
                                <p className='text-green-500 font-medium'>{message.sender}</p>
                                <div className="bg-gray-100 p-3 rounded-lg max-w-xs md:max-w-md">
                                    <p className='text-gray-800'>{message.text}</p>
                                </div>
                                <p className='text-xs text-gray-500 mt-1'>
                                    {new Date(message.time).toLocaleTimeString()}
                                </p>
                            </div>
                        ))}
                        
                        {/* Sent messages */}
                        {sent.map((message, index) => (
                            <div 
                                key={`sent-${index}`} 
                                className="mb-3 flex flex-col items-end"
                            >
                                <p className='text-blue-500 font-medium'>You</p>
                                <div className="bg-blue-100 p-3 rounded-lg max-w-xs md:max-w-md">
                                    <p className='text-gray-800'>{message.text || messageInput}</p>
                                </div>
                                <p className='text-xs text-gray-500 mt-1'>
                                    {new Date(message.time).toLocaleTimeString()}
                                </p>
                            </div>
                        ))}
                    </div>
                    
                    {/* input area */}
                    <form onSubmit={handleSendMessage} className='sticky bottom-0 flex w-full flex-row bg-gray-100 items-center p-3 border-t'>
                        <input 
                            type='text' 
                            name='messageInput' 
                            value={messageInput} 
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder='Your Message...' 
                            className='p-2 rounded-md text-gray-800 border border-gray-300 w-full bg-white focus:outline-none focus:ring-1 focus:ring-blue-500'
                        />
                        <button 
                            type="submit"
                            className='p-2 hover:bg-gray-200 rounded-full ml-2'
                            disabled={!messageInput.trim()}
                        >
                            <IoSend size={24} className="text-blue-500" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Team;