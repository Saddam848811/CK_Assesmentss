import { combineReducers } from "redux";

const sidebarInitialState = {
  openSidebar: JSON.parse(localStorage.getItem("openSidebar")) ?? true,
};

const loginInitialState = {
  isLoggedin: localStorage.getItem("isLoggedin"),
};
const getUserRole = {
  userRole: null,
};

export const sideBarReducer = (state = sidebarInitialState, action) => {
  switch (action.type) {
    case "openSidebar": {
      const newValue = !state.openSidebar;
      localStorage.setItem("openSidebar", JSON.stringify(newValue));
      return { ...state, openSidebar: newValue };
    }
    default:
      return state;
  }
};

export const loginReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case "loginUser": {
      localStorage.setItem("isLoggedin", true);
      return { ...state, isLoggedin: localStorage.getItem("isLoggedin") };
    }

    case "logoutUser":
      localStorage.removeItem("isLoggedin");
      return { ...state, isLoggedin: null };
    default:
      return state;
  }
};

export const userRole = (state = getUserRole, action) => {
  switch (action.type) {
    case "setRole": {
      
      return {...state,userRole:action.payload};
    }
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  sidebar: sideBarReducer,
  login: loginReducer,
  role: userRole,
});
