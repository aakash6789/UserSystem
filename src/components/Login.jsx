import React from 'react'

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white">
      {/* <h1>{loading?"Loading":""}</h1> */}
        <label htmlFor="email">email</label>
                 <input id="email" className="text-black p-2 mb-2 border rounded-lg mb:4 border-gray-300 focus:outline-none focus:border-gray-600 " />
        <label htmlFor="password">password</label>
                 <input id="password" type="password" className="text-black p-2 border rounded-lg mb:4 border-gray-300 focus:outline-none focus:border-gray-600 " />
                 <button className="p-2 mt-4 border rounded-lg mb:4 border-gray-300 focus:outline-none focus:border-gray-600">Submit</button> 
    </div>
  )
}

export default Login
