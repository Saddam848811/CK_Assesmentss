import axios from 'axios'
const editUserapi=async(user)=>{


    const response = await axios.post("http://localhost:8080/user/editUserById",
        {
    "id": `${user.id}`,
    "username": `${user.username}`,
    "password": `${user.password}`,
    "email": `${user.email}`,
    "role": `${user.role}`,
    "active": `${user.active}`
},
{
    withCredentials:true
} )


    return response.data;

}

export default editUserapi;