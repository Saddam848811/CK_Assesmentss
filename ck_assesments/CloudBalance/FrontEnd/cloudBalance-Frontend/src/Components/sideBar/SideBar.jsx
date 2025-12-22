import React from "react";
import { FaUserCog, FaMoneyCheckAlt, FaAws } from "react-icons/fa";
import { MdOutlineLaptopChromebook } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const userRole = useSelector(state => state.role?.userRole ?? null);
  console.log(userRole,"user roles from sidebar comp");
  
  const isOpen = useSelector(state => state.sidebar.openSidebar);
  const navigate = useNavigate();

  const sidebarLinks = [
    { path: "/user-table", label: "User Management", icon: <FaUserCog size={24} color="#4398d7" />, roles: ["ROLE_ADMIN","ROLE_READONLY"] },
    { path: "/accounts-table", label: "Account Onboarding", icon: <MdOutlineLaptopChromebook size={24} color="#4398d7" />, roles: ["ROLE_ADMIN","ROLE_READONLY"] },
    { path: "/aws-services-dashboard", label: "AWS Services", icon: <FaAws size={24} color="#4398d7" />, roles: ["ROLE_ADMIN","ROLE_CUSTOMER","ROLE_READONLY"] },
    { path: "/cost-explorer-dashboard", label: "Cost Explorer", icon: <FaMoneyCheckAlt size={24} color="#4398d7" />, roles: ["ROLE_ADMIN","ROLE_CUSTOMER","ROLE_READONLY"] },
  ];

  const menuItem =
    "flex items-center m-1 h-10 rounded bg-blue-50 hover:bg-[#eaeeff] cursor-pointer px-3 transition-all duration-300";
  const textClass =
    "whitespace-nowrap text-sm text-gray-700 transition-opacity duration-200";
  const iconClass =
    "min-w-[24px] flex justify-center";

  return (
    <div
      className={`h-screen p-2 shadow-md bg-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <ul className="flex flex-col mt-4">
        {sidebarLinks.map((link) =>
          link.roles.includes(userRole) ? (
            <li key={link.path} onClick={() => navigate(link.path)} className={menuItem}>
              <span className={iconClass}>{link.icon}</span>
              <span className={`${textClass} ${isOpen ? "opacity-100 ml-3" : "opacity-0 w-0 overflow-hidden"}`}>
                {link.label}
              </span>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}

export default SideBar;
