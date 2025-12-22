import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { FaRegChartBar } from "react-icons/fa";
import { LuChartColumnStacked } from "react-icons/lu";
import { LuChartSpline } from "react-icons/lu";
import { costExplorerData } from "./costExplorerData";
import { getTop4WithOthersChartData } from "./getTop4WithOthersChartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function CostBarChart() {
  const [view, setView] = useState("bar");
 
  const top5ChartData = getTop4WithOthersChartData(costExplorerData);

  console.log(top5ChartData, "TOP 5 CHART DATA");

  const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom" },
    tooltip: {
      callbacks: { label: (context) => `$${context.raw.toLocaleString()}` },
    },
  },
  scales: {
    x: {
      stacked: view === "stacked",
      grid: {
        color: "#e5e7eb",
        borderColor: "#cbd5e1",
      },
    },
    y: {
      stacked: view === "stacked",
      ticks: { callback: (value) => `$${value / 1000}k` },
      grid: {
        color: "#f3f4f6",
        borderColor: "#cbd5e1",
      },
    },
  },
};


  return (
    <div className="border border-gray-100 my-9 bg-white rounded p-6">
      <div className="flex items-center justify-end mb-6 gap-2  ">
        <div className="flex items-center gap-1  mr-5">
          <input
            type="date"
            className=" px-3 py-1 rounded border-blue-300 border border"
            placeholder="Start Date"
          />

          <input
            type="date"
            className=" px-3 py-1 rounded border-blue-300 border border"
            placeholder="End Date"
          />
        </div>

        <div className="">
          <button
            onClick={() => setView("bar")}
            className={`px-3 py-1 mr-1 border rounded ${
              view === "bar"
                ? "bg-blue-50 border-[#85c6f8] text-blue-700"
                : "bg-white text-gray-500 border-[#85c6f8]"
            }`}
          >
            <FaRegChartBar className="" />
          </button>
          <button
            onClick={() => setView("stacked")}
            className={`px-3 py-1 border mr-1 rounded ${
              view === "stacked"
                ? "bg-blue-50 border-[#85c6f8] text-blue-700"
                : "bg-white text-gray-500 border-[#85c6f8]"
            }`}
          >
            <LuChartColumnStacked />
          </button>
          <button
            onClick={() => setView("line")}
            className={`px-3 py-1 border rounded ${
              view === "line"
                ? "bg-blue-50 border-[#85c6f8] text-blue-700"
                : "bg-white text-gray-500 border-[#85c6f8]"
            }`}
          >
            <LuChartSpline />
          </button>
        </div>
      </div>
      <div className="border-2 border-gray-100 rounded-lg bg-white w-full p-5">
        <div className="h-[400px] p-4">
          {view === "line" ? (
            <Line data={top5ChartData} options={chartOptions} />
          ) : (
            <Bar data={top5ChartData} options={chartOptions} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CostBarChart;
