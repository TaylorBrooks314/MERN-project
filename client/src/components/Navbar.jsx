/* eslint-disable react/prop-types */
import {useNavigate,Link} from 'react-router-dom'


export default function Navbar({user,setUser}) {
  const navigate=useNavigate()
  function logout(){
    localStorage.removeItem('token')
    setUser({})
    navigate('/login')
  }
  return (
    <div>
      {user.username?
      <>
        <p>welcome {user.username}</p>
        
        <Link to="/profile">Profile</Link>
        <button onClick={logout}>Logout</button>
        <br />
        <Link to="/year">Year </Link>
        <Link to="/month">month </Link>
        <Link to="/day">day </Link>
        <Link to="/week">week </Link>
      </>
      :
      <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </>
      }
     
      <br />      
    </div>

  )
}
