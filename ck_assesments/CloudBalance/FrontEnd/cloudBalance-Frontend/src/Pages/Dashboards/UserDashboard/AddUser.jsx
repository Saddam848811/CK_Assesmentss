import React from 'react'
import AddUserButton from '../../../Components/Buttons/AddUserButton'
import { useNavigate } from 'react-router-dom'

function UserDashboard() {

  const navigate  = useNavigate()
  return (
   <>
   <div className="  w-[100vw] bg-[#f6f2f2]">
          <div className="h-[10%] flex items-end pl-9 border-b-1 border-[#dcdbdb]">
            <h1 className=" text-4xl font-bold ">Add New User</h1>
          </div>
          <div className="shadow-2xl w-[90%]  m-9 bg-white rounded p-6">
            <div className="grid grid-cols-2 grid-rows-3 gap-4 ">
              <div>
                <label className="font-bold ">First Name</label>
                <input
                  type="text"
                  className="border px-3 py-2 w-full rounded border-[#c5c2c2] "
                  placeholder="Enter First Name"
                />
              </div>

              <div>
                <label className="font-bold border-[#dcdbdb]">Last Name</label>

                <input
                  type="text"
                  className="border px-3 py-2 w-full rounded border-[#c5c2c2]"
                  placeholder="Enter Last Name"

                />
              </div>

              <div>
                <label className="font-bold border-[#dcdbdb]">Email Id</label>

                <input
                  type="text"
                  className="border px-3 py-2 w-full rounded border-[#c5c2c2]"
                  placeholder="Enter Email ID"

                />
              </div>

              <div >
                <label className="font-bold">Select Role</label>

                <select className="border px-3 py-2 rounded w-full  bg-[#f6f2f2] text-[#8a8787] border-[#c5c2c2]">
                  <option  value="">Select Roles</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Read Only</option>
                  <option value="employee">User</option>
                </select>
              </div>

              {/* <div>
                <label className="font-bold">Select Tags</label>

                <select className="border px-3 py-2 rounded w-full bg-[#f6f2f2] text-[#8a8787] border-[#c5c2c2]">
                  <option value="">Select Tags</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Read only</option>
                  <option value="employee">User</option>
                </select>
              </div> */}

            </div>
              {/* <label className="flex items-center gap-2">
  <input type="checkbox" />
  <span className="text-[#8a8787]">Enable Switch Configuration for Customers</span>
</label> */}
<AddUserButton onClick={()=>{navigate("/user-table")}} text={"Submit"}/>
          </div>
        </div>
   </>
  )
}

export default UserDashboard
