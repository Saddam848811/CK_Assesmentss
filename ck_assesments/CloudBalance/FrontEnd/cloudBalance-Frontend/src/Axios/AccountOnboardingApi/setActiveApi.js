import axios from 'axios'

export const setActiveApi = async(user)=>{

    console.log(user,"from set active user api fun");
    

    const response = await axios.post(`http://localhost:8080/account/setActive?id=${user.id}`,{},{withCredentials:true})

    console.log(response.data,"from set active api");

    return response
    
}