export const openSidebar = () => {
  return {
    type: "openSidebar",
  };
};

export const loginUser = () => {
  return {
    type: "loginUser",
  };
};
export const logoutUser = () => {
  return {
    type: "logoutUser",
  };
};

export const setUserRole = (role) => {
  return {
    type: "setRole",
    payload: role,
  };
};

export const setUserEmail = (role) => {
  return {
    type: "setEmail",
    payload: role,
  };
};
