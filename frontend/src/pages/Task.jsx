import React from 'react'
import { useState } from 'react'
import { addTask } from '../redux/Task/action';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTask } from "../redux/Task/action";
// import { Link } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  priority: "",
  

};
export const Task = () => {
  const [data, setData] = useState(initialState);
  const [status,setStatus] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.taskReducer.tasks);
  const { token } = useSelector(store => store.authReducer);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => {
      return { ...prev, [name]: value };
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(addTask(data, token));
    setData(initialState);
  }

  const handleToggle=()=>{
 setStatus(prevStatus => !prevStatus)
  }

  useEffect(() => {
    dispatch(getTask(token))
  }, [])

  const handleRemoveProduct = (id) => {
    dispatch(deleteTask(id, token));
  };

  console.log(tasks)
  function getPriorityColor(priority) {
    switch (priority) {
      case "Low":
        return "shadow-orange-500/50 text-orange-500";
      case "Medium":
        return "shadow-red-500/50 text-red-500";
      case "High":
        return "shadow-red-500/50 text-red-900";
      default:
        return "shadow-black text-black"; 
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case true:
        return "shadow-green-500/50 text-green-500";
      case false:
        return "shadow-red-700/50 text-red-700";
      default:
        return "shadow-black text-black"; 
    }
  }
  return (
    <div className='m-4 px-4 py-4 '>
      <div className='p-4 pb-8 shadow-md shadow-indigo-500/50'>
        <h3 className='pb-4 text-2xl font-serif'>Add New Task</h3>
        <div className='flex justify-around'>

          <form onSubmit={handleSubmit} className='flex gap-4'>
            <input type="text" placeholder="Name" className="w-80 bg-white shadow rounded"
              name="title"
              value={data.title}
              onChange={handleChange} />

            <input type="text" placeholder="Description" className="w-80 bg-white shadow rounded"
              name="description"
              value={data.description}
              onChange={handleChange} />

            <select name="priority" value={data.priority} onChange={handleChange} className="w-80 bg-white shadow rounded">
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <button type="submit" className='bg-indigo-600 px-3 rounded-md text-lg'>Add Task</button>

          </form>
        </div>
      </div>
      {/* Task list */}
      <div className='grid grid-cols-4 gap-8 m-4 py-4'>
    

        {tasks.length > 0 ? tasks?.map((el) => {
          return <div key={el.id} className='text-left p-4 flex flex-col gap-2 shadow-md shadow-indigo-500/50'>
          <div className='flex justify-around'>
          <p> <span className={`text-l px-2 rounded-md shadow-md ${getPriorityColor(el.priority)}`}>{el.priority}</span></p>
          <button onClick={handleToggle} className={`text-l px-2 rounded-md shadow-md ${getStatusColor(status)}`}>{status ? "Completed" : "Not-completed"}</button>
              <button className='text-l shadow-md shadow-indigo-500/50 px-2 rounded-md hover:bg-indigo-600' >U</button>
              <button className='text-l shadow-md shadow-indigo-500/50 px-2 rounded-md hover:bg-indigo-600' onClick={() => handleRemoveProduct(el._id)}>D</button>
            </div>
            <p className='text-2xl pt-4 font-semibold'>{el.title}</p>
            <p className='text-xl'>{el.description}</p>
           
           
          </div>
        }) : (
          <div>
            <h1 className='text-4xl font-semibold'>My Task</h1>
            <h2 className='text-xl mt-2 text-slate-300'>There is no task</h2>
          </div>
        )
        }
      </div>
    </div>
  )
}
