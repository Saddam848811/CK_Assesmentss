import React from "react";
import { FaUserCog } from "react-icons/fa";
import { MdOutlineLaptopChromebook, MdOutlineViewModule } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SideBar() {
  // const [isOpen, setIsOpen] = useState(false);
  const isOpen = useSelector(state=> state.sidebar.openSidebar)

  const navigate = useNavigate();
  


  return (
    <div
      className={`h-screen p-2 shadow-md bg-white  top-0 left-0 transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}
    >
   

      <ul className="flex flex-col mt-4">
        {/* Users Management */}
        <div onClick={()=>{navigate('/user-table')}} className="flex items-center bg-blue-50 m-1 gap-3 rounded h-10 hover:bg-[#eaeeff] cursor-pointer">
          <FaUserCog className="ml-3" size={25} color="#4398d7" />
          {isOpen && (
            <li className="hover:text-[#424040] cursor-pointer">
              Users Management
            </li>
          )}
        </div>

        {/* Account Management */}
        {/* <div className="flex items-center bg-blue-50 m-1 gap-3 rounded h-10 hover:bg-[#eaeeff] cursor-pointer">
          <MdOutlineLaptopChromebook className="ml-3" size={25} color="#4398d7" />
          {isOpen && (
            <li className="hover:text-[#424040] cursor-pointer">
              Account Management
            </li>
          )} */}
        {/* </div> */}

        {/* Module Grid */}
        {/* <div className="flex items-center bg-blue-50 m-1 gap-3 rounded h-10 hover:bg-[#eaeeff] cursor-pointer">
          <MdOutlineViewModule className="ml-3" size={25} color="#4398d7" />
          {isOpen && (
            <li className="hover:text-[#424040] cursor-pointer">
              Module Grid
            </li>
          )}
        </div> */}
      </ul>
    </div>
  );
}

export default SideBar;
