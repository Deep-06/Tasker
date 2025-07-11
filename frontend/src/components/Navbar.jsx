import React from 'react'
import { Link ,useNavigate} from "react-router-dom";
import { useSelector, useDispatch,} from 'react-redux';
import { postUserLogout } from '../redux/Authentication/action';
import { FaTasks } from "react-icons/fa";
const Navbar = () => {
  const { token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate= useNavigate()

  const handleLogout = () => {
    dispatch(postUserLogout(token));
navigate('/')
  };

  return (
    <div className='flex justify-around p-4 outline-double text-blue-800 text-xl font-semibold'>
      <Link to='/' className='flex justify-left items-center gap-1'><FaTasks />Tasker</Link>
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
