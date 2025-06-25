import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { MdOutlineEmail } from 'react-icons/md'
import { API_URL } from '../config/api'

interface CloseProp{
    onClose: ()=>void

}

const Forget :React.FC<CloseProp>= ({onClose}) => {

     const [forgeting, setForgeting] = useState<boolean>(false)
     const [email, setEmail] = useState<string>('');
         const [loginError, setLoginError] = useState<string>('');

        const handleForget = (event: React.FormEvent<HTMLFormElement>)=>{
        setForgeting(true)
        event.preventDefault();
        fetch(`${API_URL}/user/forget-password`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email})
        })
        .then(async (response)=>{
            const errorData = await response.json()
            setForgeting(false)
            throw new Error('Backend error is: '+ errorData.Message)
        })
        .then((data)=>{
            setForgeting(false)
            if(data){
                console.log(data)
            }
        })
    .catch(error => {
        console.error('Failed to reset password', error)
        setForgeting(false)

        setLoginError('Failed to reset password');
        setTimeout(()=>{
            setLoginError('')
        },3000)
    })
    }
  return (
    <div>
                        <form onSubmit={handleForget} className='space-y-6 grid'>
                        <IoClose size={30} onClick={onClose} className='flex self-end right-0 justify-self-end cursor-pointer hover:text-red-400 transition-colors duration-200 ease-in-out'/>
                        <div className='text-center'>
                            <h1 className='text-[#2C4FFF] text-3xl font-bold mb-2'>Kangalos</h1>
                            <p className='text-gray-500'>Please enter your email addres to reset your password</p>
                        </div>

                        {loginError && (
                            <div className={`p-3 rounded-md text-center ${
                                loginError.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {loginError}
                            </div>
                        )}

                        <div>
                            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                                Email
                            </label>
                            <div className='relative'>
                                <input
                                    id='email'
                                    type='email'
                                    name='email'
                                    placeholder='youremail@example.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10'
                                    required
                                />
                                <MdOutlineEmail 
                                    size={20} 
                                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                                />
                            </div>
                        </div>
                            <button
                            type='submit'
                            disabled={forgeting}
                            className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                                forgeting 
                                    ? 'bg-blue-400 cursor-not-allowed' 
                                    : 'bg-[#2C4FFF] hover:bg-blue-700 cursor-pointer'
                            } transition-colors`}
                        >
                            {forgeting ? 'Sending ...' : 'Send'}
                        </button>

                    </form>
    </div>
  )
}

export default Forget
