import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountManagement from "./UserAccountManagement/AccountManagement";
import addUserapi from "../../../Axios/UserDashboardApi/AddUserapi";
import editUserapi from "../../../Axios/UserDashboardApi/EditUserApi";
function UserDashboard(prop) {
  const { editUser, onClose, onSuccess, edit } = prop;

  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [userAccounts, setUserAccounts] = useState([]);

  useEffect(() => {
    if (editUser) {
      setUser(editUser);
    }
  }, [editUser]);

  return (
    <>
      <div className="">
        <div className="shadow-2xl w-[90%] m-9 bg-white rounded p-6">
          <form className="grid grid-cols-2 grid-rows-3 gap-4 w-full">
            <div>
              <label className="font-bold">UserName</label>
              <input
                onChange={(e) =>
                  setUser({
                    ...user,
                    username: e.target.value,
                  })
                }
                type="text"
                className="border px-3 py-2 w-full rounded border-[#c5c2c2]"
                placeholder={editUser?.username || "UserName"}
                required
              />
            </div>

            <div>
              <label className="font-bold">Password</label>
              <input
                onChange={(e) =>
                  setUser({
                    ...user,
                    password: e.target.value,
                  })
                }
                type="password"
                className="border px-3 py-2 w-full rounded border-[#c5c2c2]"
                placeholder={editUser?.password || "Enter Password..."}
                required
              />
            </div>

            <div>
              <label className="font-bold">Email</label>
              <input
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                  })
                }
                type="email"
                className="border px-3 py-2 w-full rounded border-[#c5c2c2]"
                placeholder={editUser?.email || "Email"}
                required
              />
            </div>

            <div>
              <label className="font-bold">Select Role</label>
              <select
                onChange={(e) =>
                  setUser({
                    ...user,
                    role: e.target.value,
                  })
                }
                className="border px-3 py-2 rounded w-full bg-[#f6f2f2] text-[#8a8787] border-[#c5c2c2]"
                required
              >
                <option value="">Select Roles</option>
                <option value="ADMIN">Admin</option>
                <option value="READONLY">Read Only</option>
                <option value="CUSTOMER">Customer</option>
              </select>
            </div>

            <div className="col-span-2"></div>
          </form>
          {user.role === "CUSTOMER" && (
            <div className=" ">
              <AccountManagement
                user={user}
                setUserAccountsForAddUser={setUserAccounts}
                edit={edit}
              />
            </div>
          )}
          <div className="flex  justify-between">
            <button
              onClick={() => {
                if (Object.keys(prop).length === 0) {
                  navigate("/user-table", { state: { refresh: true } });
                } else {
                  onClose();
                }
              }}
              className={`px-4 py-2 my-5 ml-5 rounded-lg shadow border border-[#85c6f8] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors
    ${
      Object.keys(prop).length === 0
        ? "bg-red-200 hover:bg-red-300"
        : "bg-red-200 hover:bg-red-300"
    }`}
            >
              Cancel
            </button>
            <button
              onClick={async (e) => {
                e.preventDefault();

                const userDto = {
                  ...user,
                  accountList: userAccounts,
                };

                if (!edit) {
                  try {
                    const status = await addUserapi(userDto);
                    if (status === 201) {
                      navigate("/user-table");
                    }
                  } catch (error) {
                    const message =
                      error.response?.data?.message ||
                      error.message ||
                      "Something went wrong";
                    alert(message);
                  }
                } else if (edit) {
                  try {
                    const status = await editUserapi(userDto);
                    if (status === 200) {
                      onClose();
                      onSuccess();
                    }
                  } catch (error) {
                    const message =
                      error.response?.data?.message ||
                      error.message ||
                      "Something went wrong";

                    alert(message);
                  }
                }
              }}
              className="bg-blue-50 text-black px-4 py-2 my-5 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
