/* eslint-disable react/prop-types */
import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import baseURL from '../../api'
export default function SignUp({setUser}) {
    const navigate=useNavigate()
    const emptyForm={
        username:'',
        email:'',
        password:''
    }
    const [form, setForm]=useState(emptyForm)
    function handleChange(e){
        setForm({...form, [e.target.name]:e.target.value})
    }
    async function handleSubmit(e){
        e.preventDefault()
        try{
            let response= await axios.post(baseURL+'/auth/signup',form)
            const token=response.data.token
            if(!token){
                setForm(emptyForm)
                console.log("no token(maybe check backend)")
                return
            }
            localStorage.setItem("token",token)
            const userResponse= await axios.get(baseURL+'api/user', {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setUser(userResponse.data)
            

            navigate('/month')
        }catch(err){
            console.log(err.message)
        }
    }
  return (
    <div className='flex flex-col items-center '>
        <h1 className=' text-decoration-line: underline'>Sign up</h1>
        <form onSubmit={handleSubmit} className='border border-black flex flex-col bg-gray-200'>
            <label htmlFor="username" className='text-center'>Username:</label>
            <input id="username" name="username" onChange={handleChange} className='border border-black'/>
            <br />
            <label htmlFor="email" className='text-center'>Email:</label>
            <input type="email" id="email" name="email" onChange={handleChange} className='border border-black'/>
            <br />
            <label htmlFor="password" className='text-center'>Password:</label>
            <input type='password' id="password" name="password" onChange={handleChange} className='border border-black'/>
            <br />
            <button>Submit</button>
        </form>
    </div>
  )
}
