import {useState} from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
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
    <div className='relative text-center'>
      <h3 className='text-xl text-decoration-line: underline'>Add an Event</h3>
      <form onSubmit={handleSubmit}>
        <div className='space-x-10 mt-3 m-2'>
        <label htmlFor="title">Title*</label>
        <input id="title" name="title" onChange={handleChange} className='border border-black rounded-lg'/>
        </div>

        <div className=' space-x-5 m-2'>
        <label htmlFor="location">Location</label>
        <input id="location" name="location" onChange={handleChange} className='border border-black rounded-lg'/>
        </div>

        <div className=' space-x-3 m-2'>
        <label htmlFor="startTime">Start Time</label>
        <input id="startTime" name="startTime" type='time' onChange={handleChange} className='border border-black rounded-lg'/>
        </div>
        
        <div className=' space-x-4 m-2'>
        <label htmlFor="endTime">End Time</label>
        <input id="endTime" name="endTime" type='time' onChange={handleChange} className='border border-black rounded-lg'/>
        </div>
        
        <div className='text-center'>
          <div className='flex justify-center space-x-5'>
        <label htmlFor="details">Details</label>
        <textarea id="details" name="details" rows={'5'} cols={'30'} onChange={handleChange} className='border border-black rounded-lg'/>
        </div>
        <button className='border border-black m-3 bg-blue-600 rounded p-1 hover:bg-gray-500'>Submit</button>
        </div>
      </form>
      <p>* = this field is required</p>
      <div className='border border-black'>
      <Link to={`/year/${year}/month/${month}/day/${day}`}>
        <button className='border border-black m-5 p-3 bg-blue-600 hover:bg-gray-500'>Go Back</button>
      </Link>
      </div>
    </div>
  )
}
