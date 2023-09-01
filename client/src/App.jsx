// import { useState } from 'react'
import { Route,Routes } from "react-router-dom"
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
function App() {
  const D= new Date()
  const currentYear=D.getFullYear()
  const months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  const currentMonth=months[D.getMonth()]

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/year" element={<Year currentYear={currentYear} months={months}/>}/>
      <Route path="/month" element={<Month month={currentMonth} year={currentYear} months={months}/>}/>
      <Route path="/week" element={<Week/>}/>
      <Route path="/day" element={<Day/>}/>
      <Route path="/newTodo" element={<NewTodo/>}/>
      <Route path="/:id" element={<ShowTodo/>}/>
      <Route path="/:id/edit" element={<EditTodo/>}/>

    </Routes>
    </>
  )
}

export default App
