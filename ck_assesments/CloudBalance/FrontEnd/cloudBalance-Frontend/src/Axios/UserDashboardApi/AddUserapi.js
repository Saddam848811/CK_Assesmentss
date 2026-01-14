import axios from "axios";

const addUserapi = async (user) => {
  const payload = {
    username: user.username,
    password: user.password,
    email: user.email,
    role: user.role,
    active: false,
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
      "http://localhost:8080/user/addUser",
      payload,
      { withCredentials: true }
    );

    // console.log(response);
    return response.status;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default addUserapi;
