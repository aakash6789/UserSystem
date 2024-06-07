import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Popup from './Popup.jsx';
import axios from 'axios';
const PostComponent = ({Body,Title,isOpen,onClick,id,onUpdate,onDelete}) => {
    const [isEdit, setIsEdit] = useState(false);
  const [tittle, setTittle] = useState(Title);
  const[originalTittle,setOriginalTittle]=useState(Title);                              // To preserve previous state, if user cancels updation
  const[originalBody,setOriginalBody]=useState(Body);

  const [body, setBody] = useState(Body);
  const [isDeleteWindow, setIsDeleteWindow] = useState(false);
  const handleSave = ()=> {
    // if (!validateFields()) {
    //   return;
    // }
    const updatedItem = {
      tittle:tittle,
      body:body
    };
    axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,updatedItem).then((res)=>{
        onUpdate(id, res.data );
        setIsEdit(false);
    }) .catch(error => {
        console.error('Error updating the post:', error);
      });
      setIsEdit(false);

  };
  const startEditing = ()=> {
    setIsEdit(true);
   
  };
  const handleSave1 = () => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res)=>{
        onDelete(id);
    }) .catch(error => {
        console.error('Error deleting the post:', error);
      });
    setIsEdit(false);
  };
  const handleCancel = ()=> {
    setTittle(originalTittle);
    setBody(originalBody);
    // setErrors({
    //   name: false,
    //   age: false,
    //   country: false,
    //   gender: false,
    //   description: false,
    // });
    setIsEdit(false);
  };

  return (
    <div className='border pr-[5%] relative border-[#c8c8c9] rounded-lg mb-4'>
       <div className='flex '>
        {(!isEdit || !isOpen) && <div className="text-sm flex ml-[6%]  max-sm:text-sm pt-2 pb-2">
            <h1 className='font-semibold pr-2 '>Post: {id}</h1>
            </div>}
        
        <button className="ml-auto" onClick={onClick} >
        {isOpen?<KeyboardArrowUpIcon style={{ color: '#767679' }} />:<KeyboardArrowDownIcon style={{ color: '#767679' }} />}  
        </button>
      </div>
      <div className={`p-4 ${isOpen ? 'block' : 'hidden'} relative ml-[3%]`}>
        <div className='flex justify-between text-gray-500 pr-[10%]'>
         
         
          <div>
            <p className='text-left'>Tittle</p>
            {!isEdit ? (
              <p className='text-black pt-1 text-left'>{tittle} </p>
            ) : (
              <input
                className={`h-[30px] w-[360px] rounded-lg text-black pl-[4%] border`}
                type='text'
                onChange={(e) => {
                  const value = e.target.value;
                  const filteredValue = value.replace(/[0-9]/g, '');
                  setTittle(filteredValue);
                }}
                value={tittle}
              />
            )}
          </div>
        </div>
        <div className='text-left mt-[5%] text-gray-500'>
          <p className='text-left'>Body</p>
          {isOpen && !isEdit ? (
            <p className='text-black pt-1 text-left'>{body} </p>
          ) : (
            <textarea
              className={`h-[180px] max-sm:w-[300px] text-black pt-[3%] px-[2%] w-[370px] rounded-xl pl-[2%] border `}
              type='text'
              onChange={(e) => {
                setBody(e.target.value)}}
              value={body}
            ></textarea>
          )}
        </div>
        <div className='mt-[5%] flex'>
          {!isEdit ? (
            <div className='ml-auto relative'>
              <FontAwesomeIcon
                icon={faTrashCan}
                style={{ color: '#ff4e1f', marginRight: "15px", paddingTop: "10px", marginTop: "0px" }}
                onClick={() => setIsDeleteWindow(!isDeleteWindow)}
                className='hover:cursor-pointer'
              />
              <Popup trigger={isDeleteWindow} setTrigger={setIsDeleteWindow}>
                <div className='bg-white border mt-[32vh] lg:w-[35vw] max-sm:w-[60vw] sm:w-[50vw] sm:text-md rounded-lg border-[#c4c4c8] pt-[5%] max-sm:text-sm pb-[3%] px-[3%]'>
                  <div className='flex'>
                    <p className=''>Are you sure you want to delete?</p>
                    <CloseIcon style={{ color: 'gray', marginLeft: 'auto' }} onClick={() => setIsDeleteWindow(!isDeleteWindow)}
                className='hover:cursor-pointer' />
                  </div>
                  <div className='flex'>
                    <div className='ml-auto mt-[12%] w-[40%] flex justify-between'>
                      <button className='border border-gray-300 w-[50%] mr-[3%] rounded-lg ' onClick={() => setIsDeleteWindow(!isDeleteWindow)}>Cancel</button>
                      <button className='bg-[#ff3500] w-[50%] rounded-lg p-1 text-white' onClick={handleSave1}>Delete</button>
                    </div>
                  </div>
                </div>
              </Popup>
              
              <EditOutlinedIcon
                style={{ color: '#6fb4ff' }}
                className='hover:cursor-pointer'
                onClick={() =>  startEditing()}
              />
            
            </div>
          ) : (
            <div className='ml-auto relative'>
              <CancelOutlinedIcon
                style={{ color: '#ff3500', marginRight: "15px" }}
                onClick={handleCancel}
                className='hover:cursor-pointer'
              />
              {( originalTittle!=tittle || originalBody!=body) &&
              <CheckCircleOutlineOutlinedIcon
                style={{ color: '#38b000' }}
                className='hover:cursor-pointer'
                onClick={handleSave}
              />
}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostComponent
