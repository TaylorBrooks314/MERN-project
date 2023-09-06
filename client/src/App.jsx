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
  const currentDay=D.getDate()
  console.log(currentDay)
  const months=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']
  // const currentMonth=months[D.getMonth()]
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
    <Navbar user={user} setUser={setUser} year={currentYear} month={D.getMonth()} day={currentDay}/>
    <Routes>
      {user.username?
      <>
      <Route path="/profile" element={<Profile user={user} setUser={setUser}/>}/>
      <Route path="/year/:year" element={<Year currentYear={currentYear} months={months}/>}/>
      <Route path="/year/:year/month/:month" element={<Month months={months}/>}/>
      <Route path="/week" element={<Week/>}/>
      <Route path="/year/:year/month/:month/day/:day" element={<Day months={months}/>}/>
      <Route path="/year/:year/month/:month/day/:day/newTodo" element={<NewTodo/>}/>
      <Route path="/year/:year/month/:month/day/:day/:id" element={<ShowTodo months={months}/>}/>
      <Route path="/year/:year/month/:month/day/:day/:id/edit" element={<EditTodo/>}/>
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
