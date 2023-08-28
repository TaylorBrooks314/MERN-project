// import { useState } from 'react'
import { Route,Routes } from "react-router-dom"
import Login from "./pages/user/Login"
import SignUp from "./pages/user/SignUp"
import Year from "./pages/calendar/Year"
import Month from "./pages/calendar/Month"
import Week from "./pages/calendar/Week"
import Day from "./pages/calendar/Day"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/year" element={<Year/>}/>
      <Route path="/month" element={<Month/>}/>
      <Route path="/week" element={<Week/>}/>
      <Route path="/day" element={<Day/>}/>
    </Routes>
    </>
  )
}

export default App
