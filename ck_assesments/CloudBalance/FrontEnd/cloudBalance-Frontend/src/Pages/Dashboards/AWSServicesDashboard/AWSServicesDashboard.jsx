import React, { useState } from "react";
import EC2Table from "./EC2Table";
import RDStable from "./RDStable";
import ASGtable from "./ASGtable";

function AWSServicesDashboard() {
  const [activeService, setActiveService] = useState("EC2");

  return (
    <div className="bg-[#f6f2f2]">
      <div className="shadow-2xl m-9 bg-white rounded p-6">
        <div className="  flex justify-between">
          <div className=" w-fit">
            <button
              onClick={() => setActiveService("EC2")}
              className="bg-blue-50 text-black px-4 py-1 mr-1 shadow border border-[#85c6f8] hover:bg-[#85c6f8] transition"
            >
              EC2
            </button>

            <button
              onClick={() => setActiveService("RDS")}
              className="bg-blue-50 text-black px-4 py-1 mx-1 shadow border border-[#85c6f8] hover:bg-[#85c6f8] transition"
            >
              RDS
            </button>

            <button
              onClick={() => setActiveService("ASG")}
              className="bg-blue-50 text-black px-4 py-1 mx-1 shadow border border-[#85c6f8] hover:bg-[#85c6f8] transition"
            >
              ASG
            </button>
           
          </div>
           <div className="w-60">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                MAV
              </label>

              <select
                // value={selected}
                // onChange={(e) => setSelected(e.target.value)}
                className="w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="1mg - (All) ">1mg - (All)</option>
                <option value="1mg - 1MG - LFS">1mg - 1MG - LFS</option>
                <option value="1mg - 1MG - LFS">1mg - 1MG - LFS</option>
                <option value="1mg - 1MG - LFS">1mg - 1MG - LFS</option>
                <option value="1mg - 1mg-devops">1mg - 1mg-devops</option>
              </select>
            </div>
        </div>

        {activeService === "EC2" && <EC2Table />}
        {activeService === "RDS" && <RDStable />}
        {activeService === "ASG" && <ASGtable />}
      </div>
    </div>
  );
}

export default AWSServicesDashboard;
