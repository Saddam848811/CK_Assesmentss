import React from "react";
import EC2data from "./EC2data";

function EC2Table() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="">
          <b>Displaying EC2 Resources</b>
        </h1>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2">Resource ID</th>
            <th className="px-4 py-2">Resource Name</th>
            <th className="px-4 py-2">Region</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {EC2data.map((item) => (
            <tr
              key={item.resourceId}
              className="bg-gray-50 border-gray-200 border hover:bg-blue-50 transition"
            >
              <td className="px-4 py-2 text-center text-gray-700 text-sm">
                {item.resourceId}
              </td>
              <td className="px-4 py-2 text-center text-gray-700 text-sm">
                {item.resourceName}
              </td>
              <td className="px-4 py-2 text-center text-gray-700 text-sm">
                {item.region}
              </td>
              <td className="px-4 py-2 text-center text-gray-700 text-sm">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    item.status === "Running" || item.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EC2Table;
