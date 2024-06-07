
import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import Login from './Login.jsx';
import { useNavigate } from 'react-router-dom';
// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();
//   return user?<children/> : <Navigate to="/login" /> ;
// }

const ProtectedRoute = (props) => {
  const navigate=useNavigate();
  const Component=props.component;
  const { user } = useAuth();
  useEffect(()=>{
    let loggedUser=user;
    if(!loggedUser){
    navigate('/login')
    }
  },[]);

  return (
  <div>
    <Component/>
  </div>
  );
}

export default ProtectedRoute;