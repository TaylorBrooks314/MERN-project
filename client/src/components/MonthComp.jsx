/* eslint-disable react/prop-types */
import axios from 'axios'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import baseURL from '../api'
export default function MonthComp(props) {
  const [todos,setTodos]=useState([])
    const navigate=useNavigate()

    let {months,month,year}=props
    console.log(props)
    console.log(months.indexOf(month))
    month=months.indexOf(month)
  let arr=[]
  useEffect(()=>{
    getTodos()
  },[])


   function daysInMonth(month, year){
        if (month==0){
            let d = new Date(year-1, month+1, 0)
            return d.getDate();
        }
        let d = new Date(year, month+1, 0);
        return d.getDate();
    }
    
    loadCalDays()
    
   function loadCalDays(){
    console.log(year,month)
    let tmpDate = new Date(year, month);
    console.log(tmpDate)
    let numOfDays = daysInMonth(month, year);
    let dayOfWeek = tmpDate.getDay(); 
    
    for(let i =0; i<dayOfWeek;i++){
        arr.push('')
    }
    for(let i=1; i<=numOfDays;i++){
        arr.push(i)
    }
    console.log(arr)
   }
  
   function handleNav(){
    navigate(`/year/${year}/month/${month}`,{month:month, year:year, months:months})
   }
   async function getTodos(){
    try{
      
      let response= await axios.get(baseURL+'/api/todo/month')
      console.log(response)
      setTodos(response.data)
    }catch(err){
      console.log(err.message)
    }
  }
  console.log(todos)
  for(let i =0; i<arr.length;i++){
    for(let j=0; j<todos.length;j++){
      if(todos[j].date==`${year}${month}${arr[i]}`){
        arr[i]+="-"+todos[j].title
      }
    }
  }
  
    return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500" onClick={handleNav}>
        {/* {todos.map((todo,i)=>{
          return(
          <p key={i}>{todo.title}</p>
          )
        })} */}
          <h3 className='text-xl text-decoration-line: underline'> {months[month]}, {year}</h3>
        <br></br>
        <div className="grid grid-cols-7">
          <div className='border border-gray-200 text-center '>SUN </div>
          <div className='border border-gray-200 text-center '>MON </div>
          <div className='border border-gray-200 text-center '>TUE </div>
          <div className='border border-gray-200 text-center '>WED </div>
          <div className='border border-gray-200 text-center '>THUR </div>
          <div className='border border-gray-200 text-center '>FRI </div>
          <div className='border border-gray-200 text-center '>SAT </div>
        
        
         {arr.map((day,i)=>{
            return(
                <div className='border border-gray-200' key={i}>{day}</div>
            )
         })}
        </div>
    </div>
  )
}
