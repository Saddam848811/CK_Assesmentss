import axios from "axios";

const loginUserapi = async (loginData) => {

  
  const response = await axios.post("http://localhost:8080/auth/login", {
    email: loginData.email,
    password: loginData.password,
  },
  {
    withCredentials:true
  });
  console.log(response.status, "response");

  return response.status;
};

export default loginUserapi;
