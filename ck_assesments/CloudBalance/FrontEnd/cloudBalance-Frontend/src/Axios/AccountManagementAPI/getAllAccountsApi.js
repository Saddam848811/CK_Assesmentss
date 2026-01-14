import axios from 'axios'

export const getAllAccountsApi = async()=>{

    const response = await axios.post("http://localhost:8080/user_account/getAllAccounts",{},{withCredentials:true})


    return response;
    

}