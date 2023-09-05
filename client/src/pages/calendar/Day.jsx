import axios from "axios"
import {useEffect,useState} from "react"
import baseURL from "../../api"
import { Link, useParams } from "react-router-dom"
export default function Day() {
  const [todos,setTodos]=useState([])
  const{year,month,day,}=useParams()
  useEffect(()=>{
    getTodos()
  },[])
  async function getTodos(){
    try{
      let response= await axios.get(baseURL+'/api/todo',{
        params:{date:`${year}${month}${day}`}
      })
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
          <Link to={`/year/${year}/month/${month}/day/${day}/${todo._id}`}>
          <p>Event: {todo.title}</p>
          </Link>
          </div>
        )
      })}
      <Link to={`/year/${year}/month/${month}/day/${day}/newTodo`}>
        <button className="border border-black">Add Event</button>
      </Link>
      <Link to={`/year/${year}/month/${month}`}>
        <button className="border border-black">Go Back</button> 
      </Link>
    </div>
  )
}
