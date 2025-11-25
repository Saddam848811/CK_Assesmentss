import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import UserTable from "./Pages/Dashboards/UserDashboard/UserTable.jsx";
import NavBar from "./Components/NavBar/NavBar.jsx";
import Layout from "./Layout.jsx";
import AddUser from "./Pages/Dashboards/UserDashboard/AddUser";

function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/user-login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/user-table" element={<UserTable />} />
            <Route path="/add-user" element={<AddUser />} />
          </Route>

          {/* <Route path="/user-table" element={<UserTable />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default AppRouter;
