import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { postUserRegistration } from '../redux/Authentication/action';
import toast, { Toaster } from 'react-hot-toast';
export const Signup = () => {
    const [newUserdata, setnewUserData] = useState({ username: "", email: "", password: "" })
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setnewUserData(prev => {
            return { ...prev, [name]: value }
        })
    }

    const handlePostUser = async(e) => {
        e.preventDefault();
        const status = await dispatch(postUserRegistration(newUserdata))
        if(status===201){
            toast.error("Use different email address.",{
                style: {
                    borderRadius: '10px',
                    background: 'whitesmoke',
                    color: 'black',
                  },
            })
        }else if(status===200){
            toast.success("You have successfully registered!",{
                icon:"🎉",
                style: {
                    borderRadius: '10px',
                    background: 'whitesmoke',
                    color: 'black',
                  },
            })
        }
    }
  return (
    <div className='flex justify-center items-center'>
    <div>
    <Toaster />
    </div>
      <form onSubmit={handlePostUser} className='mt-20 mx-4 max-w-md md:max-w-l w-full relative bg-indigo-500/90 rounded-md flex flex-col items-center gap-3 p-7 shadow-[0px_15px_25px_rgba(109,71,222,0.15),0px_5px_10px_rgba(77,79,179,0.22)]'>
      <div className='w-full text-white flex flex-col items-center gap-3'>
                        <input
                            onChange={handleInputChange}
                            type="text"
                            name="username"
                            value={newUserdata.username}
                            placeholder='Enter your username'
                            required
                            className='bg-transparent border-b focus:border-none px-2 py-1 rounded-sm w-[90%]  outline-none focus:outline-indigo-400 focus:outline-[3px]'
                        />
                        <input
                            onChange={handleInputChange}
                            type="email"
                            name="email"
                            required
                            value={newUserdata.email}
                            placeholder='Enter your Email Id'
                            className='bg-transparent border-b focus:border-none px-2 py-1 rounded-sm w-[90%] my-6 outline-none focus:outline-indigo-400 focus:outline-[3px]'
                        />
                        <input
                            onChange={handleInputChange}
                            type="password"
                            name="password"
                            value={newUserdata.password}
                            placeholder='Enter password'
                            required
                            className='bg-transparent border-b focus:border-none px-2 py-1 rounded-sm w-[90%] outline-none focus:outline-indigo-400 focus:outline-[3px]'
                        />
                        <input type='submit' value="SIGN UP" className='bg-white text-black py-2 px-8 my-5 rounded-lg  space-x-9 hover:scale-105 active:scale-95 active:shadow-[0px_2px_4px_rgba(0,0,0,0.4),0px_7px_13px_-3px_rgba(0,0,0,0.3)] transition-all duration-150 shadow-[0px_2px_4px_rgba(0,0,0,0.4),0px_7px_13px_-3px_rgba(0,0,0,0.3),0px_-3px_0px_inset_rgba(0,0,0,0.2)]'/>
                        <p className='text-black'>Already have account? <Link to={'/login'} className='text-white'>Login</Link></p>
                        </div>
                    </form>
    </div>
  )
}
