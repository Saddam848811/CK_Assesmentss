import axios from "axios";
const getUsernameByEmail = async (email) => {
  const response = await axios.post(
    `http://localhost:8080/user/getUsernameByEmail?email=${email}`,
    {},
    { withCredentials: true }
  );

  return response;
};

export default getUsernameByEmail;
