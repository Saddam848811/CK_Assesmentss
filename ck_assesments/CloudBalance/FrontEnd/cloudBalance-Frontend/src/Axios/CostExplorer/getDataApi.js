import axios from 'axios'

export const getDataApi=async()=>{

    const response = await axios.get("http://localhost:8080/costExplorer/getData",{withCredentials:true})


    return response;
    
}