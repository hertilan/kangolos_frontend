import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWindowClose } from 'react-icons/fa';

interface VerifyProps {
  email: string;
  onClose: () => void;
}

const Otp: React.FC<VerifyProps> = ({ email, onClose }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [message, setMessage] = useState<string>('');
  const [messageColor, setMessageColor] = useState<string>('red');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendMessage, setResendMessage] = useState<string>('');
  const [resending, setResending] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setMessage('Please enter all 6 digits of the OTP.');
      setMessageColor('red');
      return;
    }

    setIsLoading(true);
    fetch('https://kangalos-intern.onrender.com/user/verifyOtp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp: enteredOtp, email }),
    })
      .then((res) => res.json())
      .then((data) => {
          setMessage('Email verified successfully!');
          setMessageColor('green');
          setTimeout(() => {
            navigate('/student/');
            setMessage('');
          }, 3000);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage('Failed to verify email.');
        setMessageColor('red');
        setIsLoading(false);
        setTimeout(() => setMessage(''), 4000);
      });
  };

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      } else if (!value && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResend = (e: React.FormEvent) => {
    e.preventDefault();
    setResending(true);
    fetch('https://kangalos-intern.onrender.com/user/resendOtp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        
          setResendMessage('Verification code resent successfully!');
          setMessageColor('green');
        setResending(false);
        setTimeout(()=>{
            setResendMessage('')
        },3000)
      })
      .catch((err) => {
        console.error(err);
        setResendMessage('Failed to send verification code.');
        setMessageColor('red');
        setResending(false);
        setTimeout(()=>{
            setResendMessage('')
        },3000)
      });
  };

  return (
    <div className="mt-5 grid grid-cols-1 justify-self-center bg-white justify-items-start text-start shadow-lg w-fit p-6 rounded-lg relative">
      <FaWindowClose
        size={30}
        className="text-red-400 absolute top-[-20px] right-[-20px] cursor-pointer"
        onClick={onClose}
      />
      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        {message && <p style={{ color: messageColor }}>{message}</p>}
        <h1 className="text-[#634bc1] text-2xl font-bold">Verify your Email Address</h1>
        <p>We have sent a verification code to your email <strong>{email}</strong>. Enter it here.</p>
        <div className="w-fit flex gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              name="otp"
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="w-12 h-12 p-3 text-center text-gray-700 border rounded"
              maxLength={1}
              disabled={isLoading}
            />
          ))}
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className={`${
            isLoading ? 'bg-[#9685da] cursor-not-allowed' : 'bg-[#634bc1] hover:bg-[#5340a8]'
          } text-white py-2 px-4 rounded`}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
        <div>
          <p>
            OTP not received?
            <button
              onClick={handleResend}
              type="button"
              className={`ml-2 ${resending ? 'text-[#9685da]' : 'text-[#634bc1]'} font-bold cursor-pointer`}
            >
              {resending ? 'Resending...' : 'Resend OTP'}
            </button>
          </p>
          {resendMessage && <p style={{ color: messageColor }}>{resendMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default Otp;
