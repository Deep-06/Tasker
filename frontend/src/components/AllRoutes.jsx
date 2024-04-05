import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { Task } from '../pages/Task';

const AllRoutes = () => {
  return (
    <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/task' element={<Task/>} />
            {/* <Route path='/editgame/:id' element={<Edit/>} /> */}

        </Routes>
  )
}

export default AllRoutes