/* eslint-disable react/prop-types */
import { useState } from "react"
export default function Month(props) {
    const{months}=props
    console.log(props)
    console.log(months.indexOf(props.month))

  const [month,setMonth]=useState(months.indexOf(props.month))
  const [year, setYear]= useState(props.year)
  let arr=[]

   function handleMonthChange(e){
    let index=months.indexOf(e.target.value)
    console.log(index)
    setMonth(index)
    console.log(month)
   }
   function handleYearChange(e){
    setYear(e.target.value)
   }
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
   if(month&&year){
    loadCalDays()
   }
   if(month==0){
    loadCalDays()
   }
  
  
    return (
    <div className="calendar">
        <>
          <label htmlFor="month">Month</label>
          <select id="month" onChange={handleMonthChange} defaultValue={props.month}>
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
          <select id='year' onChange={handleYearChange} defaultValue={props.year}>
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
        <div className="day-box">
          <div>SUN </div>
          <div>MON </div>
          <div>TUE </div>
          <div>WED </div>
          <div>THUR </div>
          <div>FRI </div>
          <div>SAT </div>
        
        
         {arr.map((day,i)=>{
            return(
                <div key={i}>{day}</div>
            )
         })}
        </div>
    </div>
  )
}
