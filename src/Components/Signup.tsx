import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import axios from 'axios';
import project from '../assets/project.png'


const Signup: React.FC = () => {
    const [Fname, setFName] = useState<string>('')
    const [Lname, setLName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone,setPhone] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confPassword, setConfPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfPassword, setShowConfPassword] = useState<boolean>(false)
    const [signupError,setSignupError] = useState<string>('')
    const [errorColor, setErrorColor] = useState<string>('')

    {/*Handle Sign up */}

    
    const handleSignup = (event: React.FormEvent<HTMLFormElement>) =>{ 
        event.preventDefault()
        axios.post('https://www.eric.com', 
        {
            Fname: Fname,
            Lname: Lname,
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
          setSignupError('Internal server error')
          setErrorColor('red')
          setTimeout(function(){
            setSignupError('')
          },4000) 
          throw new Error('Internal server error') 
        }
        else if(response.status === 404){
            setSignupError('Invalid inputs')
            setErrorColor('red')
            setTimeout(function(){
                setSignupError('')
              },4000)
              throw new Error('Invalid inputs')
        }
        else if(response.status === 400){
            setSignupError('Bad Request')
            setErrorColor('red')
            setTimeout(function(){
                setSignupError('')
              },4000)
              throw new Error('Bad Request')
        }

        return response.statusText;
    })
    .then(function(){
        setSignupError('Signup successfully')
        setErrorColor('green')
        setTimeout(function(){
            setSignupError('')
          },4000)
    })
    .catch(function(error) {
        console.error('Signup error:', error);
        setSignupError('Signup error')
        setErrorColor('red')
        setTimeout(function(){
            setSignupError('')
          },4000)
    });
}
    

  return (
        <div className='grid grid-cols-2 w-screen h-screen'>
        <div style={{ backgroundImage: `url(${project})` }} className='w-full h-full bg-cover bg-center bg-no-repeat'>

        </div>
    <div className='bg-white w-full h-screen grid grid-cols-1 justify-items-center gap-0  px-3'>
        {/* <div className='max-h-screen'>
        <img src={signup} alt='signup' className='w-[85%]'/>
        </div> */}

        {/* Sign up form */}

        <form onSubmit={handleSignup} className=' justify-items-center grid grid-cols-1 gap-2'>
            <h1 className='text-[#2C4FFF] text-[30px]'>FYPMS</h1>
            <p style={{color: errorColor}} className='text-[22px]'>{signupError}</p>
            <h1 className='text-[#000000] text-[30px]'>Welcome Here</h1>
            <p className='text-[#808080] text-[17px]'> Sign up to create your FYPMS account</p>
            <div className='relative'>
            <label htmlFor='First Name' className='grid text-[#000000] text-[16px] justify-self-start mt-3'>Your First Name</label>
            <input type='text' placeholder='Your First name' name='First Name' value={Fname} onChange={function(e){
                setFName(e.target.value)
            }} className=' grid border-[1.5px] border-[#A6A6A6] px-8 p-2 justify-self-start rounded-sm w-[400px] placeholder:text-[#808080] placeholder:text-[14px] text-[14px]'/>
            <FaRegUser size={25} className='absolute top-7.5 right-2'/>
            </div>
            <div className='relative'>
             <label htmlFor='Last Name' className='grid text-[#000000] text-[16px] justify-self-start mt-3'>Your Last Name</label>
            <input type='text' placeholder='Your Last name' name='Last Name' value={Lname} onChange={function(e){
                setLName(e.target.value)
            }} className=' grid border-[1.5px] border-[#A6A6A6] px-8 p-2 justify-self-start rounded-sm w-[400px] placeholder:text-[#808080] placeholder:text-[14px] text-[14px]'/>
            <FaRegUser size={25} className='absolute top-7.5 right-2'/>
            </div>
            <div className='relative'>
            <label htmlFor='Email' className='grid text-[#000000] text-[16px] justify-self-start mt-3'>Email</label>
            <input type='email' placeholder='youremail@example.com' name='Email' value={email} onChange={function(e){
                setEmail(e.target.value)
            }} className=' grid border-[1.5px] border-[#A6A6A6] px-8 p-2 justify-self-start rounded-sm w-[400px] placeholder:text-[#808080] placeholder:text-[14px] text-[14px]'/>
            <MdOutlineEmail size={25} className='absolute top-7.5 right-2'/>
            </div>
            <div className='relative'>
            <label htmlFor='Phone' className='grid text-[#000000] text-[16px] justify-self-start mt-3'>Your phone number</label>
            <input type='tel' placeholder='Your Phone number' name='Phone' value={phone} onChange={function(e){
                setPhone(e.target.value)
            }} className=' grid border-[1.5px] border-[#A6A6A6] px-8 p-2 justify-self-start rounded-sm w-[400px] placeholder:text-[#808080] placeholder:text-[14px] text-[14px]'/>
            <FaPhone size={20} className='absolute top-8 right-2'/>
            </div>
            <div className='grid grid-cols-2 gap-1'>

            <div className='relative'>
            <label htmlFor='Password' className='grid text-[#000000] text-[16px] justify-self-start mt-3'>Password</label>
            <input type={!showPassword ? 'password' : 'text'} placeholder='Create password' name='Password' value={password} onChange={function(e){
                setPassword(e.target.value)
            }} className=' grid border-[1.5px] border-[#A6A6A6] px-8 p-2 justify-self-start rounded-sm placeholder:text-[#808080] placeholder:text-[14px] text-[14px] w-[200px]'/>
            <button type='button' onClick={function(){
                if(!showPassword && password.length>0) setShowPassword(true)
                else setShowPassword(false)
            }} className='absolute top-11 right-2'>{!showPassword ?  <FaRegEyeSlash size={25} />: <FaRegEye size={25} />}
            </button>

            </div>
            <div className='relative'>
            <label htmlFor='Confirm password' className='grid text-[#000000] text-[16px] justify-self-start mt-3'>Confirm password</label>
            <input type={!showConfPassword ? 'password' : 'text'} placeholder='Re-type password' name='First Name' value={confPassword} onChange={function(e){
                setConfPassword(e.target.value)
            }} className=' grid border-[1.5px] border-[#A6A6A6] px-8 p-2 justify-self-start rounded-sm placeholder:text-[#808080] placeholder:text-[14px] text-[14px] w-[200px]'/>
            <button type='button' onClick={function(){

             if(!showConfPassword && confPassword.length > 0) setShowConfPassword(true)
             else setShowConfPassword(false)
            }} className='absolute top-11 right-2'>{!showConfPassword ?  <FaRegEyeSlash size={25} /> : <FaRegEye size={25} />}
            </button>
            </div>
            </div>
            <button type='submit' className='bg-[#2C4FFF] text-white text-center w-[400px] rounded-sm py-2.5 mt-2 hover:bg-blue-700 transition cursor-pointer'>Sign Up</button>
            <p className='text-[#000000] text-[16px]'>Already have an account? <Link to='/login' className='text-[#2C4FFF] cursor-pointer hover:text-blue-800'>Login</Link></p>
            <Link to='/' className='text-[16px] text-[#808080]'> Back to home</Link>
        </form>
      
    </div>
    </div>
  )
}

export default Signup
