import axios from 'axios'

export const assignAccountToUserApi = async(user,account)=>{

    const response = await axios.post(`http://localhost:8080/user_account/assignAccountToUser?userId=${user.id}&accountId=${account.id}`,{},{withCredentials:true})

    console.log(response.data,"from assignAccountToUserApi");

    return response;
    
}