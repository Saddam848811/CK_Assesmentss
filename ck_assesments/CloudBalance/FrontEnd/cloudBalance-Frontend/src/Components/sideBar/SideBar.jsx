import React from "react";
import { FaUserCog } from "react-icons/fa";
import { MdOutlineLaptopChromebook } from "react-icons/md";
import { MdOutlineViewModule } from "react-icons/md";

function SideBar() {
  return (
    <div className="h-screen w-70 p-2  shadow-md ">
      <ul className="flex flex-col mt-7 ">
        <div className="flex bg-blue-50 items-center m-1 gap-3 rounded h-10  hover:bg-[#eaeeff] cursor-pointer">
          {" "}
          <FaUserCog className="ml-3 " size={30} color="#4398d7" />
          <li className="hover:text-[#424040] cursor-pointer " > Users Management</li>
        </div>
        <div className="flex bg-blue-50 items-center m-1 gap-3 rounded h-10  hover:bg-[#eaeeff] cursor-pointer">
          {" "}
  <MdOutlineLaptopChromebook size={30} color="#4398d7" className="ml-3" />
          <li className="hover:text-[#424040] cursor-pointer " > Account Management</li>
</div>

      

        <div  className="bg-blue-50 flex items-center m-1 gap-3 rounded h-10  hover:bg-[#eaeeff] cursor-pointer">
          {" "}  <MdOutlineViewModule size={30}  color="#4398d7"  className="ml-3" />
          <li className="hover:text-[#424040] cursor-pointer">Module Grid</li>
        </div>
      </ul>
    </div>
  );
}

export default SideBar;
