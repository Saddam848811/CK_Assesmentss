import axios from "axios";
import { api } from "../Interceptor/axios";

export const setActiveApi = async (user, status) => {
  // console.log(user,"from set active user api fun");

  // const response = await axios.post(`http://localhost:8080/user/setActive?id=${user.id}&status=${status}`,{},{withCredentials:true})
  const response = await api.post(
    `/user/setActive?id=${user.id}&status=${status}`,
    {}
  );

  // console.log(response.data,"from set active api");

  return response;
};
