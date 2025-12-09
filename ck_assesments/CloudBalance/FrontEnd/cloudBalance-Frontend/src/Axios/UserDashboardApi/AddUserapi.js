import axios from "axios";

const addUserapi = async (user) => {

  const response = await axios.post("http://localhost:8080/user/addUser", {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    active:"false"
  });

//   console.log(response);

  return response;
  
};

export default addUserapi;
