import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import UserTable from "./Pages/Dashboards/UserDashboard/UserTable.jsx";
import NavBar from "./Components/NavBar/NavBar.jsx";
import Layout from "./Layout.jsx";
import AddUser from "./Pages/Dashboards/UserDashboard/AddUser";
import { store } from "./Redux/Store.js";
import { Provider } from "react-redux";
import Authorize from "./Authorization/Authorize.jsx";
import Accounts from "./Pages/Dashboards/AccountsDashboard/Accounts.jsx";
import AccountsIAMRole from "./Pages/Dashboards/AccountsDashboard/AccountsIAMRole.jsx";
import AccountsCustomerManagedPolicies from "./Pages/Dashboards/AccountsDashboard/AccountsCustomerManagedPolicies.jsx";
import AccountsCreateCostAndUsageReport from "./Pages/Dashboards/AccountsDashboard/AccountsCreateCostAndUsageReport.jsx";
import CostExplorerDashboard from "./Pages/Dashboards/CostExplorerDashboard/CostExplorerDashboard.jsx";
import AWSServicesDashboard from "./Pages/Dashboards/AWSServicesDashboard/AWSServicesDashboard.jsx";

function AppRouter() {
  useEffect(() => {
    const handleStorage = (event) => {
      console.log(event.key, "browser");

      if (event.key === "isLoggedin" && event.newValue === null) {
        window.location.href = "/user-login";
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>

            <Route path="/user-login" element={<Login />} />

            <Route element={<Authorize />}>
              <Route element={<Layout />}>
                <Route path="/user-table" element={<UserTable />} />
                {/* <Route path="/add-user" element={<AddUser />} />
                <Route path="/edit-user" element={<AddUser />} /> */}
                <Route path="/accounts-table" element={<Accounts />} />
                <Route path="/accounts-iam-role" element={<AccountsIAMRole />} />
                <Route path="/accounts-customer-managed-policies" element={<AccountsCustomerManagedPolicies />} />
                <Route path="/accounts-create-cost-usage-report" element={<AccountsCreateCostAndUsageReport />} />
                <Route path="/cost-explorer-dashboard" element={<CostExplorerDashboard />} />
                <Route path="/aws-services-dashboard" element={<AWSServicesDashboard />} />

              </Route>
            </Route>

           
          </Routes>

        </Router>
      </Provider>
    </>
  );
}

export default AppRouter;
