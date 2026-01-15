import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authCheck } from "../Axios/Auth/AuthCheck";
import { useDispatch } from "react-redux";
import { setUserEmail, setUserRole } from "../Redux/Actions";
import Loading from "../Components/Loading/Loading";

function Authorize() {
  const [status, setStatus] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const authenticationCheck = async () => {
      try {
        const authCheckres = await authCheck();

        console.log(authCheck,"authcheck res");
        
        setStatus(authCheckres.status);
        dispatch(setUserRole(authCheckres.data.authorities[0].authority));
        dispatch(setUserEmail(authCheckres.data.username));
      } catch (error) {
        const status = error.response?.status || 500;
        setStatus(status);
      }
    };

    authenticationCheck();
  }, [dispatch]);

  if (status === null) {
    return <Loading />;
  }
  if (status === 403 || status === 400 || status === 401) {
    return <Navigate to="/user-login" />;
  }

  if (status === 200) {
    return <Outlet />;
  }

  return null;
}

export default Authorize;
