import React, { useEffect, useState } from "react";
import logo from "../../assets/logo/logo.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import  {loginUser, setUserRole}  from "../../Redux/Actions";
import loginUserapi from "../../Axios/Login/LoginUserapi";
import { authCheck } from "../../Axios/Auth/AuthCheck";

function Login() {
  const navigate = useNavigate();
    const [status, setStatus] = useState(null);
      const dispatch = useDispatch();

      const[role, setRole] = useState();

  
  // const dispatch = useDispatch();

  // const state = useSelector((state) => state.login.isLoggedin);
  // console.log(state, "from login oage");

  const [loginData, setLoginData] = useState({});

  console.log(loginData,"login data from login");
  

  useEffect(() => {
    const authenticationCheck = async () => {
      try {
        const authCheckres = await authCheck();
        console.log(authCheckres, "authcheck from authorization comp");
        setStatus(authCheckres.status);
        setRole(authCheckres.data.authorities[0].authority)
        // dispatch(setUserRole(authCheckres.data.authorities[0].authority))
      } catch (error) {
        console.log(error, "auth failed");
        setStatus(401);
      }
    };

    authenticationCheck();
  }, [status]);

  // const userRole = useSelector(state => state.role?.userRole ?? null);
  //   console.log(userRole,"user roles from login comp");
    



  // if (status === 200 ) {
  //   return <Navigate to="/cost-explorer-dashboard" />;
  // }
    
 

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginuser=async()=>{

      const status =await  loginUserapi(loginData);
      console.log(status,"status from logiuserapi");
      setStatus(status)
      // status == 200? navigate("/user-table"):alert("login failed")
    }
    loginuser();
   
    // dispatch(loginUser());
    // navigate("/user-table");
  };


  if (status === null) {
    return <div>Loading...</div>;
  }

  if (status === 200 && role === "ROLE_ADMIN" ) {
    return <Navigate to="/user-table" />;
  }

  if (status === 200 && role === "ROLE_CUSTOMER" ) {
    return <Navigate to="/cost-explorer-dashboard" />;
  }
  if (status === 200 && role === "ROLE_READONLY" ) {
    return <Navigate to="/user-table" />;
  }



  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="h-[50%] w-[50%] flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between w-[70%] h-[80%]"
          >
            <div className="h-[20%] flex justify-center">
              <img className="w-[50%] h-[100%]" src={logo} alt="" />
            </div>

            <div className="h-[20%]">
              <div className="h-[40%]">
                <label>
                  User Email <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="h-[60%] flex justify-end">
                <input
                  onChange={(e)=>setLoginData({...loginData,email:e.target.value})}
                  className="ml-2 border-1 border-[#7b7d86] rounded h-[100%] w-[100%] pl-4"
                  type="email"
                  placeholder="   Enter Email"
                  required
                />
              </div>
            </div>

            <div className="h-[20%]">
              <div className="h-[40%]">
                <label>
                  Password <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="h-[60%] flex justify-end">
                <input
                  onChange={(e)=>setLoginData({...loginData,password:e.target.value})}
                  className="ml-2 border-1 border-[#7b7d86] rounded h-[100%] w-[100%] pl-4"
                  type="password"
                  placeholder="   Enter Password"
                  required
                />
              </div>
            </div>

            <div className="h-[20%] flex flex-col justify-between">
              <div className="h-[20%] flex justify-end items-center"></div>
              <div className="h-[60%] flex justify-center items-center">
                <button
                  type="submit"
                  className="w-[100%] h-[100%] bg-[#4398d7] text-white"
                >
                  Log In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
