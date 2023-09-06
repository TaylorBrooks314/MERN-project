/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import baseURL from '../../api'

export default function ShowTodo({months}) {
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
    <div className='border border-black text-center'>
      <p className='text-lg text-decoration-line: underline'>{day} {months[month]}, {year}</p>
      <br />
      <p className='text-xl font-bold'> {todo.title}</p>
      <br />
      <p>Location: {todo.location}</p>
      <br />
      <p>Details: {todo.details}</p>
      <br />
      <p>Start Time: {todo.startTime}</p>
      <br />
      <p>End Time: {todo.endTime}</p>
      <br />
      <p className='text-sm text-gray-500'>*times are in 24-hr format</p>

      <div className='border border-black m-10'>
      <Link to={`/${id}/edit`} className='border border-black m-5 p-3 bg-blue-600'>
        <button>Edit</button>
      </Link>
      
      <Link to={`/year/${year}/month/${month}/day/${day}`} className='border border-black m-5 p-3 bg-blue-600'>
        <button> Go Back</button>
      </Link>
      
      <button onClick={handleDelete} className='border border-black m-5 p-3 bg-blue-600'>Delete</button>
      </div>
    </div>
  )
}
