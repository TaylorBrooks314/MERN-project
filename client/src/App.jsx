import {useState, useEffect } from 'react'
import axios from 'axios'
import { Route,Routes,Navigate } from "react-router-dom"
import Login from "./pages/user/Login"
import SignUp from "./pages/user/SignUp"
import Profile from "./pages/user/Profile"

import Year from "./pages/calendar/Year"
import Month from "./pages/calendar/Month"
import Week from "./pages/calendar/Week"
import Day from "./pages/calendar/Day"

import Navbar from "./components/Navbar"
import EditTodo from "./pages/todos/EditTodo"
import ShowTodo from "./pages/todos/ShowTodo"
import NewTodo from "./pages/todos/NewTodo"

import baseURL from './api'
function App() {
  const D= new Date()
  const currentYear=D.getFullYear()
  const months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  const currentMonth=months[D.getMonth()]
  const [user, setUser]=useState({})
  const [loading, setLoading]=useState(true)
  useEffect(()=>{
    let token=localStorage.getItem('token')
    if(token){
      getUser()
    }else{
      setLoading(false)
    }
    
  },[])
  useEffect(()=>{
   console.log(user,"useEffect")
    
  },[user])
  async function getUser(){
    try{
      let response= await axios.get( baseURL +'/api/user',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response.data)
      setUser(response.data)
      console.log(user)
      console.log(user.username)
    }catch(err){
      console.log(err.message)
      localStorage.removeItem('token')
    }
    setLoading(false)
  }

  return (
    <>
    <Navbar user={user} setUser={setUser} year={currentYear}/>
    <Routes>
      {user.username?
      <>
      <Route path="/profile" element={<Profile user={user}/>}/>
      <Route path="/year/:year" element={<Year currentYear={currentYear} months={months}/>}/>
      <Route path="/year/:year/month/:month" element={<Month month={currentMonth} year={currentYear} months={months}/>}/>
      <Route path="/week" element={<Week/>}/>
      <Route path="/day" element={<Day/>}/>
      <Route path="/newTodo" element={<NewTodo/>}/>
      <Route path="/:id" element={<ShowTodo/>}/>
      <Route path="/:id/edit" element={<EditTodo/>}/>
      {!loading && <Route path='*' element={<Navigate to='/login' />} />}
      </>
      :
      <>
      <Route path="/login" element={<Login month={D.getMonth()} year={currentYear} setUser={setUser} setLoading={setLoading}/>}/>
      <Route path="/signup" element={<SignUp month={D.getMonth()} year={currentYear} setUser={setUser} setLoading={setLoading}/>}/>
        {/* {!loading && <Route path='*' element={<Navigate to='/login' />} />} */}
      </>}
    </Routes>
    </>
  )
}

export default App
