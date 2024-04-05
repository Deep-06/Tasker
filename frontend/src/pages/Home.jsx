import React from 'react'
import {  useNavigate } from "react-router-dom"

export const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='m-4 p-4'>
      <p className='text-8xl p-2 font-serif hover:font-sans font-medium leading-16'>Manage Your Task Productively</p>
      <div className='flex px-4'>
        <div className='w-[50%]'>
          <img className='rounded-full' src='https://img.freepik.com/premium-vector/girl-is-writing-clipboard_118167-3498.jpg?w=740' alt='' width={"100%"} />
        </div>

        <div className='w-[50%] p-8 flex flex-col justify-center items-center'>
          <p className='text-4xl p-2'>Start Your Great Journey From Here 🌟</p>
          <p className='text-4xl p-2'>Tasker helps you to create and manage your task</p>
          <button onClick={()=>navigate('/task')} className='text-xl m-4 p-2 px-4 rounded-full bg-blue-500/100'>Get Started</button>
        </div>
      </div>
    </div>
  )
}

