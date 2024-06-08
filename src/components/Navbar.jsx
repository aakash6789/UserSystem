import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
const Navbar = () => {
  const [isHomePage,setIsHomePage]=useState(false);
  const location=useLocation();
  const {user,logOut}=useAuth();
  const navigate=useNavigate();
  const handleLogout=()=>{
    logOut();
    const loggedOutUser=localStorage.getItem('currUser');
    if(!loggedOutUser){
        navigate('/login');
    }
  }
  useEffect(()=>{
    if(location.pathname==='/home'){
      setIsHomePage(true);
    }
    if(location.pathname==='/login' || location.pathname==='/login' ){
      setIsHomePage(false);
    }
  },[location])
  return (
    <div className='flex '>
      <nav className='flex pt-4 mx-auto text-sm 2xl:w-[30%]  xl:w-[40%] w-[50%] mr-[5%]   text-black font-semibold'>
        {!isHomePage?<div className='w-full flex justify-between'>
        <NavLink to='/home'><h1>Home</h1></NavLink> 
       <NavLink to='/login'><h1>Login</h1></NavLink> 
       <NavLink to='/register'><h1>Register</h1></NavLink> 
        </div>:<div className='w-full flex justify-between'>
        <button className='rounded-md bg-blue-700 font-normal text-sm px-[3%] mt-2 py-[1%] block ml-auto text-white' onClick={handleLogout}>Logout</button>
        </div>}
        {/* <div className='w-full flex justify-between'>
        <NavLink to='/home'><h1>Home</h1></NavLink> 
       <NavLink to='/login'><h1>Login</h1></NavLink> 
       <NavLink to='/register'><h1>Register</h1></NavLink> 
        </div> */}
     
      </nav>
    </div>
  )
}

export default Navbar
