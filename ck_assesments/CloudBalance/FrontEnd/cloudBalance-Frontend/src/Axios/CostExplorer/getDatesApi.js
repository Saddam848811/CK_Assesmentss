import axios from 'axios'

export const getDatesApi=async()=>{

    const response = await axios.get("http://localhost:8080/costExplorer/getDates",{withCredentials:true})

    


    return response;
    
}