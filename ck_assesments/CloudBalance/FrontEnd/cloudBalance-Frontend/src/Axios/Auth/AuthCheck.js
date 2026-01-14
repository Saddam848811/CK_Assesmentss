import { api } from "../Interceptor/axios";

const authCheck = async () => {
  const response = await api.get("/auth/authCheck");
  return response;
};

export { authCheck };
