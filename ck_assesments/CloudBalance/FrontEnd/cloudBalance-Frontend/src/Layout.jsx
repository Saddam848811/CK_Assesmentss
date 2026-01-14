import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import SideBar from "./Components/sideBar/SideBar";

function Layout() {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar className="flex-none" />
        <div className="flex-1 overflow-y-auto bg-[#f6f2f2]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
