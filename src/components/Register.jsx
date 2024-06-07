import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useAuth from '../hooks/useAuth.js'
const Register = () => {
 const [username,setUsername]=useState("");
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
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
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white">
              {/* <h1>{loading?"Processing":"Sign up"}</h1> */}
                 <hr></hr>
                 <label htmlFor="username" >username</label>
                 <input id="username" onChange={(e)=>setUsername(e.target.value)} className="text-black p-2 border rounded-lg mb:4 border-gray-300 focus:outline-none focus:border-gray-600 " />
                 <label htmlFor="email">email</label>
                 <input id="email"onChange={(e)=>setEmail(e.target.value)} className="text-black p-2 border rounded-lg mb:4 border-gray-300 focus:outline-none focus:border-gray-600 "/>
        <label htmlFor="password">password</label>
                 <input id="password" onChange={(e)=>setPassword(e.target.value)} type="password" className="text-black p-2 border rounded-lg mb:4 border-gray-300 focus:outline-none focus:border-gray-600 "/>
                 <button className="p-2 mt-4 border rounded-lg mb:4 border-gray-300 focus:outline-none focus:border-gray-600" onClick={saveUser} >Submit</button>
    </div>
  )
}

export default Register
