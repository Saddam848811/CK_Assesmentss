import axios from 'axios'

export const groupByApi=async(groupBy,startDate,endDate)=>{

    

    const response = await axios.post("http://localhost:8080/costExplorer/groupBy",{
        "GroupByColumn":groupBy,
        "StartDate":startDate,
        "EndDate":endDate
    },{withCredentials:true})

    // console.log(response,"group by");
    


    return response
    
}