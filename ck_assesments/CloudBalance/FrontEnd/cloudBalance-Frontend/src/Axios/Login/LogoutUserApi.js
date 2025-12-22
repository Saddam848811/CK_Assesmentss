import axios from "axios";

const logoutUserapi = async () => {

  
  const response = await axios.post("http://localhost:8080/auth/login", {}
  ,
  {
    withCredentials:true
  });
  console.log(response.status, "response");

  return response.status;
};

export default logoutUserapi;
