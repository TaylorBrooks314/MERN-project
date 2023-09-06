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
        arr[i]=arr[i]+todos[j].title
      }
    }
  }
  console.log(arr)
  
    return (
    <div className="calendar">
        <>
          <label htmlFor="month">Month</label>
          <select id="month" onChange={handleMonthChange} defaultValue={months[params.month]}>
          <option></option>
          <option value='JAN'>JAN</option>
          <option value='FEB'>FEB</option>
          <option value='MAR'>MAR</option>
          <option value='APR'>APR</option>
          <option value='MAY'>MAY</option>
          <option value='JUN'>JUN</option>
          <option value='JUL'>JUL</option>
          <option value='AUG'>AUG</option>
          <option value='SEP'>SEP</option>
          <option value='OCT'>OCT</option>
          <option value='NOV'>NOV</option>
          <option value='DEC'>DEC</option>
          </select>
        </>

        <>
          <label htmlFor="year">Year</label>
          <select id='year' onChange={handleYearChange} defaultValue={params.year}>
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
        <div className= "grid grid-cols-7">
          <div className="border border-gray-200 text-center text-blue-600">SUN </div>
          <div className="border border-gray-200 text-center text-blue-600">MON </div>
          <div className="border border-gray-200 text-center text-blue-600">TUE </div>
          <div className="border border-gray-200 text-center text-blue-600">WED </div>
          <div className="border border-gray-200 text-center text-blue-600">THUR </div>
          <div className="border border-gray-200 text-center text-blue-600">FRI </div>
          <div className="border border-gray-200 text-center text-blue-600">SAT </div>
        
        
         {arr.map((day,i)=>{
            return(
                <div className="border border-gray-200 " onClick={()=>handleNav(day)} key={i} value={day}>{day}</div>
            )
         })}
        </div>
    </div>
  )
}
