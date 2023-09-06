/* eslint-disable react/prop-types */
import {useNavigate,Link} from 'react-router-dom'


export default function Navbar({user,setUser,year,month,day}) {
  const navigate=useNavigate()
  function logout(){
    localStorage.removeItem('token')
    setUser({})
    navigate('/login')
  }
  return (
    <div className=" pt-2 bg-gray-200">
      {user.username?
      <ul className='flex flex-wrap justify-around'>
        <p className='font-bold'>Welcome {user.username}!!</p>
        
          <li className='text-blue-600  font-bold hover:text-gray-500'>
        <Link to="/profile">Profile</Link>
          </li>
          <li className='text-blue-600  font-bold hover:text-gray-500'>
        <button onClick={logout}>Logout</button>
          </li>
        
          <li className='text-blue-600  font-bold hover:text-gray-500'>
        <Link to={`/year/${year}`}>Year </Link>
          </li>
          <li className='text-blue-600  font-bold hover:text-gray-500'>
        <Link to={`/year/${year}/month/${month}`}>Month </Link>
          </li>
          <li className='text-blue-600  font-bold hover:text-gray-500'>
        <Link to={`/year/${year}/month/${month}/day/${day}`}>Day </Link>
          </li>
          <li className='text-blue-600  font-bold hover:text-gray-500'>
        <Link to="/week">Week </Link>
         </li>
         
      </ul>
      :
      <ul className='flex justify-around'>
      
        
          <li className="text-sm text-blue-600  font-bold hover:text-gray-500">
        <Link to="/login">Login</Link>
          </li>
          
          <li className="text-sm text-blue-600 font-bold hover:text-gray-500">
        <Link to="/signup">Signup</Link>
          </li>
          
        
      </ul>
      }
     
      <br />      
    </div>

  )
}
