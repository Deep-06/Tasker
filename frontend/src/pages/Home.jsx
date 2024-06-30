import React from 'react'
import { useNavigate } from "react-router-dom"
import Footer from '../components/Footer'

export const Home = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div className='flex flex-col md:flex-row px-4 bg-gradient-to-b from-indigo-500'>
        <div className='w-[90%] md:w-[50%] p-8 flex flex-col justify-center items-center gap-4'>
          <p className='text-4xl md:text-6xl p-2 font-serif hover:font-sans font-medium leading-20 '>Manage Your Task Productively</p>
          <p className='text-3xl p-2'>Start Your Great Journey From Here 🌟</p>
          <button onClick={() => navigate('/task')} className='text-xl m-4 p-2 px-4 rounded-full bg-blue-500/100 hover:bg-white'>Get Started</button>
        </div>
        <div className='w-[90%] md:w-[50%] flex justify-center p-4'>
          <img className='rounded-full' src='https://img.freepik.com/premium-vector/girl-is-writing-clipboard_118167-3498.jpg?w=740' alt='' width={"80%"} />
        </div>
      </div>

      <div className='flex flex-col md:flex-row px-4'>
        <div className='w-[90%] md:w-[50%] flex justify-center p-4'>
          <img className='rounded-md' src='https://img.freepik.com/premium-vector/flat-vector-concept-online-exam-questionnaire-form-online-education-survey-internet-quiz_97843-127.jpg?w=740' alt='' width={"100%"} />
        </div>
        <div className='w-[90%] md:w-[50%] p-4 flex flex-col justify-center items-center gap-2'>
          <p className='text-4xl p-2 text-center text-blue-800'>-WHY CHOOSE US? 🤔</p>
          <p className='text-2xl p-2 text-left'>Tasks connect our plans to actions. They are the building blocks of every project and how
            we transform goals into results.</p>
          <div className='flex gap-2'>
            <img className='p-2 rounded-full' src='https://scalebranding.com/wp-content/uploads/2022/02/Letter-S-Pen.jpg' alt='' width={'18%'} />
            <div>
              <p className='text-3xl font-medium p-1 text-left'>Start with smaller tasks</p>
              <p className='text-xl p-1 text-left'>This helps you clear your plate of less important but necessary tasks and make room for the big tasks that require time.</p>
            </div>
          </div>

          <div className='flex gap-2'>
            <img className='p-2 rounded-full' src='https://scalebranding.com/wp-content/uploads/2022/02/Letter-S-Pen.jpg' alt='' width={'18%'} />
            <div>
              <p className='text-3xl font-medium p-1 text-left'>Focus on one at a time</p>
              <p className='text-xl p-1 text-left'>Focusing on one task at a time increases your productivity and output. this helps you keep up with work responsibilities.</p>
            </div>
          </div>

          <div className='flex gap-2'>
            <img className='p-2 rounded-full' src='https://scalebranding.com/wp-content/uploads/2022/02/Letter-S-Pen.jpg' alt='' width={'18%'} />
            <div>
              <p className='text-3xl font-medium p-1 text-left'>Create an effective schedule</p>
              <p className='text-xl p-1 text-left'>Scheduling helps you organize your tasks around your time in the most productive manner.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

