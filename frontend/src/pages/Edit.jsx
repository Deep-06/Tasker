import React from 'react'
import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { editTask, getTask } from '../redux/Task/action';

const initialState = {
    title: "",
    description: "",
    priority: "",
  };
export const Edit = () => {
    const [data, setData] = useState(initialState);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { id } = useParams();
    const tasks = useSelector((store) => store.taskReducer.tasks);
    const { token } = useSelector(store => store.authReducer);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => {
          return { ...prev, [name]: value };
        });
      }

      const handleEdit = () => {
       // e.preventDefault();
        dispatch(editTask(id,data, token));
        setData(initialState);
        dispatch(getTask(token));
        navigate('/task')
      }

      useEffect(() => {
        const updatedData = tasks.length>0 && tasks.find(el => el._id === id);
        setData(updatedData);
      }, [tasks, id])

    return (
        <div className='flex justify-center items-center mt-20'>
        <div className='w-[250px] sm:w-[350px] rounded-sm border-indigo-500 border-2 '>
            <h3 className='p-8 text-4xl font-serif'>Edit Task</h3>
            <div className='flex justify-around'>

                <form onSubmit={handleEdit} className='flex flex-col gap-4 pb-8'>
                    <input type="text" placeholder="Name" className="w-50 lg:w-64 py-2 px-1 bg-white shadow rounded border-indigo-500/50 border-1"
                        name="title"
                        value={data.title}
                        onChange={handleChange} />

                    <input type="text" placeholder="Description" className="w-50 h-24 lg:w-64 px-1 text-justify text-wrap align-top bg-white shadow rounded border-indigo-500/50 border-1"
                        name="description"
                        value={data.description}
                        onChange={handleChange} />

                    <select name="priority" value={data.priority} onChange={handleChange} className="w-50 lg:w-64 px-1 py-2 bg-white shadow rounded border-indigo-500/50 border-1">
                        <option value="">Select Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <button type="submit" className='bg-indigo-600 px-3 py-2 w-50 lg:w-64 rounded-md text-lg text-white'>Submit</button>

                </form>
            </div>
        </div>
        </div>
    )
}
