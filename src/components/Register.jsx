import React from 'react'
import { useState,useEffect } from 'react'
import toast from 'react-hot-toast'
import useAuth from '../hooks/useAuth.js'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Register = () => {
 const [username,setUsername]=useState("");
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const navigate=useNavigate();
 const {register}=useAuth();
    const saveUser=(e)=>{
      // const getUser=[];
      // if(localStorage.getItem('allUsers')){
      //   getUser.push((localStorage.getItem('allUsers')));
      // }
      e.preventDefault();
      const newUser={username:username,email:email,password:password};
      register(newUser);
          //    getUser.push(JSON.stringify({username:username,email:email,password:password}));
          //  localStorage.setItem('allUsers',getUser);
           toast.success('User created successfully');
           
    }
    useEffect(()=>{
      if(localStorage.getItem('currUser')){
        navigate("/home");
      }
    },[])
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 text-black">
    <div className="w-full max-w-xs">
      <label htmlFor="email" className="block text-left mb-2 font-semibold">Username</label>
      <input 
        id="username" 
        onChange={(e) => setUsername(e.target.value)} 
        className="w-full text-black p-2 mb-4 border rounded-lg border-gray-300 focus:outline-none focus:border-gray-600" 
      />
      <label htmlFor="email" className="block text-left mb-2 font-semibold">Email</label>
      <input 
        id="email" 
        onChange={(e) => setEmail(e.target.value)} 
        className="w-full text-black p-2 mb-4 border rounded-lg border-gray-300 focus:outline-none focus:border-gray-600" 
      />
      
      <label htmlFor="password" className="block text-left mb-2 font-semibold">Password</label>
      <input 
        id="password" 
        onChange={(e) => setPassword(e.target.value)} 
        type="password" 
        className="w-full text-black p-2 mb-4 border rounded-lg border-gray-300 focus:outline-none focus:border-gray-600" 
      />
      <h2 className='text-[0.7rem] mt-2'>Already have an account? <span className='text-blue-700'><NavLink to='/login'>Log-in</NavLink></span> instead</h2>
      <button 
        className="w-[40%] bg-blue-700 text-white p-2 mt-4 border rounded-lg border-gray-300 focus:outline-none " 
        onClick={saveUser}
      >
        Register
      </button>
    </div>
  </div>
  )
}

export default Register
