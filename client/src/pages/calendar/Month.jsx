/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import {useNavigate, useParams} from "react-router-dom"
import axios from 'axios'
import baseURL from "../../api"
export default function Month(props) {
  const navigate=useNavigate()
  // takes in month, year,months
  const{months}=props
  const params= useParams()
  console.log(params)

  // month is a number because date obj takes number for month
  const [month,setMonth]=useState(params.month)
  const [year, setYear]= useState(params.year)
  const [todos, setTodos]=useState([])
  // push days in to this arr and map to create calendarDays
  let arr=[]

  useEffect(()=>{
    getTodos()
  },[])

  // reloads calendar when month changes 
  function handleMonthChange(e){
    let index=months.indexOf(e.target.value)
    setMonth(index)
  }

  // reloads calendar when year changes
  function handleYearChange(e){
    setYear(e.target.value)
  }

  //  calculates how many days are the month
   function daysInMonth(month, year){
        if (month==0){
            let d = new Date(year-1, month+1, 0)
            return d.getDate();
        }
        let d = new Date(year, month+1, 0);
        return d.getDate();
    }

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

   if(year){
    if(month||month==0)
    loadCalDays()
   }
  function handleNav(e){
    if(e[3]){
    e=e.slice(0,e.indexOf("-"))
    }
    navigate(`/year/${year}/month/${month}/day/${e}`)
  }
  async function getTodos(){
    try{
      let response= await axios.get(baseURL+'/api/todo/month')
      setTodos(response.data)
    }catch(err){
      console.log(err.message)
    }
  }
  for(let i =0; i<arr.length;i++){
    for(let j=0; j<todos.length;j++){
      console.log(todos[j].date) 
      if(todos[j].date==`${year}${month}${arr[i]}`){
        arr[i]+="-"+todos[j].title
      }
    }
  }
  console.log(arr)
  
    return (
    <div className="calendar bg-gradient-to-r from-purple-500 to-pink-500">
        <>
          <label htmlFor="month">Month</label>
          <select id="month" onChange={handleMonthChange} defaultValue={months[params.month]} className="border border-black rounded bg-gradient-to-r from-purple-500 to-pink-500">
          <option></option>
          <option value='JANUARY'>JANUARY</option>
          <option value='FEBRUARY'>FEBRUARY</option>
          <option value='MARCH'>MARCH</option>
          <option value='APRIL'>APRIL</option>
          <option value='MAY'>MAY</option>
          <option value='JUNE'>JUNE</option>
          <option value='JULY'>JULY</option>
          <option value='AUGUST'>AUGUST</option>
          <option value='SEPTEMBER'>SEPTEMBER</option>
          <option value='OCTOBER'>OCTOBER</option>
          <option value='NOVEMBER'>NOVEMBER</option>
          <option value='DECEMBER'>DECEMBER</option>
          </select>
        </>

        <>
          <label htmlFor="year">Year</label>
          <select id='year' onChange={handleYearChange} defaultValue={params.year} className="border border-black rounded bg-gradient-to-r from-purple-500 to-pink-500">
          <option></option>
          <option>2018</option>
          <option>2019</option>
          <option>2020</option>
          <option>2021</option>
          <option>2022</option>
          <option>2023</option>
          <option>2024</option>
          <option>2025</option>
          <option>2026</option>
          <option>2027</option>
          <option>2028</option>
          </select>
        </>
        <br />
        
        <br />
        <div className= "grid grid-cols-7 ">
          <div className="border border-gray-200 text-center ">SUN </div>
          <div className="border border-gray-200 text-center ">MON </div>
          <div className="border border-gray-200 text-center ">TUE </div>
          <div className="border border-gray-200 text-center ">WED </div>
          <div className="border border-gray-200 text-center ">THUR </div>
          <div className="border border-gray-200 text-center ">FRI </div>
          <div className="border border-gray-200 text-center ">SAT </div>
        
        
         {arr.map((day,i)=>{
            return(
                <div className="border border-gray-200 " onClick={()=>handleNav(day)} key={i} value={day}>{day}</div>
            )
         })}
         
        </div>
    </div>
  )
}
