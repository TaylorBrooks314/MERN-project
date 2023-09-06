import {useState,useEffect, useRef} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import baseURL from '../../api'
export default function EditTodo() {
  const {year,month, day, id}= useParams()
  const navigate=useNavigate()

  const emptyform={
    title:'',
    details:'',
    location:'',
    startTime:'',
    endTime:'',
   }

  const [todo,setTodo]=useState(emptyform)

 const titleRef=useRef()
 const detailsRef=useRef()
 const locationRef=useRef()
 const startTimeRef=useRef()
 const endTimeRef=useRef()

 useEffect(()=>{
  getTodo()
 },[])

 async function getTodo(){
  try{
    let response= await axios.get(baseURL+`/api/todo/${id}`)
    setTodo(response.data)
  }catch(err){
    console.log(err.message)
  }
}

 function handleChange(e){
  setTodo({...todo, [e.target.name]:e.target.value})
}
async function handleSubmit(e) {
  e.preventDefault()
  console.log(todo)
  try {
      const updatedTodo = {
        title:titleRef.current.value,
        details:detailsRef.current.value,
        startTime:startTimeRef.current.value,
        endTime:endTimeRef.current.value,
        location:locationRef.current.value,
      }
      console.log(updatedTodo)
      // add header when add in authorization
      await axios.put(baseURL+`/api/todo/${id}`, updatedTodo)
      navigate(`/${id}`)
  } catch(err) {
      console.log(err.message)
  }
}

  return (
    <div className='relative text-center'>
      <h3 className='text-xl text-decoration-line: underline'>Add a Event</h3>
      <form onSubmit={handleSubmit}>
        <div className=' space-x-10 mt-3 m-2'>
        <label htmlFor="title">*Title:</label>
        <input id="title" name="title" onChange={handleChange} defaultValue={todo.title} ref={titleRef} className='border border-black rounded-lg'/>
        </div>
        
        <div className=' space-x-5 m-2'>
        <label htmlFor="location">Location:</label>
        <input id="location" name="location" onChange={handleChange} defaultValue={todo.location} ref={locationRef} className='border border-black rounded-lg'/>
        </div>
       
        <div className=' space-x-3 m-2'>
        <label htmlFor="startTime">Start Time:</label>
        <input id="startTime" name="startTime" onChange={handleChange} defaultValue={todo.startTime} ref={startTimeRef} className='border border-black rounded-lg'/>
        </div>

        <div className=' space-x-4 m-2'>
        <label htmlFor="endTime">End Time:</label>
        <input id="endTime" name="endTime" onChange={handleChange} defaultValue={todo.endTime} ref={endTimeRef} className='border border-black rounded-lg'/>
        </div>
        
      
        <div className='text-center'>
          <div className='flex justify-center space-x-5'>
        <label htmlFor="details">Details:</label>
        <textarea id="details" name="details" rows={'5'} cols={'30'} onChange={handleChange} defaultValue={todo.details} ref={detailsRef} className=' border border-black rounded-lg'/>
        </div>
        <button className='border border-black m-3 bg-blue-600 rounded'>Submit</button>
        </div>
        
        <p className='text-gray-600'>* = this field is required</p>
       
      </form>
      <div className='border border-black'>
      <Link to={`/year/${year}/month/${month}/day/${day}/${id}`}>
        <button className='border border-black m-5 p-3 bg-blue-600'>Go Back</button>
      </Link>
      </div>
    </div>
  )
}
