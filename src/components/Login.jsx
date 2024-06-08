import React, { useEffect } from 'react'
import { useState} from 'react';
import useAuth from '../hooks/useAuth.js';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {login,allUsers}=useAuth();
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
  
    const navigate=useNavigate();
    const checkForInputs = () => {
      let isValid = true;
  
      if (email.trim() === "") {
        setEmailError("Email is required");
        isValid = false;
      } else {
        setEmailError("");
      }
  
      if (password.trim() === "") {
        setPasswordError("Password is required");
        isValid = false;
      } else {
        setPasswordError("");
      }
  
      return isValid;
    };
    const verifyUser=(e)=>{
      if(!checkForInputs()){
        return ;
      }
      e.preventDefault();
      const loginUser=allUsers.find(element=>element.email===email && element.password===password);
        if(loginUser){
          login(loginUser);
          navigate("/home");

        }else{
          console.log("Incorrect credentials");
        }
    }
    useEffect(()=>{
      if(localStorage.getItem('currUser')){
        navigate("/home");
      }
    },[]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 text-black">
  <div className="w-full max-w-xs">
    <label htmlFor="email" className="block text-left mb-2 font-semibold">Email</label>
    <input 
      id="email" 
      onChange={(e) => setEmail(e.target.value)} 
      className="w-full text-black p-2 mb-2 border rounded-lg border-gray-300 focus:outline-none focus:border-gray-600" 
    />
     {emailError && <p className="text-red-500 text-xs mb-2">{emailError}</p>}
    
    <label htmlFor="password" className="block text-left mb-2 font-semibold">Password</label>
    <input 
      id="password" 
      onChange={(e) => setPassword(e.target.value)} 
      type="password" 
      className="w-full text-black p-2 mb-2 border rounded-lg border-gray-300 focus:outline-none focus:border-gray-600" 
    />
    {passwordError && <p className="text-red-500 text-xs mb-4">{passwordError}</p>}
    <h2 className='text-[0.7rem] mt-2'>Need to create an account? <span className='text-blue-700'><NavLink to='/register'>Sign-up</NavLink></span> instead</h2>
    <button 
      className="w-[40%] bg-blue-700 text-white p-2 mt-4 border rounded-lg border-gray-300 focus:outline-none " 
      onClick={verifyUser}
    >
      Login
    </button>
  </div>
</div>
  )
}

export default Login
