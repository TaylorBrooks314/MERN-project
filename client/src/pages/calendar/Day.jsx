/* eslint-disable react/prop-types */
import axios from "axios"
import {useEffect,useState} from "react"
import baseURL from "../../api"
import { Link, useParams } from "react-router-dom"
export default function Day({months}) {
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

    <div className="border border-black text-center pt-3">
      <h1 className="text-xl text-decoration-line: underline">Events for today: {day} {months[month]},{year}</h1>
      <br />
      {todos.map((todo, i)=>{
        return(
          <div  className="  text-center"key={i}>
          {/* <input type="checkbox"/> */}
          <Link to={`/year/${year}/month/${month}/day/${day}/${todo._id}`} >
          <p className="font-bold">{todo.title}</p>
          <p>Start Time:{todo.startTime}</p>
          <p>End Time:{todo.endTime}</p>
          </Link>
          </div>
        )
      })}
      <div className='border border-black m-10 flex justify-center'>
      <Link to={`/year/${year}/month/${month}/day/${day}/newTodo`} className='border border-black m-5 p-3 bg-blue-600'>
        <button>Add Event</button>
      </Link>
      <Link to={`/year/${year}/month/${month}`} className='border border-black m-5 p-3 bg-blue-600'>
        <button className="">Go Back</button> 
      </Link>
      </div>
    </div>
  )
}
