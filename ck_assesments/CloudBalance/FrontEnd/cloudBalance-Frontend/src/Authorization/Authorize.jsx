import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authCheck } from "../Axios/Auth/AuthCheck";
import { useDispatch, useSelector } from "react-redux";
import { setUserRole } from "../Redux/Actions";

function Authorize() {
  const [status, setStatus] = useState(null);
  const [role, setRole] = useState();

  const dispatch = useDispatch();


  // const userRole = useSelector((state) => state.role?.userRole ?? null);
  // console.log(userRole, "user roles from Authorize comp");

  useEffect(() => {
    const authenticationCheck = async () => {
      try {
        const authCheckres = await authCheck();
        console.log(
          authCheckres.data.authorities[0].authority,
          "authcheck from authorization comp"
        );
        setStatus(authCheckres.status);
        setRole(authCheckres.data.authorities[0].authority);
        dispatch(setUserRole(authCheckres.data.authorities[0].authority))

      } catch (error) {
        console.log(error.response.status, "auth failed");
        setStatus(error.response.status);
      }
    };

    authenticationCheck();
  }, []);


  console.log(role,"role from authroixation comp");
  

  if (status === null) {
    return <div>Loading...</div>;
  }
  if (status === 403) {
    return <Navigate to="/user-login" />;
  }

  if (status === 401) {
    return <Navigate to="/user-login" />;
  }

  if (status === 200) {
    return <Outlet />;
  }

  return null;
}

export default Authorize;
