import React from "react";
import { useNavigate } from "react-router-dom";

function Accounts() {

  const navigate = useNavigate();

  return (
    <div className="w-[100vw] bg-[#f6f2f2]">
      <div className="shadow-2xl w-[90%] m-9 bg-white rounded p-6 ">
        <div className="">
          <h1 className="">
            <b>Displaying all connected AWS accounts</b>
          </h1>
        </div>

        <div className="flex justify-between items-center">
          <button onClick={()=>navigate('/accounts-iam-role')} className="bg-blue-50 text-black px-4 py-2 my-5 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors">
            + Link Account
          </button>
          <div>
            <input
              type="text"
              placeholder="Search by Email..."
              className="flex-1 px-4 py-2 rounded-lg border border-[#85c6f8] shadow focus:ring-2 focus:ring-blue-400"
            />

            <button className="bg-blue-50 text-black px-4 py-2 mx-4 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] transition">
              Search
            </button>
          </div>
        </div>

        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 ">Account Name</th>
              <th className="px-4 py-2 ">Account ID</th>
              <th className="px-4 py-2">Status</th>
              {/* <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th> */}
              <th className="px-4 py-2">Onboarded On </th>
              <th className="px-4 py-2">Active</th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-gray-50 border-[#d1d1d1] border hover:bg-blue-50 transition">
              <td className="px-4 py-2  text-center">
                {" "}
                1MG - ePayLater-Old-Prod{" "}
              </td>
              <td className="px-4 py-2 text-center">767397907027</td>
              <td className="px-4 py-2 flex items-center justify-center relative ">
                <span className="bg-blue-100 text-black rounded px-2 py-1 ">
                  Orphan
                </span>
              </td>
              <td className="px-4 py-2 text-center ">2025-01-10T09:15:00Z</td>
                <td className="flex justify-center items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-400 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </td>
            </tr>

            <tr className="bg-gray-50 border-[#d1d1d1] border hover:bg-blue-50 transition">
              <td className="px-4 py-2  text-center">
                {" "}
                2MG - ePayLater-New-Prod{" "}
              </td>
              <td className="px-4 py-2 text-center">958468907027</td>
              <td className="px-4 py-2 flex items-center justify-center relative ">
                <span className="bg-blue-100 text-black rounded px-2 py-1 ">
                  Assigned
                </span>
              </td>{" "}
              <td className="px-4 py-2 text-center">2025-01-10T09:15:00Z</td>
                <td className="flex justify-center items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-400 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Accounts;
