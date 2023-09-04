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
    <div className="relative px-4 py-4 flex justify-between items-center bg-white">
      {user.username?
      <>
        <p>welcome {user.username}</p>
        <ul>
          <li>
        <Link to="/profile">Profile</Link>
          </li>
          <li>
        <button onClick={logout}>Logout</button>
          </li>
        <br />
          <li>
        <Link to="/year">Year </Link>
          </li>
          <li>
        <Link to="/month">Month </Link>
          </li>
          <li>
        <Link to="/day">Day </Link>
          </li>
          <li>
        <Link to="/week">Week </Link>
         </li>
        </ul>
      </>
      :
      <>
      <div className="lg:hidden">
			<button className="navbar-burger flex items-center text-blue-600 p-3">
				<svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<title>Mobile menu</title>
					<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
				</svg>
			</button>
		</div>
        <ul className=" absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li className="text-sm text-gray-400 hover:text-gray-500">
        <Link to="/login">Login</Link>
          </li>
          <li className="text-gray-300">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
				</svg>
			</li>
          <li className="text-sm text-blue-600 font-bold">
        <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </>
      }
     
      <br />      
    </div>

  )
}
