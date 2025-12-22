import axios from 'axios'
const getUsersApi=async()=>{


    const response = await axios.get("http://localhost:8080/user/getUsers",{withCredentials:true})

    return response;
    
}

export default getUsersApi;