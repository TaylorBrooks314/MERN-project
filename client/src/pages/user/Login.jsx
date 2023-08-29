import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
export default function Login() {

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
            localStorage.setItem("token",token)
            // //////////Something missing here////////
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
