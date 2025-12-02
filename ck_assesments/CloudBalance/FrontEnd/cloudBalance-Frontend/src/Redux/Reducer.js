import { combineReducers } from "redux";

const sidebarInitialState = {
  openSidebar: false,
};

const loginInitialState = {
  isLoggedin: localStorage.getItem("isLoggedin") ,
};

export const sideBarReducer = (state = sidebarInitialState, action) => {
  switch (action.type) {
    case "openSidebar":
      return { ...state, openSidebar: !state.openSidebar };
    default:
      return state;
  }
};

export const loginReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case "loginUser": {
      localStorage.setItem("isLoggedin", true)
      return { ...state, isLoggedin: localStorage.getItem("isLoggedin") };
    }

    case "logoutUser":
      localStorage.removeItem("isLoggedin")
      return { ...state, isLoggedin: null };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  sidebar: sideBarReducer,
  login: loginReducer,
});
