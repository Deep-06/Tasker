import React from 'react'
import {useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
export const PrivateRoutes = ({children}) => {
//const {isAuth}=useSelector((store) => store.authReducer);
const { token } = useSelector(store => store.authReducer);

  
return token ? (
    children
) : (
    <Navigate  to="/login" />
);
}
