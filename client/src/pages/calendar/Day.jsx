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
      <h1>Events for today</h1>
      <br />
      {todos.map((todo, i)=>{
        return(
          <div key={i}>
          <input type="checkbox"/>
          <a href={`/${todo._id}`}>
          <p>Title: {todo.title}</p>
          </a>
          </div>
        )
      })}
      <a href="/newTodo">
        <button>Add Event</button>
      </a>
      <a href="/month">Go Back</a>
    </div>
  )
}
