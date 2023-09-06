/* eslint-disable react/prop-types */
import axios from 'axios'
import { useRef } from "react"
import { useNavigate } from 'react-router-dom'
import baseURL from '../../api'

export default function Profile({user,setUser}) {
  const usernameRef=useRef()
  const passwordRef=useRef()
  const password2Ref=useRef()



  const navigate=useNavigate()

  const hiddenEmail= user.email.split('')
  for(let i=3; i< hiddenEmail.length; i++){
        hiddenEmail[i]="*"
      }
  hiddenEmail.join('')
  
  async function handlePasswordChange(e){
    e.preventDefault()
    try{
      const updatedPassword={
        password:passwordRef.current.value
      }
      await axios.put(baseURL+'/api/user/password',updatedPassword.password,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      }) 
      navigate('/profile')
    }catch(err){
      console.log(err.message)
    }
  }
  async function handleUsernameChange(e){
    e.preventDefault()
    try{
      const updatedUsername={
        username:usernameRef.current.value
      }
      console.log(updatedUsername)
      const updatedUser=await axios.put(baseURL+'/api/user/username',updatedUsername,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(updatedUser.data)
      setUser(updatedUser.data)
    }catch(err){
      console.log(err.message)
    }
  }
  async function handleDelete(e){
    e.preventDefault()
    try{
      await axios.delete(`/api/user/delete`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
    navigate('/signup')
    }catch(err){
      console.log(err.message)
    }
  }
  return (
    <div>
      <h3>Username: {user.username}</h3>
      <p>Email: {hiddenEmail}</p>
      <br />

      <p>Change Username:</p>
      <form onSubmit={handleUsernameChange}>
        <label htmlFor="username">New Username</label>
        <br/>
        <input id='username' name='username' ref={usernameRef}/>

        <button>Change Username</button>
      </form>

      <br />

      <p>Change Password:</p>
      <form onSubmit={handlePasswordChange}>
        <label htmlFor="password">New Password</label>
        <br />
        <input id="password" name="password" ref={passwordRef} />
      <button>Change Password</button>
      </form>

      <br />

      <p>Delete Account:</p>
      <form onSubmit={handleDelete}></form>
      <label htmlFor="password">Enter your password</label>
      <input id='password' name='password' ref={password2Ref}></input>
      <button>Submit</button>
      <form></form>
      </div>
  )
}
