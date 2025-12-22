import axios from "axios";

const getUserByIdApi = async (user) => {
  const response = await axios.post(
    `http://localhost:8080/user/getUserById?id=${user.id}`,{},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export default getUserByIdApi;
