import axios from 'axios'
const editUserapi=async(user)=>{


    const response = await axios.post("http://localhost:8080/user/editUserById",
        {
    "id": `${user.id}`,
    "firstName": `${user.firstName}`,
    "lastName": `${user.lastName}`,
    "email": `${user.email}`,
    "role": `${user.role}`,
    "lastLogin": `${user.lastLogin}`,
    "active": `${user.active}`
} )


    return response.data;

}

export default editUserapi;