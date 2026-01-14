import axios from 'axios'

export const removeAccountFromUserApi=async(user,account)=>{

    const response = await axios.post(`http://localhost:8080/user_account/removeAccountFromUser?userId=${user.id}&accountId=${account.id}`,{},{withCredentials:true})

    console.log(response.data,"removeAccountFromUser");
    return response
    
}