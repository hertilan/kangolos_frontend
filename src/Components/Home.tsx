import React from 'react';
import { FaFacebook } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import logo from '../assets/logo.png';
import students from '../assets/students.png';
import ai1 from '../assets/ai1.png';
import ai2 from '../assets/ai2.png';
import ai3 from '../assets/ai3.png';
import discussion from '../assets/discussion.png';
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className='relative min-h-screen grid grid-cols-1 gap-6'> {/* Added relative for containing absolute elements */}
      {/* Sticky Navbar */}
      <nav className='sticky top-0 z-50 backdrop-blur-sm t0p-0 px-4 grid grid-cols-2 items-center w-full'>
        <img src={logo} alt='logo' className='w-16'/>
        <div className='flex justify-end'>
          <ul className='flex gap-10 text-[#050404] text-[20px] overflow-x-auto'>
            <li className='cursor-pointer hover:text-blue-600'>About</li>
            <li className='cursor-pointer hover:text-blue-600'>How we work?</li>
            <li className='cursor-pointer hover:text-blue-600'>Contact us</li>
            <li>
              <button type='button' className='bg-[#2C4FFF] text-white font-bold px-10 py-1 rounded-[20px] hover:bg-blue-700 transition cursor-pointer'>
                <Link to = '/login'>Login</Link>
                
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className='grid grid-cols-1 justify-items-center  pl-20 '>
      <div className='relative w-full py-8'> {/* Added relative for absolute children */}
        <div className='max-w-7xl mx-auto grid md:grid-cols-2 items-center'>
          {/* Left Content */}
          <div className='grid grid-cols-1 gap-3 '>
            <h1 className='text-[#000C4A] text-[40px] md:text-5xl font-bold leading-12 '>
              Students Projects Management
            </h1>
            <p className='text-[#000C4A] text-xl md:text-2xl leading-7'>
              A comprehensive platform for University of Rwanda students to submit, manage, and showcase their final year projects.
            </p>
            <div className='grid grid-cols-[1fr_2fr] gap-4 items-start'>
              <Link 
                type='button' to ='/signup' 
                className='bg-[#2C4FFF] text-white px-8 py-3 rounded-[20px] text-xl font-medium hover:bg-blue-700 transition cursor-pointer'
              >
                Register Now
              </Link>
              <p className='text-[#000c4A] text-sm md:text-base'>
                Take control of your academic journey with a smart, intuitive Student Management System designed to help you stay organized, informed, and focused.
              </p>
            </div>
          </div>

          {/* Right Image with Floating Buttons */}
          <div className='relative'>
            <img 
              src={students} 
              alt='students' 
              className='w-full h-auto max-h-[400px] object-contain'
            />
            
            {/* Floating Buttons */}
            <button type='button' className='absolute bg-white text-[#000c4A] text-xl rounded-[10px] p-3 shadow-lg hover:scale-105 transition cursor-pointer mx-[22%] my-[-70%]'>
              Elevate
            </button>
            <button className='absolute bg-white text-[#000c4A] text-xl rounded-[10px] p-3 shadow-lg hover:scale-105 transition cursor-pointer mx-[22%] my-[-14%]'>
              Advance
            </button>
            <button className='absolute bg-white text-[#000c4A] text-xl rounded-[10px] p-3 shadow-lg hover:scale-105 transition cursor-pointer mx-[70%] my-[-40%]'>
              Grow
            </button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className='max-w-4xl mx-auto py-6 px-4 text-center'>
        <h1 className='text-[#000C4A] text-3xl md:text-2xl font-bold '>
          How Kangalos Works
        </h1>
        <p className='text-[#000C4A] text-lg md:text-xl leading-6'>
          Our Student Management System brings together modern technology and seamless design to make learning more efficient, engaging, and stress-free.
        </p>
      </div>

      {/* Ai Images division */}

      <div className='grid grid-cols-3 w-full justify-self-center justify-items-center '>

        <div className='grid grid-cols-1 justify-self-center'>
            <img src={ai1} alt='Ai1' className='w-[60%] '/>
            <h1 className='text-[#000C4A] text-3xl md:text-2xl font-bold mb-6'>
                Project Submission
            </h1>
            <p className='text-[#000c4A] text-sm md:text-base'>
                Students can easly submit their final anually projects including all documentation and files
            </p>
        </div>
        <div className='grid grid-cols-1 justify-self-center'>
            <img src={ai2} alt='Ai1' className='w-[60%]'/>
            <h1 className='text-[#000C4A] text-3xl md:text-4xl font-bold mb-6'>
                Project Submission
            </h1>
            <p className='text-[#000c4A] text-sm md:text-base'>
                Students can easly submit their final anually projects including all documentation and files
            </p>
        </div>
        <div className='grid grid-cols-1 justify-self-center'>
            <img src={ai3} alt='Ai3' className='w-[60%]'/>
            <h1 className='text-[#000C4A] text-3xl md:text-4xl font-bold mb-6'>
                Project Submission
            </h1>
            <p className='text-[#000c4A] text-sm md:text-base'>
                Students can easly submit their final anually projects including all documentation and files
            </p>
        </div>
      </div>
      <div className='max-w-4xl mx-auto py-6 px-4 text-center'>
      <h1 className='text-[#000C4A] text-3xl md:text-4xl font-bold mb-6'>
                About Kangalos
            </h1>
            <p className='text-[#808080] text-[19px] leading-6'>
            The Final Year Project Management System (FYPMS) is designed to streamline the   process of managing final year projects at the University of Rwanda. 
            </p>
      </div>

      {/* Discussion Division */}

      <div className='w-full grid grid-cols-[1.3fr_2fr] gap-2.5'>

        <img src={discussion} alt='discussion'/>

        <div className='grid grid-cols-1 w-[90%]'>
            {/* Mission */}
            <div>
            <h1 className='text-[#000C4A] text-2xl md:text-4xl font-bold mb-6'>
                Our Mission 
            </h1>
            <p className='text-[#808080] text-[17px] leading-6'>
            To provide a centralized platform that simplifies project submission, review, and publication, while creating a valuable repository of knowledge for future generations of students.
            </p>
            </div>
            <div>
            <h1 className='text-[#000C4A] text-2xl md:text-4xl font-bold mb-6'>
                Key benefits 
            </h1>
            <ul className=' list-disc list-inside text-[#808080] text-[17px]'>
                <li>Streamlined project submission and management</li>
                <li>Efficient review and feedback process</li>
                <li>Searchable repository of past projects</li>
                <li>Transparent communication between students and supervisors</li>
                <li>Simplified administrative oversight</li>
            </ul>
            </div>
        </div>

      </div>
      {/* Start now division */}

      <div className='grid grid-cols-1 w-[30%] justify-self-center'>

        <button type='button' className='bg-[#000000] text-white text-center px-6 py-3 rounded-[20px] mb-5 cursor-pointer hover:bg-[#302f2f] transition-all'> Start Now</button>
        <h1 className='text-center text-[#000C4A] text-[24px]'>Reach out</h1>
        <hr className='text-[#000C4A] w-1/2 justify-self-center '/>
        <div className=' grid grid-cols-2 py-4 gap-1'>
            <div className='flex flex-row gap-2 text-[#000C4A]'><FaWhatsapp size={20}/><span>+250-799-909-094</span></div>
            <div className='flex flex-row gap-2 text-[#000C4A]'><FaInstagram size={20}/><span>@kangalos_system</span></div>
            <div className='flex flex-row gap-2 text-[#000C4A]'><FaPhone size={20}/><span>+250-799-909-094</span></div>
            <div className='flex flex-row gap-2 text-[#000C4A]'><FaFacebook size={20}/><span>@kangalos_system</span></div>
        </div>
        

      </div>

    </div>
    {/*  Footer div*/}
    <div className='grid grid-cols-1 bg-[#000C4A] w-full right-0 justify-items-center  pt-6'>
        <ul className='flex flex-row text-white text-[19px] gap-6'>
            <li className='font-bold cursor-pointer hover:text-[#93fe93] transition'>Kangalos</li>
            <li className='font-sans cursor-pointer hover:text-[#93fe93] transition'>About</li>
            <li className='font-sans cursor-pointer hover:text-[#93fe93] transition'>How we work</li>
            <li className='font-sans cursor-pointer hover:text-[#93fe93] transition'>Login</li>
            <li className='font-sans cursor-pointer hover:text-[#93fe93] transition'>Register</li>
        </ul>
        <div className='grid grid-cols-1 bg-[#000000] w-full right-0 justify-items-center  py-2 mt-6 bottom-0'>
            <p className='text-white'>© 2025 University of Rwanda. All rights reserved.</p>
        </div>
    </div>

    </div>
  );
};

export default Home;