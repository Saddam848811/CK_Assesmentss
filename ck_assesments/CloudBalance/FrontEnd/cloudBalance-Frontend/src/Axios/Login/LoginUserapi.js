import axios from "axios";

const loginUserapi = async (loginData) => {
  const response = await axios.post("http://localhost:8080/auth/login", {
    email: loginData.email,
    password: loginData.password,
  },
  {
    withCredentials:true
  });

  // const response = await api.post("/auth/login", {
  //   email: loginData.email,
  //   password: loginData.password,
  // });

  return response.status;
};

export default loginUserapi;
