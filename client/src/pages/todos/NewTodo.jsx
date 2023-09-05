import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import baseURL from '../../api'

export default function AddToDo() {
  const navigate=useNavigate()
 const emptyform={
  title:'',
  details:'',
  location:'',
  startTime:'',
  endTime:'',
 }
 const [todo,setTodo]=useState(emptyform)

 function handleChange(e){
  setTodo({...todo, [e.target.name]:e.target.value})
  console.log(todo)
 }
 async function handleSubmit(e) {
  e.preventDefault()
  try {
      const newTodo = todo
      // add header when add in authorization
      await axios.post(baseURL+`/api/todo`, newTodo)
      navigate(`/day`)
  } catch(err) {
      console.log(err.message)
  }
}
  return (
    <div>
      <h3>Add an Event</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title*</label>
        <input id="title" name="title" onChange={handleChange}/>
        <br />
        <label htmlFor="location">Location</label>
        <input id="location" name="location" onChange={handleChange}/>
        <br />
        <label htmlFor="startTime">Start Time</label>
        <input id="startTime" name="startTime" onChange={handleChange}/>
        <br />
        <label htmlFor="endTime">End Time</label>
        <input id="endTime" name="endTime" onChange={handleChange}/>
        <br />
        <label htmlFor="details">Details</label>
        <br />
        <textarea id="details" name="details" rows={'5'} cols={'30'} onChange={handleChange}/>
        <button>Submit</button>
      </form>
      <p>* = this field is required</p>
      <a href="/day">
      <button>Go Back</button>
      </a>
    </div>
  )
}
