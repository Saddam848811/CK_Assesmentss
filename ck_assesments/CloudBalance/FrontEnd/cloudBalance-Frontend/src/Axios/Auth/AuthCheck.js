import axios from "axios";
const authCheck = async () => {
  const response = await axios.get("http://localhost:8080/auth/authCheck", {
    withCredentials: true,
  });

  return response;
};

export {authCheck};
