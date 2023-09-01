import {useState,useEffect, useRef} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
export default function EditTodo() {
  const {id}= useParams()
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
    let response= await axios.get(`/api/todo/${id}`)
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
      await axios.put(`/api/todo/${id}`, updatedTodo)
      navigate(`/${id}`)
  } catch(err) {
      console.log(err.message)
  }
}

  return (
    <div>
      <h3>Add a To-Do</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title*</label>
        <input id="title" name="title" onChange={handleChange} defaultValue={todo.title} ref={titleRef}/>
        <br />
        <label htmlFor="location">Location</label>
        <input id="location" name="location" onChange={handleChange} defaultValue={todo.location} ref={locationRef}/>
        <br />
        <label htmlFor="startTime">Start Time</label>
        <input id="startTime" name="startTime" onChange={handleChange} defaultValue={todo.startTime} ref={startTimeRef}/>
        <br />
        <label htmlFor="endTime">End Time</label>
        <input id="endTime" name="endTime" onChange={handleChange} defaultValue={todo.endTime} ref={endTimeRef}/>
        <br />
        <label htmlFor="details">Details</label>
        <br />
        <textarea id="details" name="details" rows={'5'} cols={'30'} onChange={handleChange} defaultValue={todo.details} ref={detailsRef}/>
        <button>Submit</button>
      </form>
      <p>* = this field is required</p>
      <a href={`/${id}`}>
        <button>Go Back</button>
      </a>
    </div>
  )
}
