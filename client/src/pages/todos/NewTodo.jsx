import {useState} from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import baseURL from '../../api'

export default function AddToDo() {
  const{year,month,day}=useParams()
  const navigate=useNavigate()
  const date=`${year}${month}${day}`
 const emptyform={
  date:date,
  title:'',
  details:'',
  location:'',
  startTime:'',
  endTime:'',
 }
 const [todo,setTodo]=useState(emptyform)
 console.log(emptyform.date)
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
      navigate(`/year/${year}/month/${month}/day/${day}/`)
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
        <input id="startTime" name="startTime" type='time' onChange={handleChange}/>
        <br />
        <label htmlFor="endTime">End Time</label>
        <input id="endTime" name="endTime" type='time' onChange={handleChange}/>
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
