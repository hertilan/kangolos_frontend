import React, { useEffect, useState } from 'react'

const AddUser: React.FC = () => {
    const [users, setUsers] = useState({
        name: '',
        email: '',
        gender: '',
        referenceNumber: '',
        role: '',
        college: '',
        school: '',
        department: ''
    })
    const [inputsError, setInputsError] = useState({
        name: '',
        email: '',
        gender: '',
        referenceNumber: '',
        role: '',
        college: '',
        school: '',
        department: ''
    })
    const [submitMessage, setSubmitMessage] = useState<string>('')
    const [errorColor, setErrorColor] = useState<string>('red')
    const [disabled, setDisabled] = useState<boolean>(true)
    const [ error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(()=>{
       const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


        if(!users.name || !users.email || !users.gender || !users.college || !users.department || !users.referenceNumber || !users.school || !users.role){
            setDisabled(true)
        }
        else if(!emailRegex.test(users.email)){
            setDisabled(true)
            setInputsError({...inputsError,email:'Please enter a valid Email'})
        }
        else{
            setDisabled(false)
            setError('')
            setInputsError({...inputsError,email:''})
        }

    },[users,inputsError])

    const handleUser = (e) => {
        setIsLoading(true)
        e.preventDefault()
        fetch('https://www.binary.com/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(users)
        })
            .then((response) => {
                if (!response.ok) {
                    setSubmitMessage("An error has occured while registering the use!")
                    setErrorColor('red')
                    setIsLoading(false)
                    setTimeout(() => {
                        setSubmitMessage('')
                    }, 4000)
                    throw new Error("An error has occured while registering the use!")
                }
                return response.json()
            })
            .then((data) => {
                if (data.ok) {
                    setSubmitMessage('Submission has gone successfully!!')
                    setIsLoading(false)
                    setErrorColor('green')
                    setTimeout(() => {
                        setSubmitMessage('')
                    }, 4000)
                }
            })
            .catch((error) => {
                console.error('Failed to register the user', error)
                setSubmitMessage('Failed to register the user')
                setIsLoading(false)
                setErrorColor('red')
                setTimeout(() => {
                    setSubmitMessage('')
                }, 4000)
            })
    }
    return (
        <div className='w-full flex justify-center'>
            <form className='flex flex-col items-center gap-3 px-2 w-full max-w-2xl' onSubmit={handleUser}>                
                <div className='w-full flex flex-col items-center'>
                    <h1  style={{color: errorColor}}>{submitMessage}</h1>
                    <h1 className='text-[red]'> {error}</h1>
                    <h1 className='text-xl font-bold text-[#0e0e19]'>Register the user by filling the following form</h1>
                    <label htmlFor='names' className='w-2/3 text-left'>Full names</label>
                    <input
                        type='text'
                        name='names'
                        value={users.name}
                        placeholder="User's full names ..."
                        onChange={(e) => {
                            setUsers({ ...users, name: e.target.value })
                        }}
                        className='p-2 rounded-md text-gray-800 border border-gray-300 w-2/3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                
                <div className='w-full flex flex-col items-center'>
                    <label htmlFor='email' className='w-2/3 text-left'>Email address</label>
                    <input
                        type='email'
                        name='email'
                        value={users.email}
                        placeholder="User's email address ..."
                        onChange={(e) => {
                            setUsers({ ...users, email: e.target.value })
                        }}
                        className={`p-2 rounded-md text-gray-800 border ${!inputsError.email ? 'border-gray-300' : 'border-red-500'} w-2/3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <h1 className='text-red-500 text-start'>{inputsError.email}</h1>
                </div>
                
                <div className='w-full flex flex-col items-center'>
                    <label htmlFor='reference' className='w-2/3 text-left'>Reference number</label>
                    <input
                        type='text'
                        name='reference'
                        value={users.referenceNumber}
                        placeholder="User's Reference number ..."
                        onChange={(e) => {
                            setUsers({ ...users, referenceNumber: e.target.value })
                        }}
                        className='p-2 rounded-md text-gray-800 border border-gray-300 w-2/3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                
                <div className='w-2/3 flex flex-row gap-2'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor='role'>Role</label>
                        <select
                            name='role'
                            value={users.role}
                            onChange={(e) => {
                                setUsers({ ...users, role: e.target.value })
                            }}
                            className='p-2 rounded-md text-gray-800 border border-gray-300 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            <option value='' disabled>Select user's role</option>
                            <option value='Student'>Student</option>
                            <option value='Deen'>Deen</option>
                            <option value='HOD'>Hod</option>
                            <option value='Supervisor'>Supervisor</option>
                        </select>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor='college'>College</label>
                        <select
                            name='college'
                            value={users.college}
                            onChange={(e) => {
                                setUsers({ ...users, college: e.target.value })
                            }}
                            className='p-2 rounded-md text-gray-800 border border-gray-300 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            <option value='' disabled> Select user's college </option>
                            <option value='CST-Nyarugenge'>CST-Nyarugenge</option>
                            <option value='CST-Huye'>CST-Huye</option>
                            <option value='CE-Nyagatare'>CE-Nyagatare</option>
                            <option value='UR-Gikondo'>UR-Gikondo</option>
                            <option value='UR-Musanze'>UR-Musanze</option>
                            <option value='UR-Remera'>UR-Remera</option>
                        </select>
                    </div>
                </div>
                
                <div className='w-2/3 flex flex-row gap-2'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor='scholl'>School</label>
                        <select
                            name='school'
                            value={users.school}
                            onChange={(e) => {
                                setUsers({ ...users, school: e.target.value })
                            }}
                            className='p-2 rounded-md text-gray-800 border border-gray-300 bg-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            <option value='' disabled> Select user's college </option>
                            <option value='CST-Nyarugenge'>CST-Nyarugenge</option>
                            <option value='CST-Huye'>CST-Huye</option>
                            <option value='CE-Nyagatare'>CE-Nyagatare</option>
                            <option value='UR-Gikondo'>UR-Gikondo</option>
                            <option value='UR-Musanze'>UR-Musanze</option>
                            <option value='UR-Remera'>UR-Remera</option>
                        </select>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor='Department'>Department</label>
                        <select
                            name='Department'
                            value={users.department}
                            onChange={(e) => {
                                setUsers({ ...users, department: e.target.value })
                            }}
                            className='p-2 rounded-md text-gray-800 border border-gray-300 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            <option value='' disabled> Select user's school </option>
                            <option value='CST-Nyarugenge'>CST-Nyarugenge</option>
                            <option value='CST-Huye'>CST-Huye</option>
                            <option value='CE-Nyagatare'>CE-Nyagatare</option>
                            <option value='UR-Gikondo'>UR-Gikondo</option>
                            <option value='UR-Musanze'>UR-Musanze</option>
                            <option value='UR-Remera'>UR-Remera</option>
                        </select>
                    </div>
                </div>
                <div className='flex flex-row gap-3'>
                    <label htmlFor='gender'>Male</label>
                    <input type="radio" name="gender" value='Male' onChange={(e)=>{
                        setUsers({...users, gender: e.target.value})
                    }} />
                    <label htmlFor='gender'>Female</label>
                    <input type="radio" name="gender" value='Female' onChange={(e)=>{
                        setUsers({...users, gender: e.target.value})
                    }} />
                </div>
                <button disabled={disabled || isLoading}  className={` flex flex-row items-center justify-center gap-2  w-2/3 px-2 py-1 rounded-md font-bold text-gray-100  transition-colors duration-500 ease-in-out  ${disabled || isLoading    ? 'cursor-not-allowed bg-[#86c3dd]'    : 'cursor-pointer bg-[#00628B] hover:bg-[#3d94bd]'} `}> {isLoading ? 'Adding...' : 'Add User'}
                <div className={` ${isLoading ? 'animate-spin border-t-transparent' : 'hidden'}  border-white border-[3px] rounded-full w-5 h-5`}></div>
                </button>

            </form>
        </div>
    )
}

export default AddUser