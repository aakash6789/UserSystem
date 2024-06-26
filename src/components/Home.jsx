import React,{useState,useEffect} from 'react'
import useAuth from '../hooks/useAuth.js'
import SearchIcon from '@mui/icons-material/Search';
import PostComponent from './PostComponent.jsx';
import Popup from './Popup.jsx';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const {user,logOut}=useAuth();
    const [data, setData] = useState(null);
    const [searchText, setSearchText] = useState('');        // To implement the search functionality, searchText is used to dynamically render posts
    const [openIndex, setOpenIndex] = useState(null);
    const[isCreate,setIsCreate]=useState(false);
    const [tittle, setTittle] = useState('');
    const [body, setBody] = useState('');
    const[id,setId]=useState(null);
    const [idError, setIdError] = useState("");
    const navigate=useNavigate();
    const handleToggle = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
    const checkForInputs = () => {
      let isValid = true;
      if (id.trim() === "") {
        setIdError("Id is required");
        isValid = false;
      } else {
        setIdError("");
      }
      return isValid;
    }
    const handleUpdate = (id, updatedItem) => {
        const updatedData = data.map(item => item.id === id ? { ...item, ...updatedItem } : item);
        setData(updatedData);
        toast.success('Post updated successfully',{ duration: 5000 });
      };
      const handleDelete=(id)=>{
        const updatedData = data.filter(item => item.id != id );
        // console.log(updatedData);
        setData(updatedData);
        toast.success('Post deleted successfully',{ duration: 5000 });
      }
      const handleCreate=()=>{
        if(!checkForInputs()){
          return ;
        }
        console.log("create");
        // const newData=[{id:id,tittle:tittle,body:body},...data];
        const newData={id:id,tittle:tittle,body:body};
        axios.post('https://jsonplaceholder.typicode.com/posts',newData).then((res)=>{
            console.log(res.data);
           const newArr=[{id:res.data.id,title:res.data.tittle,body:res.data.body},...data];
           setData(newArr);
           toast.success('Post created successfully',{ duration: 5000 }); 
        }
        ).catch(error => {
            console.error('Error creating post:', error);
          });
        setData(newData);
        setIsCreate(false);
      }
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/posts').then((response)=>{
            setData(response.data);}) 
            .catch(error => {
            console.error('Error fetching posts:', error);
          });
    },[])
  return (
    <div className='max-w-xl mx-auto py-6 px-[5%]'>
      <Toaster position='top-right'/>
      {user?<h1 className='text-black mt-[5%] font-bold text-lg text-center mt-[5%] mb-[15%] '>Welcome {user.username} ! </h1>:<h1 className='text-black'>Loading .. </h1>}
      {/* <button className='rounded-md bg-blue-700 text-sm px-[3%] py-[1%] block ml-auto text-white' onClick={handleLogout}>Logout</button> */}
      <button className='rounded-md bg-blue-700 text-sm px-[3%] py-[1%] text-white' onClick={()=>setIsCreate(!isCreate)}>Create Post</button>
      <Popup trigger={isCreate} setTrigger={setIsCreate}>
                <div className='bg-white border mt-[12vh] lg:w-[35vw] max-sm:w-[60vw] sm:w-[50vw] sm:text-md rounded-lg border-[#c4c4c8] pt-[5%] max-sm:text-sm pb-[3%] px-[3%]'>
                  <div className='flex'>
                    <p className=''>Enter Details</p>
                    <CloseIcon style={{ color: 'gray', marginLeft: 'auto' }} onClick={() => setIsCreate(!isCreate)}
                className='hover:cursor-pointer' />
                  </div>
                  <div className='flex'>
                    <div className='mr-auto mt-[5%] w-[100%]  justify-between mr-auto'>
                    <h1 className='text-sm font-semibold mb-2'>Id</h1>
                    <input
                className='h-[30px] w-[80%] max-sm:w-[90%] rounded-lg text-black pl-[4%] border'
                type='text'
                onChange={(e) => {
                  const value = e.target.value;
                  setId(value);
                }}
                value={id}
              />
               {idError && <p className="text-red-500 text-xs mb-2">{idError}</p>}
                        <h1 className='text-sm font-semibold mt-[2%] mb-2'>Tittle</h1>
                    <input
                className='h-[30px] w-[80%] max-sm:w-[90%] rounded-lg text-black pl-[4%] border'
                type='text'
                onChange={(e) => {
                  setTittle( e.target.value);
                }}
                value={tittle}
              />
                        <h1 className='text-sm font-semibold mt-[3%] mb-2'>Body</h1>
                        <textarea
              className='h-[180px] max-sm:w-[90%] text-black pt-[3%] px-[2%] w-[80%] rounded-xl pl-[2%] border'
              type='text'
              onChange={(e) => {
                setBody(e.target.value)}}
              value={body}
            ></textarea>
                       <button className='rounded-md mt-4 bg-blue-700 text-sm block px-[5%] mt-4 py-[1%] text-white' onClick={handleCreate}>Create</button>
                    </div>
                  </div>
                </div>
              </Popup>
      <div className='relative mt-[5%] mb-[5%]'>
        <SearchIcon style={{ color: '#cfcfd0' }} className='absolute mt-2 ml-2'/>
        <input
          className='border w-full border-[#c8c8c9] rounded-lg h-[5vh] pl-[8%]'
          value={searchText}
          placeholder='Search Post'
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {(data && Array.isArray(data)) ?<div> {(!searchText && data) ? data.map((item, index) => (
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
