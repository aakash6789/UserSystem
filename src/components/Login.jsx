import React, { useEffect } from 'react'
import { useState } from 'react';
import useAuth from '../hooks/useAuth.js';

import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {login,allUsers}=useAuth();
    const navigate=useNavigate();
    const verifyUser=(e)=>{
      e.preventDefault();
      const loginUser=allUsers.find(element=>element.email===email && element.password===password);
        if(loginUser){
          login(loginUser);
          console.log("Success");
          navigate("/home");

        }else{
          console.log("Incorrect credentials");
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white">
      {/* <h1>{loading?"Loading":""}</h1> */}
        <label htmlFor="email">email</label>
                 <input id="email" onChange={(e)=>setEmail(e.target.value)} className="text-black p-2 mb-2 border rounded-lg mb:4 border-gray-300 focus:outline-none focus:border-gray-600 " />
        <label htmlFor="password">password</label>
                 <input id="password" onChange={(e)=>setPassword(e.target.value)}  type="password" className="text-black p-2 border rounded-lg mb:4 border-gray-300 focus:outline-none focus:border-gray-600 " />
                 <button className="p-2 mt-4 border rounded-lg mb:4 border-gray-300 focus:outline-none focus:border-gray-600" onClick={verifyUser}>Submit</button> 
    </div>
  )
}

export default Login
