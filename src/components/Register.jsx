import React from 'react'
import { useState,useEffect } from 'react'
import toast from 'react-hot-toast'
import useAuth from '../hooks/useAuth.js'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
const Register = () => {
 const [username,setUsername]=useState("");
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [usernameError, setUsernameError] = useState("");
 const [emailError, setEmailError] = useState("");
 const [passwordError, setPasswordError] = useState("");
 const navigate=useNavigate();
 const {register,allUsers}=useAuth();
    const saveUser=(e)=>{
      e.preventDefault();
      if(!checkForInputs()){
        return ;
      }
      const isAlrreadyRegisterd=allUsers.find(element=>element.email===email && element.password===password);
      if(isAlrreadyRegisterd){
        toast.error('User already exists, try logging in',{ duration: 2000 });  
        return;
      }
      const newUser={username:username,email:email,password:password};
      register(newUser);      
      navigate('/login');
    }
    const checkForInputs = () => {
      let isValid = true;
      if (username.trim() === "") {
        setUsernameError("Username is required");
        isValid = false;
      } else {
        setUsernameError("");
      }
  
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
    useEffect(()=>{
      if(localStorage.getItem('currUser')){
        navigate("/home");
      }
    },[])
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 text-black">
      <Toaster position='top-right'/>
    <div className="w-full max-w-xs">
      <label htmlFor="email" className="block text-left mb-2 font-semibold">Username</label>
      <input 
        id="username" 
        onChange={(e) => setUsername(e.target.value)} 
        className="w-full text-black p-2 mb-4 border rounded-lg border-gray-300 focus:outline-none focus:border-gray-600" 
      />
        {usernameError && <p className="text-red-500 text-xs mb-2">{usernameError}</p>}
      <label htmlFor="email" className="block text-left mb-2 font-semibold">Email</label>
      <input 
        id="email" 
        onChange={(e) => setEmail(e.target.value)} 
        className="w-full text-black p-2 mb-4 border rounded-lg border-gray-300 focus:outline-none focus:border-gray-600" 
      />
        {emailError && <p className="text-red-500 text-xs mb-2">{emailError}</p>}
      
      <label htmlFor="password" className="block text-left mb-2 font-semibold">Password</label>
      <input 
        id="password" 
        onChange={(e) => setPassword(e.target.value)} 
        type="password" 
        className="w-full text-black p-2 mb-4 border rounded-lg border-gray-300 focus:outline-none focus:border-gray-600" 
      />
      {passwordError && <p className="text-red-500 text-xs mb-4">{passwordError}</p>}
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
