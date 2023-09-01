/* eslint-disable react/prop-types */
import '../app.css'
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

    // if(month&&year){
    //     loadCalDays()
    //    }
    //    if(month==0){
    //     loadCalDays()
    //    }
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

          <h3> {months[month]}, {year}</h3>
        <br></br>
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
