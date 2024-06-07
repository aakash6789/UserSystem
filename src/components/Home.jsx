import React,{useState,useEffect} from 'react'
import useAuth from '../hooks/useAuth.js'
import SearchIcon from '@mui/icons-material/Search';
import PostComponent from './PostComponent.jsx';
import axios from 'axios';
const Home = () => {
    const {user}=useAuth();
    const [data, setData] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [openIndex, setOpenIndex] = useState(null);
    const handleToggle = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
    const handleUpdate = (id, updatedItem) => {
        // console.log(updatedItem);
        const updatedData = data.map(item => item.id === id ? { ...item, ...updatedItem } : item);
        setData(updatedData);
      };
      const handleDelete=(id)=>{
        const updatedData = data.filter(item => item.id != id );
        // console.log(updatedData);
        setData(updatedData);
      }
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/posts').then((response)=>{
            setData(response.data);
            console.log(response.data)}) .catch(error => {
            console.error('Error fetching posts:', error);
          });
    },[])
  return (
    <div className='max-w-xl mx-auto py-6 px-[5%]'>
      {user?<h1 className='text-white'>Logged in {user.username} </h1>:<h1 className='text-white'>Loading .. </h1>}
      <div className='relative mt-[5%] mb-[5%]'>
        <SearchIcon style={{ color: '#cfcfd0' }} className='absolute mt-2 ml-2'/>
        <input
          className='border w-full border-[#c8c8c9] rounded-lg h-[5vh] pl-[8%]'
          value={searchText}
          placeholder='Search Post'
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {data ?<div> {(!searchText && data) ? data.map((item, index) => (
        <PostComponent
          key={index + item.id}
          id={item.id}
          Title={item.title}
          Body={item.body}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )) : data && data.filter((element) => (
        `${element.tittle}`.toLowerCase().includes(searchText.toLowerCase())|| ` ${element.body}`.toLowerCase().includes(searchText.toLowerCase())
      )).map((item, index) => (
        <PostComponent
        key={index + item.id}
        id={item.id}
        Title={item.title}
        Body={item.body}
        isOpen={openIndex === index}
        onClick={() => handleToggle(index)}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}</div> :<div>Loading ...</div>}
     
    </div>
  )
}

export default Home;
