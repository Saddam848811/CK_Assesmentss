import React, { useEffect, useState } from "react";
import { IoPeople } from "react-icons/io5";
import logo from "../../assets/logo/logo.svg";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, openSidebar } from "../../Redux/Actions";
import getUsernameByEmail from "../../Axios/UserDashboardApi/getUsernameByEmail";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(null);

  const userEmail = useSelector((state) => state.email?.userEmail ?? null);

  useEffect(() => {
    if (!userEmail) return;

    const fetchUsername = async () => {
      try {
        const response = await getUsernameByEmail(userEmail);
        setName(response.data);
      } catch (error) {
        console.error("Failed to fetch username", error);
      }
    };

    fetchUsername();
  }, [userEmail]);

  return (
    <>
      <div className="h-[70px] md:h-[75px] w-full">
        <div className="w-full h-full flex items-center justify-between shadow-md shadow-gray-300 px-4">
          <div className="flex  gap-3 md:w-[20%]  items-center justify-center">
            <img className="h-8 md:h-10 " src={logo} alt="" />
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
          </div>

          <div className=" flex items-center gap-4 md:w-[25%] justify-between">
            <div className="hidden sm:flex w-auto h-full items-center hover:bg-[#eaeeff] cursor-pointer px-3 py-1 rounded">
              <div className="border-2 border-[#007ddd] w-10 h-10 rounded-full flex justify-center items-center">
                <IoPeople size={24} color="#007ddd" />
              </div>
              <div className="ml-3">
                <div className="text-[#6a6c6e] text-sm">Welcome,</div>
                <div className="font-bold text-[#007ddd]">{name}</div>
              </div>
            </div>

            <div className=" flex justify-center items-center hover:bg-[#eaeeff] cursor-pointer border-2 border-[#4398d7] h-10 px-3 rounded">
              <TbLogout size={24} color="#007ddd" />
              <button
                onClick={() => {
                  dispatch(logoutUser());
                  navigate("/user-login");
                }}
                className="text-[#4398d7] font-bold ml-1 "
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
