import axios from "axios"
import {useEffect,useState} from "react"
export default function Day() {
  const [todos,setTodos]=useState([])
  useEffect(()=>{
    getTodos()
  })
  async function getTodos(){
    try{
      let response= await axios.get('/api/todo')
      setTodos(response.data)
    }catch(err){
      console.log(err.message)
    }
  }
  return (

    <div>
      <h1 className="text-xl text-decoration-line: underline">Events for today</h1>
      <br />
      {todos.map((todo, i)=>{
        return(
          <div  className="border border-black flex"key={i}>
          <input type="checkbox"/>
          <a href={`/${todo._id}`}>
          <p>Event: {todo.title}</p>
          </a>
          </div>
        )
      })}
      <a href="/newTodo">
        <button className="border border-black">Add Event</button>
      </a>
      <a href="/month">
        <button className="border border-black">Go Back</button> 
      </a>
    </div>
  )
}
