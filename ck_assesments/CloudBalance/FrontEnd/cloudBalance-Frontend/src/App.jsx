import React from "react";
import "./App.css";
import Login from "./Pages/Login/Login";
import NavBar from "./Components/NavBar/NavBar";
import UserTable from "./Pages/Dashboards/UserDashboard/UserTable.jsx";
import SideBar from "./Components/sideBar/SideBar";
import AddUser from './Pages/Dashboards/UserDashboard/AddUser'
import AccountManagement from "./Pages/Dashboards/UserAccountManagement/AccountManagement.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppRouter from "./AppRouter.jsx";
function App() {
  return (
    <>
      {/* <NavBar /> */}

      {/* <div className="flex"> */}
        {/* <SideBar /> */}
        {/* <AddUser/> */}
        {/* <UserTable/> */}
        {/* <AccountManagement/> */}

      {/* <Login/> */}

      <AppRouter/>
    </>
  );
}

export default App;
