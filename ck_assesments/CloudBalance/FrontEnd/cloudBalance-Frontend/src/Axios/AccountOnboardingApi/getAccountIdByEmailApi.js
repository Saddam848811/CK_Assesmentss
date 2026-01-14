import axios from 'axios'
export const getAccountIdByEmailApi=async(userEmail)=>{

    
    const response = await axios.get(`http://localhost:8080/account/getAccountIdByEmail?email=${userEmail}`,{withCredentials:true})


    return response;
    
}