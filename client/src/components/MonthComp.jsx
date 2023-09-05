/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom"
export default function MonthComp(props) {

    const navigate=useNavigate()

    let {months,month,year}=props
    console.log(props)
    console.log(months.indexOf(month))
    month=months.indexOf(month)
//   const [month,setMonth]=useState(months.indexOf(props.month))
//   const [year, setYear]= useState(props.year)
  let arr=[]

//    function handleMonthChange(e){
//     let index=months.indexOf(e.target.value)
//     console.log(index)
//     setMonth(index)
//     console.log(month)
//    }
//    function handleYearChange(e){
//     setYear(e.target.value)
//    }
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
    navigate('/month',{month:month, year:year, months:months})
   }
  
    return (
    <div className="calendar" onClick={handleNav}>

          <h3 className='text-xl text-decoration-line: underline'> {months[month]}, {year}</h3>
        <br></br>
        <div className="grid grid-cols-7">
          <div className='border border-gray-200 text-center text-blue-600'>SUN </div>
          <div className='border border-gray-200 text-center text-blue-600'>MON </div>
          <div className='border border-gray-200 text-center text-blue-600'>TUE </div>
          <div className='border border-gray-200 text-center text-blue-600'>WED </div>
          <div className='border border-gray-200 text-center text-blue-600'>THUR </div>
          <div className='border border-gray-200 text-center text-blue-600'>FRI </div>
          <div className='border border-gray-200 text-center text-blue-600'>SAT </div>
        
        
         {arr.map((day,i)=>{
            return(
                <div className='border border-gray-200' key={i}>{day}</div>
            )
         })}
        </div>
    </div>
  )
}
