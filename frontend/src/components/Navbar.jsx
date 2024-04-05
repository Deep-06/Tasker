import React from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { postUserLogout } from '../redux/Authentication/action';
const Navbar = () => {
  const { token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(postUserLogout(token));
  };

  return (
    <div className='flex justify-around p-4 outline-double text-blue-800 text-xl font-semibold'>
      <Link to='/'>🌟Tasker</Link>
      <Link to='/'>Home</Link>
      <Link to='/task'>Task</Link>
      {token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Signup</Link>
        </>
      )}
    </div>
  )
}

export default Navbar
