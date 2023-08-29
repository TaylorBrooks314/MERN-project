import { useState } from "react"
export default function MonthComp() {
  const [month,setMonth]=useState('')
  const [year, setYear]= useState('')
  let arr=[]
  const months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
   function handleMonthChange(e){
    let index=months.indexOf(e.target.value)
    setMonth(index)
   }
   function handleYearChange(e){
    setYear(e.target.value)
   }
   function daysInMonth(month, year){
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
        arr.push('E')
    }
    for(let i=1; i<=numOfDays;i++){
        arr.push(i)
    }
    console.log(arr)
   }
   if(month&&year){
    loadCalDays()
   }
  
  
  
    return (
    <div className="calendar">
        <>
          <label htmlFor="month">Month</label>
          <select id="month" onChange={handleMonthChange} >
          <option></option>
          <option>JAN</option>
          <option>FEB</option>
          <option>MAR</option>
          <option>APR</option>
          <option>MAY</option>
          <option>JUN</option>
          <option>JUL</option>
          <option>AUG</option>
          <option>SEP</option>
          <option>OCT</option>
          <option>NOV</option>
          <option>DEC</option>
          </select>
        </>
        <br />
        <>
          <label htmlFor="year">Year</label>
          <select id='year' onChange={handleYearChange}>
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
        <br></br>
        <>
          <>SUN </>
          <>MON </>
          <>TUE </>
          <>WED </>
          <>THUR </>
          <>FRI </>
          <>SAT </>
        </>
        <div>
         {arr.map((day,i)=>{
            return(
                <div key={i}>{day}</div>
            )
         })}
        </div>
    </div>
  )
}
