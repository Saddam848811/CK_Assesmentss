import React, { useEffect, useState } from "react";
import logo from "../../assets/logo/logo.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import loginUserapi from "../../Axios/Login/LoginUserapi";
import { loginUser } from "../../Redux/Actions";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state) => state.login.isLoggedin);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (state) {
      navigate("/user-table");
    }
  }, [state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUserapi(loginData);

      if (res === 200) {
        dispatch(loginUser());
        navigate("/user-table");
      }
    } catch (error) {
      if (error.response.status === 404 || error.response.status === 400) {
        alert(`${error.response.data.message}`);
      }
    }
  };

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
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
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
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
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
