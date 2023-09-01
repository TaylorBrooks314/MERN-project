import {useState,useEffect} from 'react'
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
  console.log(todo)
}
async function handleSubmit(e) {
  e.preventDefault()
  try {
      const updatedTodo = todo
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
        <input id="title" name="title" onChange={handleChange} defaultValue={todo.title}/>
        <br />
        <label htmlFor="location">Location</label>
        <input id="location" name="location" onChange={handleChange} defaultValue={todo.location}/>
        <br />
        <label htmlFor="startTime">Start Time</label>
        <input id="startTime" name="startTime" onChange={handleChange} defaultValue={todo.startTime}/>
        <br />
        <label htmlFor="endTime">End Time</label>
        <input id="endTime" name="endTime" onChange={handleChange} defaultValue={todo.endTime}/>
        <br />
        <label htmlFor="details">Details</label>
        <br />
        <textarea id="details" name="details" rows={'5'} cols={'30'} onChange={handleChange} defaultValue={todo.details}/>
        <button>Submit</button>
      </form>
      <p>* = this field is required</p>
      <a href={`/${id}`}>
        <button>Go Back</button>
      </a>
    </div>
  )
}
