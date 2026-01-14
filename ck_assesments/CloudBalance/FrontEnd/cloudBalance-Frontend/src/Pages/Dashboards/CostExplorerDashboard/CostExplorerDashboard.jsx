import CostExplorerTable from "../../../Components/Charts/CostExplorerTable";
import React from "react";

function CostExplorerDashboard() {
  return (
    <div className="bg-[#f6f2f2] min-h-screen">
      <div className="shadow-2xl m-9 bg-white rounded p-6">
        <CostExplorerTable />
      </div>
    </div>
  );
}

export default CostExplorerDashboard;
