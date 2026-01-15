import axios from 'axios'

export const setActiveApi = async(user,status)=>{


    const response = await axios.post(`http://localhost:8080/account/setActive?id=${user.id}`,{},{withCredentials:true})


    return response
    
}