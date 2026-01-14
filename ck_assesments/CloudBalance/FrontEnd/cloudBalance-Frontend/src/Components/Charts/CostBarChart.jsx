import React, { useState } from "react";
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
import { LuChartColumnStacked, LuChartSpline } from "react-icons/lu";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function CostBarChart({ chartData }) {
  const [view, setView] = useState("bar");

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
        grid: { color: "#e5e7eb", borderColor: "#cbd5e1" },
      },
      y: {
        stacked: view === "stacked",
        ticks: { callback: (value) => `$${value / 1000}k` },
        grid: { color: "#f3f4f6", borderColor: "  " },
      },
    },
  };

  return (
    <div className="border border-gray-100 mb-10 bg-white rounded p-4">
      <div className="flex items-center justify-end mb-4 gap-2">
        <button
          onClick={() => setView("bar")}
          className={`px-3 py-1 border rounded ${
            view === "bar"
              ? "bg-blue-50 border-[#85c6f8] text-blue-700"
              : "bg-white text-gray-500 border-[#85c6f8]"
          }`}
        >
          <FaRegChartBar />
        </button>
        <button
          onClick={() => setView("stacked")}
          className={`px-3 py-1 border rounded ${
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

      <div className="h-[400px]">
        {view === "line" ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
}

export default CostBarChart;
