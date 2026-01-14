import axios from "axios";
import { api } from "../Interceptor/axios";

export const getAccountsByUserIdApi = async (user) => {
//   const response = await axios.post(
//     `http://localhost:8080/user_account/getAccountsByUserId?id=${user.id}`,
//     {},
//     { withCredentials: true }
//   );

  const response = await api.post(
    `/user_account/getAccountsByUserId?id=${user.id}`,
    {}
  );

  return response;
};
