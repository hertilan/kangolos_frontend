import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaWindowClose } from 'react-icons/fa';

interface verify{
    email: string;
    onClose: () => void;
}
const Otp: React.FC<verify> = ({email,onClose}) => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
    const [message, setMessage] = useState<string>('')
    const [color, setColor] = useState<string>('red')
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        fetch('https://kangalos-intern.onrender.com/user/verifyOtp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                otp: otp.join(''),
                email: email // Combine the OTP digits into a single string
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success){ 
                setMessage('Email verified successfully!!')
                setColor('green')
                setTimeout(()=>{
                    navigate('/student/')
                    setMessage('')
                },4000)
            }
        })
        .catch((error) => {
            console.error(error)
            setMessage('Failed to verify email')
            setColor('red')
            setTimeout(()=>{
            setMessage('')
        },4000)
        })
    }

    const handleOtpChange = (index: number, value: string) => {
        if (/^\d*$/.test(value) && value.length <= 1) { // Only allow single digits
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)
            
            // Auto focus to next input
            if (value && index < 5) {
                const nextInput = document.getElementById(`otp-${index + 1}`)
                if (nextInput) nextInput.focus()
            }
        }
    }
        const handleResend = (event: React.FormEvent)=>{
            event.preventDefault()
            fetch('https://kangalos-intern.onrender.com/user/resendOtp',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    email:email
                })
            })
            .then((Response)=>{
                return Response.json()
            })
            .then((data)=>{
                if (data.success) navigate('/')
            })
            .catch((error)=>{
                console.error(error)
            })
    
        }

    return (
        <div className='mt-5 grid grid-cols-1 justify-self-center bg-white justify-items-start text-start shadow-lg  w-fit p-6 rounded-lg relative'>
            <FaWindowClose size={30} className='text-red-400 grid justify-self-end absolute mt-[-45px] mr-[-25px]' onClick={onClose}/>
            <form className='grid grid-cols-1 gap-4' onSubmit={handleSubmit}>
                <p style={{color: color}}>{message}</p>
                <h1 className='text-[#634bc1] text-2xl font-bold'>Verify your Email Address</h1>
                <p>We have sent a verification code to your email {email}, enter it here.   </p>
                <div className='w-fit flex gap-2'>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type='text'
                            name='otp'
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            className='w-12 h-12 p-3 text-center text-gray-700 border rounded'
                            maxLength={1}
                            pattern='\d*'
                        />
                    ))}
                </div>
                <button type='submit' className='bg-[#634bc1] text-white py-2 px-4 rounded hover:bg-[#5340a8]' >
                    Verify
                </button>
                <p>OTP not received? <button type='button' className='text-[#634bc1] font-bold cursor-pointer' onClick={handleResend}>
                    Resend OTP</button></p>
            </form>
        </div>
    )
}

export default Otp