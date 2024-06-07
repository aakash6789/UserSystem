import React from 'react'
import useAuth from '../hooks/useAuth.js'
const Home = () => {
    const {user}=useAuth();
  return (
    <div>
      {user?<h1 className='text-white'>Logged in {user.username} </h1>:<h1 className='text-white'>Loading .. </h1>}
    </div>
  )
}

export default Home;
