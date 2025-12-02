import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function UserDashboard() {

  const navigate = useNavigate();

  const location = useLocation();
  // const user = location.state?.user;
  const id = location?.search?.split("=")?.[1];
  console.log(id);
  

  return (
    <>
      <div className="w-[100vw] bg-[#f6f2f2]">
        <div className="h-[10%] flex items-end pl-9 border-b-1 border-[#dcdbdb]">
          <h1 className="text-4xl font-bold">{id ? "Edit User" : "Add User"}</h1>
        </div>

        <div className="shadow-2xl w-[90%] m-9 bg-white rounded p-6">
          <form action={"/user-table"} className="grid grid-cols-2 grid-rows-3 gap-4 w-full">
            <div>
              <label className="font-bold">First Name</label>
              <input
                type="text"
                className="border px-3 py-2 w-full rounded border-[#c5c2c2]"
                placeholder="Enter First Name"
                required
              />
            </div>

            <div>
              <label className="font-bold">Last Name</label>
              <input
                type="text"
                className="border px-3 py-2 w-full rounded border-[#c5c2c2]"
                placeholder="Enter Last Name"
                required
              />
            </div>

            <div>
              <label className="font-bold">Email Id</label>
              <input
                type="email"
                className="border px-3 py-2 w-full rounded border-[#c5c2c2]"
                placeholder="Enter Email ID"
                required
              />
            </div>

            <div>
              <label className="font-bold">Select Role</label>
              <select
                className="border px-3 py-2 rounded w-full bg-[#f6f2f2] text-[#8a8787] border-[#c5c2c2]"
                required
              >
                <option value="">Select Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Read Only</option>
                <option value="employee">User</option>
              </select>
            </div>

            <div className="col-span-2">
              <button
                // onClick={()=>{navigate('/user-table')}}
                type="submit"
                className="bg-blue-50 text-black px-4 py-2 my-5 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
