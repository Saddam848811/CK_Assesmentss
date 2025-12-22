import React, { useEffect, useState } from "react";

function UserDashboard(prop) {
  console.log(prop, "prop");

  const { api, editUser } = prop;

  const [user, setUser] = useState({});

  useEffect(() => {
  if (editUser) {
    setUser(editUser);
  }
}, [editUser]);


  return (
    <>
      <div className="">
        {/* <div className="h-[10%] flex items-end pl-9 border-b-1 border-[#dcdbdb]">
          <h1 className="text-4xl font-bold">{id ? "Edit User" : "Add User"}</h1>
        </div> */}

        <div className="shadow-2xl w-[90%] m-9 bg-white rounded p-6">
          <form
            action={"/user-table"}
            className="grid grid-cols-2 grid-rows-3 gap-4 w-full"
          >
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
                type="text"
                className="border px-3 py-2 w-full rounded border-[#c5c2c2]"
                placeholder={editUser?.password || "Password"}
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

            <div className="col-span-2">
              <button
                onClick={(e) => {
                  e.preventDefault();

                  console.log(editUser,"user in add user submit button",user);
                  
                  const addUser = async () => {
                    const response = await api(user);
                    console.log(response,"from add user subit button" ,response.status);
                    
                    if (response.status === 201) {
                      alert("user added succesfully");
                    }
                    if (response.status === 200) {
                      alert("user edited succesfully");
                    }
                  };
                  addUser();

                }}
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
