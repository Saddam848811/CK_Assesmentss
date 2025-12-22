import axios from 'axios'
const getUserByEmail = async ()=>{

    console.log("sakhsbdjavdjavdgh");
    
    const email = "alice.johnson@example.com"
    const response =  await axios.post(`http://localhost:8080/user/getUserByEmail?email=${email}`,{},{withCredentials:true})

    console.log(response," from getUserByEmail api");
    
    return response
}

export default getUserByEmail;