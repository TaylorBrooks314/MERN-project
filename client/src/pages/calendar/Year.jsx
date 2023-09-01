/* eslint-disable react/prop-types */
import MonthComp from "../../components/MonthComp"
export default function Year({currentYear,months}) {
  return (
    <div>
      {months.map((month,i)=>{
        return(
    
          <MonthComp key={i} month={month} year={currentYear} months={months} />
        
        )
      })}

    </div>
  )
}
