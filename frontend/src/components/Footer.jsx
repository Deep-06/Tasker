import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faFacebook,
   faTwitter,
   faInstagram,
 } from "@fortawesome/free-brands-svg-icons";
 import { FaTasks } from "react-icons/fa";
const Footer = () => {
  return (
    <div className='flex justify-around bg-gradient-to-b from-white to-indigo-500 p-4 pb-8'>
      <div className='text-left'>
        <p className='text-3xl p-2 flex justify-left items-center gap-1'> <FaTasks/> Tasker</p>
        <p className='text-xl p-2'>Tasker help you to create and manage task</p>
        <p className='text-xl p-2'>Follow us on:</p>
        <div className='flex justify-around'>
        <a href="https://www.instagram.com">
             <FontAwesomeIcon icon={faInstagram} size="2x" color="red"/>
            </a>
            <a href="https://www.facebook.com">
             <FontAwesomeIcon icon={faFacebook} size="2x" color="white"/>
            </a>
            <a href="https://www.twitter.com">
             <FontAwesomeIcon icon={faTwitter} size="2x"color="blue" />
            </a>
        </div>
      </div>

      <div className='text-left'>
        <p className='text-2xl p-2'>Contact us:</p>
        <p className='text-xl p-2'>Phone No. : 9368696277</p>
        <p className='text-xl p-2'>Email : deepshikha@gmail.com</p>
      </div>
    </div>
  )
}

export default Footer