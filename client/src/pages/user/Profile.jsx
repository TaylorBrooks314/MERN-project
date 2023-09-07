/* eslint-disable react/prop-types */
import axios from 'axios'
import { useRef } from "react"
import { useNavigate } from 'react-router-dom'
import baseURL from '../../api'

export default function Profile({user,setUser,loading,setLoading}) {
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
    setLoading(true)
    try{
      const updatedPassword={
        password:passwordRef.current.value
      }
      const updatedUser= await axios.put(baseURL+'/api/user/password',updatedPassword,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      }) 
      console.log(updatedUser.data)
      setUser(updatedUser.data)
      setLoading(false)
    }catch(err){
      console.log(err.message)
    }
  }
  async function handleUsernameChange(e){
    e.preventDefault()
    setLoading(true)
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
      setLoading(false)
    }catch(err){
      console.log(err.message)
    }
  }
  async function handleDelete(e){
    e.preventDefault()
    try{
      await axios.delete('/api/user/delete',{
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
    <div className='text-center'>
      {loading?
        <div>Loading...</div>
        :
        <>
        <h3 className='text-decoration-line: underline text-lg'>Profile</h3>
        Username: {user.username}
      <p>Email: {hiddenEmail}</p>

      <div className='border border-black m-5'>
      <p className='text-decoration-line: underline'>Change Username:</p>
      <form onSubmit={handleUsernameChange} className='space-x-5'>
        <label htmlFor="username">New Username</label>
        <input id='username' name='username' ref={usernameRef} className='border border-black rounded-lg'/>
        <button className='border border-black m-3 bg-blue-600 rounded p-1 hover:bg-gray-500'>Change Username</button>
      </form>
      </div>

      <div className='border border-black m-5'>
      <p className='text-decoration-line: underline'>Change Password:</p>
      <form onSubmit={handlePasswordChange} className='space-x-5'>
        <label htmlFor="password">New Password</label>
        <input id="password" name="password" ref={passwordRef} className='border border-black rounded-lg'/>
      <button className='border border-black m-3 bg-blue-600 rounded p-1 hover:bg-gray-500'>Change Password</button>
      </form>
      </div>
      
      <div className='border border-black m-5'>
      <p className='text-decoration-line: underline'>Delete Account:</p>
      <form onSubmit={handleDelete} className='space-x-5'>
      <label htmlFor="password"> Password</label>
      <input id='password' name='password' ref={password2Ref} className='border border-black rounded-lg'/>
      <button className='border border-black m-3 bg-red-600 rounded p-1 hover:bg-gray-500'>Delete account</button>
      </form>
      </div>
        </>

      }

      
      </div>
  )
}
