import React from 'react'
import { useState } from 'react'
import { addTask } from '../redux/Task/action';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTask, toggleTaskStatus } from "../redux/Task/action";
import { useNavigate } from 'react-router-dom'

const initialState = {
  title: "",
  description: "",
  priority: "",
  status: false,
};
export const Task = () => {
  const [data, setData] = useState(initialState);
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate();
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
   // console.log(data);
    dispatch(addTask(data, token));
    setData(initialState);
  }

  const handleToggleStatus = (id) => {
    dispatch(toggleTaskStatus(id, token));
  };


  useEffect(() => {
    dispatch(getTask(token))
  }, [dispatch, token])

  const handleRemoveProduct = (id) => {
    dispatch(deleteTask(id, token));
  };

  const filteredTasks = tasks.filter(task => {
    const priorityMatch = priorityFilter ? task.priority === priorityFilter : true;
    const statusMatch = statusFilter ? (statusFilter === "Completed" ? task.status : !task.status) : true;
    return priorityMatch && statusMatch;
  });

 // console.log(tasks)
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

      {/* Add Task */}

      <div className='p-4 pb-8 mx-4 shadow-md shadow-indigo-500/50'>
        <h3 className='pb-4 text-2xl font-serif'>Add New Task</h3>
        <div className='flex justify-around'>

          <form onSubmit={handleSubmit} className='flex flex-col sm:flex-col md:flex-col lg:flex-row gap-4'>
            <input type="text" placeholder="Name" className="w-50 lg:w-64 p-2 bg-white shadow rounded"
              name="title"
              value={data.title}
              onChange={handleChange} />

            <input type="text" placeholder="Description" className="w-50 lg:w-64 p-2 bg-white shadow rounded"
              name="description"
              value={data.description}
              onChange={handleChange} />

            <select name="priority" value={data.priority} onChange={handleChange} className="w-50 p-2 lg:w-64 bg-white shadow rounded">
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <button type="submit" className='bg-indigo-600 px-3 rounded-md text-lg text-white'>Add Task</button>

          </form>
        </div>
      </div>
      
      {/* Filters */}
      <div className='p-4 mx-4'>
        <div className='flex gap-6'>
          <h3 className='text-xl font-serif'>Filter Tasks</h3>
          <select onChange={(e) => setPriorityFilter(e.target.value)} value={priorityFilter} className="p-2 bg-white shadow rounded">
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter} className="p-2 bg-white shadow rounded">
            <option value="">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="In-progress">In-progress</option>
          </select>
        </div>
      </div>

      {/* Task list */}

      <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-4 py-4'>
        {filteredTasks.length > 0 ? filteredTasks?.map((el) => {
          return <div key={el.id} className='text-left p-4 flex flex-col gap-2 shadow-md shadow-indigo-500/50'>
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2'>
              <div className='flex justify-around'>
                <p> <span className={`text-l px-2 rounded-md shadow-md ${getPriorityColor(el.priority)}`}>{el.priority}</span></p>
                <button onClick={() => handleToggleStatus(el._id)} className={`text-l px-2 rounded-md shadow-md ${getStatusColor(el.status)}`}>{el.status ? "Completed" : "In-progress"}</button>
              </div>
              <div className='flex justify-around'>
                <button className='text-l shadow-md shadow-indigo-500/50 px-2 rounded-md hover:bg-indigo-600' onClick={()=>navigate(`/editgame/${el._id}`)}><img src='/Images/edit-3.svg' alt='' /></button>
                <button className='text-l shadow-md shadow-indigo-500/50 px-2 rounded-md hover:bg-indigo-600' onClick={() => handleRemoveProduct(el._id)}><img src='/Images/trash-2.svg' alt='' /></button>
              </div>
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
