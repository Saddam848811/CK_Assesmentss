import axios from "axios";

const addUserapi = async (user) => {

  console.log(user,"user from add user api");
  

  const response = await axios.post("http://localhost:8080/user/addUser", {
    username: user.username,
    password: user.password,
    email: user.email,
    role: user.role,
    active:"false"
  },
{
  withCredentials:true
});

  console.log(response);

  return response;
  
};

export default addUserapi;
