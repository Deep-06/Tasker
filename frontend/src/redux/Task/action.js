import axios from "axios"

import {GET_TASK_SUCCESS, PATCH_TASK_SUCCESS, POST_TASK_SUCCESS, TASK_DELETE, TASK_FAILURE, TASK_REQUEST, TOGGLE_STATUS} from "../actionTypes";

const URL = "http://localhost:8080"
export const addTask = (newTask,token) => async(dispatch) => {
try{
    dispatch({ type: TASK_REQUEST });
    let res= await axios.post(`${URL}/tasks/add`, newTask,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
            console.log(res);
            dispatch({ type: POST_TASK_SUCCESS });
            dispatch(getTask(token))
}catch(err){
            console.log(err);
            dispatch({ type: TASK_FAILURE });
        };

};



export const getTask = (token) => async (dispatch) => {
    try {
        dispatch({ type: TASK_REQUEST });
        let res = await axios.get(`${URL}/tasks/`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        dispatch({ type: GET_TASK_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: TASK_FAILURE });

    }
}

export const editTask = (id, data,token) => async(dispatch) => {
    try{
        dispatch({ type: TASK_REQUEST });
       let res= await axios.patch(`${URL}/tasks/update/${id}`, data,{
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
        console.log(res)
        dispatch({ type: PATCH_TASK_SUCCESS })
        dispatch(getTask())

    }catch(err){
        dispatch({ type: TASK_FAILURE })
    }
    
        
}

export const deleteTask = (id,token) => async(dispatch) => {
    try{
        dispatch({ type: TASK_REQUEST });
        let res= await axios.delete(`${URL}/tasks/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res)
        dispatch({ type: TASK_DELETE, payload: id })
        dispatch(getTask(token))    
    }catch(err){
        dispatch({ type: TASK_FAILURE })
        console.log(err);

    }       
}

export const toggleTaskStatus = (id, token) => async (dispatch) => {
   
      try {
        const res = await axios.patch(`${URL}/tasks/toggleStatus/${id}`,  { status: true },{
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res);
        dispatch({
            type: TOGGLE_STATUS,
            payload: res.data
          });
      } catch (err) {
       console.log(err)
    };
  };