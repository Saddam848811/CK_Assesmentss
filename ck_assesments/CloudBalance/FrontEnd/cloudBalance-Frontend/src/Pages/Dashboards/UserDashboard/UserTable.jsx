import React,{ useEffect, useRef, useState } from "react";
import { PiUserSwitchThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPencil } from "react-icons/fa6";
import AddUser from "../../Dashboards/UserDashboard/AddUser";
import editUserapi from "../../../Axios/UserDashboardApi/EditUserApi";
import getUsersApi from "../../../Axios/UserDashboardApi/GetUsersApi";
import getUserByIdApi from "../../../Axios/UserDashboardApi/GetUserByIdApi";
import Loading from "../../../Components/Loading/Loading";
import ConfirmationPopUp from "../../../Components/ConfirmationPopUp/ConfirmationPopUp";
import { setActiveApi } from "../../../Axios/UserDashboardApi/setActiveApi";
import { getAccountsByUserIdApi } from "../../../Axios/AccountManagementAPI/getAccountsByUserIdAPI";

function UserTable() {
  const userRole = useSelector((state) => state.role?.userRole ?? null);

  const navigate = useNavigate();
  const [editUserPopup, setEditUserPopup] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUserData, setEditUserData] = useState({});
  const [refreshUsers, setRefreshUsers] = useState(false);
  const [activePopUp, setActivePopUp] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [accountsByUserId, setAccountsByUserId] = useState([]);
  const [tooltipUserId, setTooltipUserId] = useState(null);
  const tooltipRef = useRef();

  useEffect(() => {
    if (userRole === "ROLE_CUSTOMER") {
      navigate("/cost-explorer-dashboard");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await getUsersApi();
        setUsers(response.data || []);
      } catch (error) {
        setUsers([]);
        if (error.response.status === 404 || error.response.status === 400) {
          alert(`${error.response.data.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refreshUsers, navigate, userRole]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setTooltipUserId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" bg-[#f6f2f2]">
      {loading ? (
        <Loading />
      ) : (
        <div className="shadow-2xl m-9 bg-white rounded p-6">
          <div className="flex items-center  ">
            <div className="flex gap-3">
              {userRole === "ROLE_ADMIN" && (
                <button
                  onClick={() => {
                    navigate("/add-user");
                  }}
                  className="bg-blue-50 text-black px-4 py-2 mb-5  rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] transition"
                >
                  Add User
                </button>
              )}
            </div>
          </div>
          <div className="mb-5">
            <h1 className="">
              <b>Displaying all Users</b>
            </h1>
          </div>
          {activePopUp && (
            <ConfirmationPopUp
              onClose={setActivePopUp}
              user={activeUser}
              onSuccess={() => setRefreshUsers((prev) => !prev)}
              activeFun={setActiveApi}
            />
          )}

          {editUserPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent backdrop-blur-sm">
              <div className="relative">
                <AddUser
                  edit={true}
                  api={editUserapi}
                  editUser={editUserData}
                  onClose={() => setEditUserPopup(false)}
                  onSuccess={() => setRefreshUsers((prev) => !prev)}
                />
              </div>
            </div>
          )}

          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2 ">Username</th>
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
              {users.map((user) => (
                <tr
                  key={user.email}
                  className="bg-gray-50 border-gray-200 border hover:bg-blue-50 transition"
                >
                  <td className="px-4 py-2 text-center text-gray-700 text-sm">
                    {user.username}
                  </td>
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
                  <td className="text-center relative">
                    <button
                      onClick={async () => {
                        try {
                          const response = await getAccountsByUserIdApi(user);
                          setAccountsByUserId(response.data || []);
                          setTooltipUserId(user.id);
                        } catch (error) {
                          if (error.response.status === 401) {
                            alert("Unauthorized request");
                          }
                        }
                      }}
                      className="rounded-full hover:bg-[#b9dffc] active:bg-blue-200 transition duration-150"
                    >
                      <PiUserSwitchThin size={"20"} className="" />
                    </button>
                    {tooltipUserId === user.id && (
                      <div
                        ref={tooltipRef}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 border border-blue-300 bg-blue-50 w-40 px-4 py-3 rounded shadow-lg z-50"
                      >
                        {accountsByUserId.length === 0 ? (
                          <p className="text-gray-500 italic text-sm">
                            No assigned accounts
                          </p>
                        ) : (
                          <ul className="list-none pl-5 space-y-1 text-gray-700 text-sm">
                            {accountsByUserId.map((acc) => (
                              <li key={acc.id}>{acc.accountName}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </td>
                  {userRole === "ROLE_ADMIN" && (
                    <td className=" py-1 flex items-center justify-center gap-4 ">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={user.active}
                          onChange={() => {
                            setActivePopUp(true);
                            setActiveUser(user);
                          }}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-400 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                      </label>
                    </td>
                  )}
                  {userRole === "ROLE_ADMIN" && (
                    <td className=" ">
                      <button
                        className="bg-blue-50 rounded-full p-2 hover:bg-[#b9dffc] transition flex justify-center items-center mx-auto"
                        onClick={() => {
                          setEditUserPopup(true);

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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserTable;
