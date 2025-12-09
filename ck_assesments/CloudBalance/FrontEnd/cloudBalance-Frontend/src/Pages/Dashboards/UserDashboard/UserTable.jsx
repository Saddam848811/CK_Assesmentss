import React, { useEffect, useState } from "react";
import { PiUserSwitchThin } from "react-icons/pi";
import AccountManagement from "../../Dashboards/UserDashboard/UserAccountManagement/AccountManagement";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPencil } from "react-icons/fa6";
import { MdOutlineLaptopChromebook } from "react-icons/md";
import AddUser from "../../Dashboards/UserDashboard/AddUser";
import addUserapi from "../../../Axios/UserDashboardApi/AddUserapi";
import editUserapi from "../../../Axios/UserDashboardApi/EditUserApi";
import getUsersApi from "../../../Axios/UserDashboardApi/GetUsersApi";
import getUserByIdApi from "../../../Axios/UserDashboardApi/GetUserByIdApi";

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
    const getUsers = async () => {
      const response = await getUsersApi();
      setUsers(response.data);

      setLoading(false);
    };

    getUsers();
  }, []);

  return (
    <div className=" bg-[#f6f2f2]">
      <div className="shadow-2xl  m-9 bg-white rounded p-9 ">
        <div className="flex items-center my-5">
          <button
            onClick={() => setAddUserPopup(true)}
            className="bg-blue-50 text-black px-4 py-2 my-5 mx-4 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] transition"
          >
            Add User
          </button>

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

          <input
            type="text"
            placeholder="Search by Email..."
            className="flex-1 px-4 py-2 rounded-lg border border-[#85c6f8] shadow focus:ring-2 focus:ring-blue-400"
          />

          <button className="bg-blue-50 text-black px-4 py-2 mx-4 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] transition">
            Search
          </button>
        </div>

        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              {/* <th className="px-4 py-2">Last Name</th> */}
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Last Login</th>
              <th className="px-4 py-2">View Accounts</th>
              <th className="px-4 py-2">Active</th>
              <th className="px-4 py-2">Edit</th>
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
                  className="bg-gray-50 border-[#d1d1d1] border hover:bg-blue-50 transition"
                >
                  <td className="px-4 py-2 text-center">
                    {user.firstName} {user.lastName}
                  </td>
                  {/* <td className="px-4 py-2 text-center">{user.lastName}</td> */}
                  <td className="px-4 py-2 text-center">{user.email}</td>

                  <td className="px-4 py-2 flex items-center justify-center relative ">
                    <span className="bg-blue-100 text-black rounded px-2 py-1 ">
                      {user.role}
                    </span>

                    {/* <button
                      className="bg-blue-100 rounded-full p-2 hover:bg-blue-300 hover:text-white transition"
                      onClick={() =>
                        setPopupOpen(
                          popupOpen === user.email ? null : user.email
                        )
                      }
                    >
                      <PiUserSwitchThin color="black" />
                    </button> */}

                    {/* {popupOpen === user.email && (
                      <div className="absolute top-10 right-0 bg-white border shadow-lg rounded w-32 z-10">
                        <div
                          onClick={() => updateRole(user.email, "Admin")}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                        >
                          Admin
                        </div>
                        <div
                          onClick={() => updateRole(user.email, "User")}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                        >
                          User
                        </div>
                        <div
                          onClick={() => updateRole(user.email, "Readonly")}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                        >
                          Readonly
                        </div>
                      </div>
                    )} */}
                  </td>

                  <td className="px-4 py-2">{user.lastLogin}</td>
                  <td className="px-4 py-2 text-center">
                    <button className="p-2 rounded-full hover:bg-[#b9dffc] active:bg-blue-200 transition duration-150">
                      <PiUserSwitchThin className="text-xl text-black" />
                    </button>
                  </td>

                  <td className="px-1 py-2 flex items-center justify-center gap-4 ">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={user.active}
                        onChange={() => toggleActive(user.email)}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-400 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>

                    {editUserPopup && editUserPopup.email === user.email && (
                      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
                        <div className="relative">
                          <button
                            className="absolute -top-3 -right-3 bg-white w-8 h-8 rounded-full hover:bg-gray-200 transition"
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

                    {/* <button
                      className="bg-blue-50 rounded-full p-2 hover:bg-[#b9dffc] transition"
                      onClick={() =>
                        setAccountPopup(
                          accountPopup?.email === user.email ? null : user
                        )
                      }
                    >
                      <MdOutlineLaptopChromebook size={20} />
                    </button> */}

                    {accountPopup && (
                      <ManageAccountPopup
                        user={accountPopup}
                        onClose={() => setAccountPopup(null)}
                      />
                    )} 
                  </td>
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
                      <FaPencil className="text-gray-700" />
                    </button>
                  </td>
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
