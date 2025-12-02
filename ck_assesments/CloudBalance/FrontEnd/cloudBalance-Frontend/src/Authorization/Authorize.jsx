import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function Authorize() {
    
  const isLoggedin = useSelector((state) => state.login.isLoggedin);
  console.log(isLoggedin);
  console.log(isLoggedin," from autthrize");
  

  if(isLoggedin == null){
   return  <Navigate to={"/user-login"}/>
  }

  

  return (
    <div>
        <Outlet/>
    </div>
  );
}

export default Authorize;
