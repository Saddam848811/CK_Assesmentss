import React from "react";
import logo from "../../assets/logo/logo.svg";
import LoginButton from "../../Components/Buttons/LoginButton";
import LoginInputs from "../../Components/Inputs/LoginInputs";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="h-[50%] w-[50%] flex justify-center items-center">
          <div className="  flex flex-col justify-between w-[70%] h-[80%] ">
            <div className=" h-[20%] flex justify-center">
              <img className="w-[50%] h-[100%]" src={logo} alt="" />
            </div>
            <div className="  h-[20%]">
              <div className=" h-[40%]">
                <label htmlFor="">User Name</label>
              </div>
              <div className=" h-[60%] flex justify-end">
                <LoginInputs placeHolder={"   Buisness Email"} />
              </div>
            </div>
            <div className=" h-[20%]">
              <div className=" h-[40%]">
                <label htmlFor="">Password</label>
              </div>
              <div className=" h-[60%]  flex justify-end">
                <LoginInputs placeHolder={"    Password"} />
              </div>
            </div>
            <div className=" h-[20%] flex flex-col justify-between">
              <div className=" h-[20%] flex justify-end items-center ">
                <a className=" text-[#4398d7] font-bold" href="">
                  Forget Password?
                </a>
              </div>
              <div className=" h-[60%] flex justify-center items-center">
                <LoginButton
                  onClick={(e) => {
                    navigate('/user-table');
                  }}
                />
              </div>
            </div>
            {/* <div className=" h-[20%]">
              <div className=" h-[40%]"></div>
              <div className=" h-[60%]"></div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
