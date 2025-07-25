import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { postUserLogin } from '../redux/Authentication/action';
import {  useNavigate } from "react-router-dom"
export const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const { isLoading, token } = useSelector((store) => store.authReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log(token)
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setLoginData(prev => {
          return { ...prev, [name]: value }
      })
  }

  const handleLoginPost = async (e) => {
      e.preventDefault();
      
      const status = await dispatch(postUserLogin(loginData))
      if (status === 201) {
          toast.error("Wrong credential.", {
              style: {
                  borderRadius: '10px',
                  background: 'whitesmoke',
                  color: 'black',
              },
          })
      } else if (status === 200) {
          toast.success("you have logged in successfully!", {
              icon: "🎉",
              style: {
                  borderRadius: '10px',
                  background: 'whitesmoke',
                  backdropFilter: "blur(2px)",
                  color: 'black',
              },
          })
      } else {
          toast.error("Somthing went wrong!", {
              style: {
                  borderRadius: '10px',
                  background: 'whitesmoke',
                  backdropFilter: "blur(2px)",
                  color: 'black',
              },
          })
      }

  }
  if (token) {
      setTimeout(() => {
          navigate("/")
      }, 1000)
  }
  return (
    <div className='flex justify-center items-center'>
    <div>
    <Toaster />
    </div>
      <form onSubmit={handleLoginPost} className='mt-20 mx-4 max-w-md md:max-w-l w-full relative bg-indigo-500/90 rounded-md  flex flex-col items-center gap-3 p-7 shadow-[0px_15px_25px_rgba(109,71,222,0.15),0px_5px_10px_rgba(77,79,179,0.22)]'>
                     
                    <div className='w-full text-white flex flex-col items-center gap-3'>
                        <input
                            onChange={handleInputChange}
                            type="email"
                            name='email'
                            value={loginData.email}
                            required
                            placeholder='Enter your Email Id'
                            className='bg-transparent border-b focus:border-none px-2 py-1 rounded-sm w-[90%] my-6 outline-none focus:outline-indigo-400 focus:outline-[3px]'
                        />
                        <input
                            onChange={handleInputChange}
                            type="password"
                            name='password'
                            value={loginData.password}
                            required
                            placeholder='Enter password'
                            className='bg-transparent border-b focus:border-none px-2 py-1 rounded-sm w-[90%] outline-none focus:outline-indigo-400 focus:outline-[3px]'
                        />
                        <input type='submit' value={isLoading ? "Loading..." : "LOGIN"} className='py-2 px-8 my-5 bg-white text-black rounded-lg space-x-9 hover:scale-105 active:scale-95 active:shadow-[0px_2px_4px_rgba(0,0,0,0.4),0px_7px_13px_-3px_rgba(0,0,0,0.3)] transition-all duration-150 shadow-[0px_2px_4px_rgba(0,0,0,0.4),0px_7px_13px_-3px_rgba(0,0,0,0.3),0px_-3px_0px_inset_rgba(0,0,0,0.2)]' />
                        <p className='text-black'>Don't have an account? <Link to={'/register'} className='text-white hover:text-black'  >Signup</Link></p>
                    </div>
                </form>
    </div>
  )
}
