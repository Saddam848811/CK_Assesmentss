import axios from "axios";
const getUserByEmail = async (email) => {
  const response = await axios.post(
    `http://localhost:8080/user/getUserByEmail?email=${email}`,
    {},
    { withCredentials: true }
  );

  return response;
};

export default getUserByEmail;
