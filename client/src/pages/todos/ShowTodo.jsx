import {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function ShowTodo() {
  const navigate= useNavigate()

  const {id}=useParams()
  console.log(id)

  const [todo, setTodo]=useState({})

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
  async function handleDelete(){
    console.log('here')
    try{
      await axios.delete(`/api/todo/${id}`)
      console.log('here')
      navigate('/day')
    }catch(err){
      console.log(err.message)
    }
  }


  return (
    <div>
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
      <a href={`/${id}/edit`}>
        <button>Edit</button>
      </a>
      <br />
      <a href='/day'>
        <button>Go Back</button>
      </a>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}
