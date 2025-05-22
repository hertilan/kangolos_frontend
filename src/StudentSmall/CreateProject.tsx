import React, { useEffect, useState } from 'react'
import Header from './Header'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
 interface Project{
  title: string;
  category: string;
  abstract: string;
  document: File | null; 
 }
const CreateProject :React.FC= () => {
  const [formData,setFormData]= useState<Project>({
    title: '',
    category: '',
    abstract: '',
    document: null


  })
  const [error, setError] = useState<string>('')
  const [errorColor, setErrorColor] = useState('red')
  const [disabled, setDisabled] = useState<boolean>(true)
  const [formError, setFormError] = useState({
    'title': '',
    'category':'',
    'abstract': '',
    'document': ''
  })

useEffect(() => {
  const errors: typeof formError = {
    title: '',
    category: '',
    abstract: '',
    document: ''
  };

  let hasError = false;

  if (!formData.title) {
    errors.title = 'Title is required';
    hasError = true;
  }
  if (!formData.category) {
    errors.category = 'Category is required';
    hasError = true;
  }
  if (!formData.abstract) {
    errors.abstract = 'Abstract is required';
    hasError = true;
  }
  if (formData.document === null) {
    errors.document = 'Document is required';
    hasError = true;
  }

  setFormError(errors);
  setDisabled(hasError);
}, [formData]);


  const handleProject = (e: React.FormEvent) => {
  e.preventDefault();
    const uploadData = new FormData();
  uploadData.append('title', formData.title);
  uploadData.append('category', formData.category);
  uploadData.append('abstract', formData.abstract);
  if (formData.document) {
  uploadData.append('document', formData.document);
  }

    fetch('www.eric.example.com/student/project',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: uploadData
    })
    .then((Response)=>{
      if(!Response.ok){
        if(Response.status === 400){
          setError('Invalid inputs')
          setErrorColor('red')
          setTimeout(()=>{
            setError('')
          },4000)
          throw new Error('Invalid inputs')
        }
        else if(Response.status === 500){
          setError('Internal server error')
          setErrorColor('red')
          setTimeout(()=>{
            setError('')
          },4000)
          throw new Error('Internal server error')
        }

        else{
          setError('An other error has occured')
          setErrorColor('red')
          setTimeout(()=>{
            setError('')
          },4000)
          throw new Error('An other error has occured')
        }

      }
      return Response.json()
    })
    .then((data)=>{
      if(data){
      setError('Project Created successfully!!')
      setErrorColor('green')
      setTimeout(()=>{
        setError('')
      },4000)
      }
      
    })
    .catch((error)=>{
      console.error('Failed to create a project, Try again later', error)
      setError('Failed to create a project. Try again later')
      setErrorColor('red')
      setTimeout(()=>{
        setError('')
      },4000)
    })
  }

  return (
    <div className='min-h-screen max-w-screen text-gray-600 flex flex-col gap-2'>
    <Header/>
    <div className='p-4 py-2 grid grid-cols-1 gap-3'>
    <div className='flex flex-row text-2xl gap-5'>
      <Link to ='/student'>
      <FaArrowLeftLong size={25} className='mt-1 text-gray-700'/>
      </Link>
      <h1 className='text-[#000000]'>Submit Project</h1>
    </div>
    {/* <h1 className='text-gray-900 justify-self-center grid'>Project Submission Form</h1> */}
          
    <form onSubmit={handleProject} className='grid grid-cols-1 justify-self-center gap-2 p-2 rounded-sm border border-gray-400 lg:w-4/5 justify-items-start text-start'>
    <p>Fill in the details of your project and upload all requested documents.</p>
    <p style={{color: errorColor}}>{error}</p>
    <label htmlFor='Title'>Project Title</label>
    <input type='text' name='Title' placeholder='The title of your project ' value={formData.title} onChange={(e)=>{
      setFormData({...formData,title: e.target.value})
    }} className='p-2 rounded-md text-gray-800  border border-gray-300 w-2/3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'/>
    <p className='hidden'>{formError.title}</p>
     <label htmlFor='Category'>Project Category</label>
     <select name='Category' value={formData.category} onChange={(e)=>{
      setFormData({...formData,category:e.target.value})
     }} className='p-2 bg-white rounded-md text-gray-800  border border-gray-300 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500'>
      <option value="" disabled> Select Category</option>
      <option value='Ed-tech'> Edu-Tech</option>
      <option value='Agriculture'>Agriculture</option>
     </select>
     {/* <p>{formError.category}</p> */}
     <label htmlFor='Abstract'>Project Abstract</label>
     <textarea name='Abstract' value={formData.abstract} onChange={(e) => {   setFormData({...formData, abstract: e.target.value})
  }}
  placeholder='Provide a brief summary of your project. (max 500 words)'
  className=' p-2 min-h-[100px] w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y text-gray-800 bg-white'/>
  {/* <p>{formError.abstract}</p> */}
<input 
  type="file" 
  name="document" placeholder='n'
  onChange={(e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, document: e.target.files[0] });
    }
  }}
  className="cursor-pointer hover:text-blue-700 transition-colors duration-300 ease-in-out text-blue-500 gap-5"
  accept="pdf,xls,mpeg,doc,docx"/>
{/* <p>{formError.document}</p> */}

  <div className='w-full grid grid-cols-2 text-gray-200'>
  <Link to='/student' className=' grid text-center rounded-md transition-colors duration-300 ease-in-out bg-red-900 w-fit text-white font-bold px-8 p-2 justify-self-start hover:bg-red-800'>Cancel</Link>
    <button disabled={disabled} type='submit' className={ `grid text-center rounded-md transition-colors duration-300 ease-in-out ${!disabled ? 'bg-[#00628B] hover:bg-[#0984b9] cursor-pointer' :'bg-[#a8e3fc] cursor-not-allowed'} w-fit text-white font-bold px-8 p-2 justify-self-end  `}>Submit</button>

  </div>
    </form>
    </div>
    </div>
  )
}

export default CreateProject
