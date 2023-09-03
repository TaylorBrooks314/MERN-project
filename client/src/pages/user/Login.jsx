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
    <div>
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" onChange={handleChange}/>
            <br />
            <label htmlFor="password">Password</label>
            <input type='password' id="password" name="password" onChange={handleChange}/>
            <br />
            <button>Submit</button>
        </form>
    </div>
  )
}
