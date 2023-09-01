import {useState} from 'react'
export default function EditTodo() {
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

  return (
    <div>
      <h3>Add a To-Do</h3>
      <form>
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
      </form>
      <p>* = this field is required</p>
    </div>
  )
}
