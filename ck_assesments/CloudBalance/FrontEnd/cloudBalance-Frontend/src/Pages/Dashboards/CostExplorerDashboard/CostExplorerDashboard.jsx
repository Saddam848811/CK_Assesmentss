import React, { useState } from "react";
import CostBarChart from "../../../Components/Charts/CostBarChart";
import { costExplorerData } from "../../../Components/Charts/costExplorerData";
import { getSortedDatasetsByTotal } from "../../../Components/Charts/getTop4WithOthersChartData";

function CostExplorerDashboard() {

const sortedDatasets = getSortedDatasetsByTotal(costExplorerData.datasets);
console.log(sortedDatasets);

  return (
    <div className="bg-[#f6f2f2] min-h-screen">
      <div className="shadow-2xl m-9 bg-white rounded p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="mr-5 text-1xl"><b>Group By:</b></h1>
            <div>
              <button className="bg-blue-50 border-blue-300 border text-black text-sm px-1.5 py-0.5 mr-1 shadow  -[#85c6f8] hover:bg-[#85c6f8] transition">Service</button>
              <button className="bg-blue-50 border-blue-300 border text-black text-sm px-1.5 py-0.5 mr-1 shadow  -[#85c6f8] hover:bg-[#85c6f8] transition">Instance Type</button>
              <button className="bg-blue-50 border-blue-300 border text-black text-sm px-1.5 py-0.5 mr-1 shadow  -[#85c6f8] hover:bg-[#85c6f8] transition">Account ID</button>
              <button className="bg-blue-50 border-blue-300 border text-black text-sm px-1.5 py-0.5 mr-1 shadow  -[#85c6f8] hover:bg-[#85c6f8] transition">Usage Type</button>
              <button className="bg-blue-50 border-blue-300 border text-black text-sm px-1.5 py-0.5 mr-1 shadow  -[#85c6f8] hover:bg-[#85c6f8] transition">Platform</button>
              <button className="bg-blue-50 border-blue-300 border text-black text-sm px-1.5 py-0.5 mr-1 shadow  -[#85c6f8] hover:bg-[#85c6f8] transition">Region</button>
              <button className="bg-blue-50 border-blue-300 border text-black text-sm px-1.5 py-0.5 mr-1 shadow  -[#85c6f8] hover:bg-[#85c6f8] transition">Usage Type Group</button>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h1><b>Displaying EC2 Resources</b></h1>
        </div>
        <CostBarChart />
        <table className="table-auto w-full -collapse  -gray-300">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 ">Service</th>
              {costExplorerData.labels.map((label, index) => (
                <th key={index} className="px-4 py-2 ">{label}</th>
              ))}
              <th className="px-4 py-2 ">Total</th>
            </tr>
          </thead>
          <tbody>
            {sortedDatasets.map((dataset, index) => (
              <tr key={index} className="bg-gray-50  hover:bg-blue-50 transition text-blue-800">
                <td className="px-4 py-2 text-center text-gray-700 text-sm  ">{dataset.label}</td>
                {dataset.data.map((value, i) => (
                  <td key={i} className="px-4 py-2 text-center text-gray-700 text-sm  ">${value.toLocaleString()}</td>
                ))}
                <td className="px-4 py-2 text-center font-semibold  ">${dataset.total.toLocaleString()}</td>
              </tr>
            ))}
            <tr className="bg-blue-50 font-semibold">
              <td className="px-4 py-2 text-center  text-blue-800">Total</td>
              {costExplorerData.labels.map((_, monthIndex) => {
                const monthTotal = costExplorerData.datasets.reduce((sum, ds) => sum + ds.data[monthIndex], 0);
                return <td key={monthIndex} className="px-4 py-2 text-center  text-blue-800">${monthTotal.toLocaleString()}</td>;
              })}
              <td className="px-4 py-2 text-center text-blue-800  font-bold">${costExplorerData.datasets.reduce((sum, ds) => sum + ds.data.reduce((a, b) => a + b, 0), 0).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CostExplorerDashboard;
