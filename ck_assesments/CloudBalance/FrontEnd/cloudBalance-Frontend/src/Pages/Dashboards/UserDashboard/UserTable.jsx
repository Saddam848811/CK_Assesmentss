import React, { useEffect, useState } from "react";
import { PiUserSwitchThin } from "react-icons/pi";
import AccountManagement from "../../Dashboards/UserDashboard/UserAccountManagement/AccountManagement";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPencil } from "react-icons/fa6";
import { MdOutlineLaptopChromebook } from "react-icons/md";
import AddUser from "../../Dashboards/UserDashboard/AddUser";
import addUserapi from "../../../Axios/UserDashboardApi/AddUserapi";
import editUserapi from "../../../Axios/UserDashboardApi/EditUserApi";
import getUsersApi from "../../../Axios/UserDashboardApi/GetUsersApi";
import getUserByIdApi from "../../../Axios/UserDashboardApi/GetUserByIdApi";
import axios from "axios";
import { authCheck } from "../../../Axios/Auth/AuthCheck";
import Loading from "../../../Components/Loading/Loading";

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
  const userRole = useSelector((state) => state.role?.userRole ?? null);
  console.log(userRole, "user roles from usertable comp");

  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(null);
  const [accountPopup, setAccountPopup] = useState(null);
  const [addUserPopup, setAddUserPopup] = useState(false);
  const [editUserPopup, setEditUserPopup] = useState(null);
  // const [usersData, setUsersData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUserData, setEditUserData] = useState({});

  const isLoggedin = useSelector((state) => state.login.isLoggedin);

  const toggleActive = (email) => {
    setUsers(
      users.map((user) =>
        user.email === email ? { ...user, active: !user.active } : user
      )
    );
  };

  const updateRole = (email, newRole) => {
    setUsers(
      users.map((u) => (u.email === email ? { ...u, role: newRole } : u))
    );
    setPopupOpen(null);
  };

  useEffect(() => {
    console.log(userRole, "iside useeffect user table comp");

    if (userRole === "ROLE_CUSTOMER") {
      navigate("/cost-explorer-dashboard");
      return;
    }

    const getUsers = async () => {
      const response = await getUsersApi();
      console.log(response.data, "from useffect user table");

      setUsers(response.data);

      setLoading(false);
    };

    getUsers();
  }, []);

  return (
    <div className=" bg-[#f6f2f2]">


      <Loading/>
      <div className="shadow-2xl m-9 bg-white rounded p-6">
        <div className="flex items-center  ">
          {userRole === "ROLE_ADMIN" && (
            <button
              onClick={() => setAddUserPopup(true)}
              className="bg-blue-50 text-black px-4 py-2 mb-5  rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] transition"
            >
              Add User
            </button>
          )}

          {addUserPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
              <div className="relative">
                <button
                  className="absolute -top-3 -right-3 bg-white text-black w-8 h-8 rounded-full shadow-md hover:bg-gray-200 transition"
                  onClick={() => setAddUserPopup(false)}
                >
                  ✕
                </button>
                <AddUser api={addUserapi} />
              </div>
            </div>
          )}

          {/* <input
            type="text"
            placeholder="Search by Email..."
            className="flex-1 px-4 py-2 mb-5 mx-2 rounded-lg border border-[#85c6f8] shadow focus:ring-2 focus:ring-blue-400"
          />

          <button className="bg-blue-50 mb-5 text-black px-4 py-2 mx-2 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] transition">
            Search
          </button> */}
        </div>
        <div className="mb-5">
          <h1 className="">
            <b>Displaying all Users</b>
          </h1>
        </div>

        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 ">Username</th>
              {/* <th className="px-4 py-2">Last Name</th> */}
              <th className="px-4 py-2 ">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">View Accounts</th>
              {userRole === "ROLE_ADMIN" && (
                <>
                  <th className="px-4 py-2">Active</th>
                  <th className="px-4 py-2">Edit</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="10"
                  className="text-center py-5 text-lg font-semibold"
                >
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="text-center py-5 text-lg font-semibold"
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.email}
                  className="bg-gray-50 border-gray-200 border hover:bg-blue-50 transition"
                >
                  <td className="px-4 py-2 text-center text-gray-700 text-sm">
                    {user.username}
                  </td>
                  {/* <td className="px-4 py-2 text-center">{user.lastName}</td> */}
                  <td className="px-4 py-2 text-center text-gray-700 text-sm">
                    {user.email}
                  </td>

                  <td className="px-4 py-2 text-center text-gray-700 text-sm ">
                    <span
                      className={`px-2 py-1 rounded text-xs bg-blue-100 text-gray-700`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="text-center">
                    <button className=" rounded-full hover:bg-[#b9dffc] active:bg-blue-200 transition duration-150">
                      <PiUserSwitchThin size={"20"} className="" />
                    </button>
                  </td>

                  {userRole === "ROLE_ADMIN" && (
                    <td className=" py-1 flex items-center justify-center gap-4 ">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={user.active}
                          onChange={() => toggleActive(user.email)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-400 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                      </label>
                    </td>
                  )}

                  {editUserPopup && editUserPopup.email === user.email && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
                      <div className="relative">
                        <button
                          className="absolute-top-3 -right-3 bg-gray-700 w-8 h-8 rounded-full hover:bg-gray-200 transition"
                          onClick={() => {
                            setEditUserPopup(null);
                          }}
                        >
                          ✕
                        </button>
                        <AddUser api={editUserapi} editUser={editUserData} />
                      </div>
                    </div>
                  )}

                  {accountPopup && (
                    <ManageAccountPopup
                      user={accountPopup}
                      onClose={() => setAccountPopup(null)}
                    />
                  )}

                  {userRole === "ROLE_ADMIN" && (
                    <td className=" ">
                      <button
                        className="bg-blue-50 rounded-full p-2 hover:bg-[#b9dffc] transition flex justify-center items-center mx-auto"
                        onClick={() => {
                          setEditUserPopup(user);

                          const getUserById = async () => {
                            const response = await getUserByIdApi(user);
                            setEditUserData(response);
                          };
                          getUserById();
                        }}
                      >
                        <FaPencil size={"10"} className="text-gray-700" />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
