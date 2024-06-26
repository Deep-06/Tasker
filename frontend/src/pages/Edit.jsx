import React from 'react'
import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { editTask } from '../redux/Task/action';

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
       // console.log(data);
        dispatch(editTask(id,data, token));
        setData(initialState);
        navigate('/task')
      }

      useEffect(() => {
        const updatedData = tasks.length>0 && tasks.find(el => el._id === id);
        setData(updatedData);
      }, [tasks, id])

    return (
        <div className='flex justify-center items-center mt-20'>
        <div className='bg-indigo-500/100 w-[250px] sm:w-[350px]'>
            <h3 className='p-8 text-4xl font-serif'>Edit Task</h3>
            <div className='flex justify-around'>

                <form onSubmit={handleEdit} className='flex flex-col gap-4 pb-8'>
                    <input type="text" placeholder="Name" className="w-50 lg:w-64 bg-white shadow rounded"
                        name="title"
                        value={data.title}
                        onChange={handleChange} />

                    <input type="text" placeholder="Description" className="w-50 lg:w-64 bg-white shadow rounded"
                        name="description"
                        value={data.description}
                        onChange={handleChange} />

                    <select name="priority" value={data.priority} onChange={handleChange} className="w-50 lg:w-64 bg-white shadow rounded">
                        <option value="">Select Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <button type="submit" className='bg-indigo-600 px-3 w-50 lg:w-64 rounded-md text-lg'>Submit</button>

                </form>
            </div>
        </div>
        </div>
    )
}
