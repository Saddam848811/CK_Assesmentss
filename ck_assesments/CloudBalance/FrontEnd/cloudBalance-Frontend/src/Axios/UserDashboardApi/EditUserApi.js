import axios from "axios";
const editUserapi = async (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    password: user.password,
    email: user.email,
    role: user.role,
    active: user.active,
    accountList:
      user.accountList?.map((account) => ({
        id: account.id,
        accountId: account.accountId,
        accountName: account.accountName,
        resourceName: account.resourceName,
        serviceType: account.serviceType,
        platform: account.platform,
        instanceType: account.instanceType,
        active: account.active,
      })) || [],
  };

  try {
    const response = await axios.post(
      "http://localhost:8080/user/editUserById",
      payload,
      { withCredentials: true }
    );

    
    return response.status;
  } catch (error) {

    console.log(error);

    throw error;
  }
  // const response = await api.post("/user/editUserById",payload )
};

export default editUserapi;
