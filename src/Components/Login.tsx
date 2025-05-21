import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import axios from 'axios';
import { MdOutlineEmail } from "react-icons/md";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loginError, setLoginError] = useState<string>('')
    const [errorColor,setErrorColor] = useState<string>('red')

    {/* Handle login */}

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) =>{ 
        event.preventDefault()
        axios.post('https://www.eric.com', 
        {

            email: email,
            password: password,
        },
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
    )
    .then(function(response) {
        if (response.status=== 500) {
            setLoginError('Internal server error')
          setErrorColor('red')
          setTimeout(function(){
            setLoginError('')
          },4000) 
          throw new Error('Internal server error') 
        }
        else if(response.status === 404){
            setLoginError('Invalid inputs')
            setErrorColor('red')
            setTimeout(function(){
                setLoginError('')
              },4000)
              throw new Error('Invalid inputs')
        }
        else if(response.status === 400){
            setLoginError('Bad Request')
            setErrorColor('red')
            setTimeout(function(){
                setLoginError('')
              },4000)
              throw new Error('Bad Request')
        }

        return response.statusText;
    })
    .then(function(){
        setLoginError('Signup successfully')
        setErrorColor('green')
        setTimeout(function(){
            setLoginError('')
          },4000)
    })
    .catch(function(error) {
        console.error('Login error:', error);
        setLoginError('Login error')
        setErrorColor('red')
        setTimeout(function(){
            setLoginError('')
          },4000)
    });
}

  return (
    <div className='bg-white w-full h-screen grid grid-cols-1 justify-items-center gap-0 py-[4%]'>
        {/* <div className='max-h-screen'>
        <img src={signup} alt='signup' className='w-[85%]'/>
        </div> */}
              <form onSubmit={handleLogin} className=' justify-items-center'>
            <h1 className='text-[#2C4FFF] text-[30px]'>FYPMS</h1>
            <p style={{color: errorColor}} className='text-[22px]'>{loginError}</p>
            <h1 className='text-[#000000] text-[30px]'>Welcome back</h1>
            <p className='text-[#808080] text-[17px]'> Sign in to access your FYPMS account</p>
             <div className='relative'>
             <label htmlFor='Email' className='grid text-[#000000] text-[16px] justify-self-start mt-3'>Email</label>
             <input type='email' placeholder='youremail@example.com' name='Email' value={email} onChange={function(e){
                 setEmail(e.target.value)
             }} className=' grid border-[1.5px] border-[#A6A6A6] px-8 p-2 justify-self-start rounded-sm w-[400px] placeholder:text-[#808080] placeholder:text-[14px] text-[14px]'/>
             <MdOutlineEmail size={25} className='absolute top-7.5 right-2'/>
             </div>
            <div className='relative'>
            <label htmlFor='Password' className='grid text-[#000000] text-[16px] justify-self-start mt-3'>Password</label>
            <input type={!showPassword ? 'password' : 'text'} placeholder='Create password' name='Password' value={password} onChange={function(e){
                setPassword(e.target.value)
            }} className=' grid border-[1.5px] border-[#A6A6A6] px-8 p-2 justify-self-start rounded-sm placeholder:text-[#808080] placeholder:text-[14px] text-[14px] w-[400px]'/>
            <button type='button' onClick={function(){
                if(!showPassword && password.length>0) setShowPassword(true)
                else setShowPassword(false)
            }} className='absolute top-8 right-1'>{!showPassword ?  <FaRegEyeSlash size={25} />: <FaRegEye size={25} />}
            </button>

            </div>
            <p className='grid justify-self-end text-[#2C4FFF] text-[15px] py-2 '><u>Forgot Password</u></p>
            <button type='submit' className='bg-[#2C4FFF] text-white text-center w-[400px] rounded-sm py-2.5 mt-2 hover:bg-blue-700 transition cursor-pointer'>Login</button>
            <p className='text-[#000000] text-[16px]'>Don't have an account? <Link to='/signup' className='text-[#2C4FFF] cursor-pointer hover:text-blue-800'>Sign Up</Link></p>
            <Link to='/' className='text-[16px] text-[#808080]'> Back to home</Link>
            </form>
    </div>
  )
}

export default Login
