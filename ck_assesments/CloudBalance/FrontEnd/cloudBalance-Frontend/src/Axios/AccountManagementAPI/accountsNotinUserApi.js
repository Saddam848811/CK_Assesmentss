import axios from "axios";

export const accountsNotinUserApi=async(user)=>{

    const response = await axios.post(`http://localhost:8080/user_account/accountsNotinUser?id=${user.id}`,{},{withCredentials:true})

    // console.log(response.data,"from accountsNotinUserApi");

    return response;
    
}