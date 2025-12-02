import React from "react";
import { IoPeople } from "react-icons/io5";
import logo from "../../assets/logo/logo.svg";
import { TbLogout } from "react-icons/tb";
import { Outlet } from "react-router-dom";
import { store } from "../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, openSidebar } from "../../Redux/Actions";

function NavBar() {
  const dispatch = useDispatch();
  // const state = useSelector(state=> state.openSidebar)
  // console.log(state);

  return (
    <>
      <div className="h-[70px] md:h-[75px] w-full">
        <div className="w-full h-full flex items-center justify-between shadow-md shadow-gray-300 px-4">
          <div className="flex items-center gap-3 md:w-[20%]">
            <img className="h-8 md:h-10" src={logo} alt="" />
            <button className="flex flex-col gap-1.5 p-2 hover:bg-[#eaeeff] cursor-pointer md:hidden">
              <span className="block w-6 h-0.5 bg-[#4398d7]"></span>
              <span className="block w-6 h-0.5 bg-[#4398d7]"></span>
              <span className="block w-6 h-0.5 bg-[#4398d7]"></span>
            </button>
          </div>

          <div
            onClick={() => dispatch(openSidebar())}
            className="hidden md:flex md:w-[50%] items-center gap-5"
          >
            <button className="flex flex-col gap-1.5 p-2 hover:bg-[#eaeeff] cursor-pointer">
              <span className="block w-6 h-0.5 bg-[#4398d7]"></span>
              <span className="block w-6 h-0.5 bg-[#4398d7]"></span>
              <span className="block w-6 h-0.5 bg-[#4398d7]"></span>
            </button>

            {/* <div className="flex flex-col justify-center">
              <div className="font-bold">Module</div>

              <div className="relative inline-block group">
                <button className="flex items-center gap-1 text-gray-600 font-medium">
                  Lens
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <ul className="absolute left-0 mt-2 w-32 bg-white shadow rounded hidden group-hover:block">
                  <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Lens</li>
                  <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Tuner</li>
                  <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Auto</li>
                </ul>
              </div>
            </div> */}
          </div>

          <div className="flex items-center gap-4 md:w-[30%]">
            <div className="hidden sm:flex w-auto h-full items-center hover:bg-[#eaeeff] cursor-pointer px-3 py-1 rounded">
              <div className="border-2 border-[#007ddd] w-10 h-10 rounded-full flex justify-center items-center">
                <IoPeople size={24} color="#007ddd" />
              </div>
              <div className="ml-3">
                <div className="text-[#6a6c6e] text-sm">Welcome,</div>
                <div className="font-bold text-[#007ddd]">Saddam Husain</div>
              </div>
            </div>

            <div className="flex justify-center items-center hover:bg-[#eaeeff] cursor-pointer border-2 border-[#4398d7] h-10 px-3 rounded">
              <TbLogout size={24} color="#007ddd" />
              <button
                onClick={()=>{
                  console.log("logout dispatch from navbar");
                  
                  dispatch(logoutUser())
                  // navigate('/user-login')
                }}
                className="text-[#4398d7] font-bold ml-1"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
