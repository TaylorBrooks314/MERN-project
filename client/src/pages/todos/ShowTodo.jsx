import {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function ShowTodo() {
  const {id}=useParams
  const [todo, setTodo]=useState({})
  useEffect(()=>{
    getTodo()
  })
  async function getTodo(){
    try{
      let response= await axios.get(`/api/todo/${id}`)
      setTodo(response.data)
    }catch(err){
      console.log(err.message)
    }
  }
  return (
    <div>
      {todo.title}
      {todo.location}
      {todo.details}
    </div>
  )
}
