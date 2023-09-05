/* eslint-disable react/prop-types */
import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
export default function Login({setUser}) {

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
            let response= await axios.post('/auth/login',form)
            const token=response.data.token
            if(!token){
                setForm(emptyForm)
                console.log("no token(maybe check backend)")
                return
            }
            console.log(token)
            localStorage.setItem("token",token)
            const userResponse= await axios.get('api/user', {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(userResponse.data)
            setUser(userResponse.data)

            navigate('/month')
        }catch(err){
            console.log(err.message)
        }
    }
  return (
    <div className='flex flex-col items-center '>
        <h1 className=' text-decoration-line: underline'>Log in</h1>
        <form onSubmit={handleSubmit} className='border border-black flex flex-col'>
            <label htmlFor="username" className='text-center'>Username:</label>
            <input id="username" name="username" onChange={handleChange} className='border border-black' />
            <br />
            <label htmlFor="password" className='text-center'>Password:</label>
            <input type='password' id="password" name="password" onChange={handleChange} className='border border-black'/>
            <br />
            <button className='border border-black' >Submit</button>
        </form>
    </div>
  )
}
