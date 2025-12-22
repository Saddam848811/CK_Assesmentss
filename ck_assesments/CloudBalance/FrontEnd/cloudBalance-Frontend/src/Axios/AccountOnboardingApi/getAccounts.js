import axios from 'axios'
export const getAccounts=async()=>{

    const response = await axios.get("http://localhost:8080/account/getAccounts",{withCredentials:true})

    console.log(response, " from get accountts api");

    return response;
    
}