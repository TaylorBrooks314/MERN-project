import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import baseURL from '../../api'

export default function ShowTodo() {
  const navigate= useNavigate()

  const {year,month,day,id}=useParams()
  console.log(id)

  const [todo, setTodo]=useState({})

  useEffect(()=>{
    getTodo()
  },[])
  async function getTodo(){
    try{
      let response= await axios.get(baseURL+`/api/todo/${id}`)
      setTodo(response.data)
    }catch(err){
      console.log(err.message)
    }
  }
  async function handleDelete(){
    console.log('here')
    try{
      await axios.delete(baseURL+`/api/todo/${id}`)
      console.log('here')
      navigate(`/year/${year}/month/${month}/day/${day}`)
    }catch(err){
      console.log(err.message)
    }
  }


  return (
    <div>
      Date: {todo.date}
      <br />
      Event: {todo.title}
      <br />
      Location: {todo.location}
      <br />
      Details: {todo.details}
      <br />
      Start Time: {todo.startTime}
      <br />
      End Time: {todo.endTime}
      <br />
      <Link to={`/${id}/edit`}>
        <button>Edit</button>
      </Link>
      <br />
      <Link to={`/year/${year}/month/${month}/day/${day}`}>
        <button>Go Back</button>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}
