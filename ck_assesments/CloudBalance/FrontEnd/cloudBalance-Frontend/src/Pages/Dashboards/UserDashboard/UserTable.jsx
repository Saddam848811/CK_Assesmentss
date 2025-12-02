/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-render */
import React, { useEffect, useState } from "react";
import { userData } from "../../Dashboards/UserDashboard/UserTable";
import { PiUserSwitchThin } from "react-icons/pi";
// import AddUserButton from "../../../Components/yyButtons/AddUserButton";
import AccountManagement from "../../Dashboards/UserDashboard/UserAccountManagement/AccountManagement";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPencil } from "react-icons/fa6";
import { MdOutlineLaptopChromebook } from "react-icons/md";

function ManageAccountPopup({ onClose, user }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
        >
          ✖
        </button>
        <AccountManagement user={user} />
      </div>
    </div>
  );
}

function UserTable() {
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(null);
  const [accountPopup, setAccountPopup] = useState(null);
  const [users, setUsers] = useState(userData);
  const [count,setCount] = useState(0)

  const isLoggedin = useSelector((state) => state.login.isLoggedin);
  console.log(isLoggedin, "from user tabel");

  const toggleActive = (email) => {
    setUsers(
      users.map((user) =>
        user.email === email ? { ...user, Active: !user.Active } : user
      )
    );
  };

  const updateRole = (email, newRole) => {
    setUsers(
      users.map((u) => (u.email === email ? { ...u, role: newRole } : u))
    );
    setPopupOpen(null);
  };
  const changeCount = (val) => {
    setCount((prev) =>prev + val)
    setCount((prev) =>prev + 2)
  }
  // const changeCount = () => {
  //   setCount(count + 1)
  // }

  const getName = () => {
    console.log('name is Saddam'
    )
  }

  useEffect(()=>{
    console.log('useEffect run')
    console.log(getName())
  },[users])

  return (
    <div className="w-[100vw] bg-[#f6f2f2]">
      {count}
      <button className="bg-red-500" onClick={()=>{
        changeCount(5)
      }}>Button</button>
      <div className="shadow-2xl w-[90%] m-9 bg-white rounded p-6">
        <div className="flex items-center my-5">
          <button
            onClick={() => {
              navigate("/add-user");
            }}
            className="bg-blue-50 text-black px-4 py-2 my-5 mx-4 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
          >
            Add User
          </button>
          <input
            type="text"
            placeholder="Search by Email..."
            className="flex-1 px-4 py-2 rounded-lg border border-[#85c6f8] shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
          />
          <button className="bg-blue-50 text-black px-4 py-2 my-5 mx-4 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors">
            Search
          </button>{" "}
        </div>

        <div>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(userData[0]).map((key) => (
                  <th key={key} className="px-4 py-2">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  className="bg-gray-50 border-[#d1d1d1] border-solid border-1 hover:bg-blue-50"
                  key={user.email}
                >
                  <td className="px-4 py-2">{user.firstname}</td>
                  <td className="px-4 py-2">{user.lastname}</td>
                  <td className="px-4 py-2">{user.email}</td>

                  <td className="px-4 py-2 flex items-center justify-between relative">
                    <label className="bg-blue-100 text-black rounded py-1 px-1">
                      {user.role}
                    </label>

                    <button
                      className="bg-blue-100 rounded-full p-2 flex items-center justify-center transition-all duration-300 hover:bg-blue-300 hover:text-white hover:scale-110 focus:outline-none"
                      onClick={() =>
                        setPopupOpen(
                          popupOpen === user.email ? null : user.email
                        )
                      }
                    >
                      <PiUserSwitchThin color="black" />
                    </button>

                    {popupOpen === user.email && (
                      <div className="absolute top-10 right-0 bg-white border shadow-lg rounded w-32 z-10">
                        <div
                          onClick={() => updateRole(user.email, "Admin")}
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        >
                          Admin
                        </div>
                        <div
                          onClick={() => updateRole(user.email, "User")}
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        >
                          User
                        </div>
                        <div
                          onClick={() => updateRole(user.email, "Readonly")}
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        >
                          Readonly
                        </div>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-2">{user.lastLogin}</td>

                  <td className="px-1 py-2 flex justify-between items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={user.Active}
                        onChange={() => toggleActive(user.email)}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-400 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>

                    <div className="relative w-fit">
                      <button
                        onClick={() => {
                          navigate(`/edit-user?id=${user?.email}`);
                        }}
                        className="bg-blue-50 text-black rounded-full hover:bg-[#b9dffc] focus:ring-2 focus:ring-blue-100 transition-colors group p-2"
                      >
                        <FaPencil />
                        <span className="absolute left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded transition-opacity z-10 whitespace-nowrap">
                          Edit User
                        </span>
                      </button>
                    </div>

                    <div className="relative inline-block">
                      <button
                        className="bg-blue-50 text-black rounded-full hover:bg-[#b9dffc] focus:ring-2 focus:ring-blue-100 transition-colors group p-2"
                        onClick={() =>
                          setAccountPopup(
                            accountPopup?.email === user.email ? null : user
                          )
                        }
                      >
                        <MdOutlineLaptopChromebook size={20}/>
                        <span className="absolute left-1/2 -translate-x-1/2 -top-8 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                          Manage Account
                        </span>
                      </button>
                    </div>

                    {accountPopup && (
                      <ManageAccountPopup
                        user={accountPopup}
                        onClose={() => setAccountPopup(null)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserTable;
