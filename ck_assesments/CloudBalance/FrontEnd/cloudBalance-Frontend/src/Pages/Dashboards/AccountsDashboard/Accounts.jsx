import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../../Components/Loading/Loading";
import ConfirmationPopUp from "../../../Components/ConfirmationPopUp/ConfirmationPopUp";
import { setActiveApi } from "../../../Axios/AccountOnboardingApi/setActiveApi";
import { getAccountsApi } from "../../../Axios/AccountOnboardingApi/getAccountsApi";

function Accounts() {
  const [activePopUp, setActivePopUp] = useState(false);
  const navigate = useNavigate();
  const [cloudAccountsData, setCloudAccountsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshUsers, setRefreshUsers] = useState(false);
  const [activeAccount, setActiveAccount] = useState(null);

  const userRole = useSelector((state) => state.role?.userRole ?? null);
  console.log(userRole, "user roles from accounts comp");

  useEffect(() => {
    if (userRole === "ROLE_CUSTOMER") {
      navigate("/cost-explorer-dashboard");
      return;
    }

    const getAccountsfun = async () => {
      const response = await getAccountsApi();
      console.log(response, "from account comp");
      if (response.data) {
        setLoading(false);
      }
      setCloudAccountsData(response.data);
    };

    getAccountsfun();
  }, [refreshUsers, navigate, userRole]);

  return (
    <div className="bg-[#f6f2f2]">
      {loading ? (
        <Loading />
      ) : (
        <div className="shadow-2xl m-9 bg-white rounded p-6">
          <div className="flex justify-between items-center">
            {userRole === "ROLE_ADMIN" && (
              <button
                onClick={() => navigate("/accounts-iam-role")}
                className="bg-blue-50 text-black px-4 py-2 mb-5 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
              >
                + Link Account
              </button>
            )}
          </div>
          <div className="mb-5">
            <h1>
              <b>Displaying all connected AWS accounts</b>
            </h1>
          </div>
          {activePopUp && (
            <ConfirmationPopUp
              onClose={setActivePopUp}
              user={activeAccount}
              onSuccess={() => setRefreshUsers((prev) => !prev)}
              activeFun={setActiveApi}
            />
          )}
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2">Account Name</th>
                <th className="px-4 py-2">Account ID</th>
                <th className="px-4 py-2">Resource Name</th>
                <th className="px-4 py-2">Service Type</th>
                <th className="px-4 py-2">Platform / OS</th>
                <th className="px-4 py-2">Instance Type / Size</th>
                {userRole === "ROLE_ADMIN" && (
                  <th className="px-4 py-2">Active</th>
                )}
              </tr>
            </thead>

            <tbody>
              {cloudAccountsData.map((account, index) => (
                <tr
                  key={index}
                  className="bg-gray-50 border-gray-200 border hover:bg-blue-50 transition"
                >
                  <td className="px-4 py-2 text-center text-gray-700 text-sm">
                    {account.accountName}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700 text-sm">
                    {account.accountId}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700 text-sm">
                    {account.resourceName}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700 text-sm">
                    {account.serviceType}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700 text-sm">
                    {account.platform}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700 text-sm">
                    {account.instanceType}
                  </td>
                  {userRole === "ROLE_ADMIN" && (
                    <td className="py-1 flex items-center justify-center gap-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          onChange={() => {
                            setActivePopUp(true);
                            setActiveAccount(account);
                          }}
                          type="checkbox"
                          className="sr-only peer"
                          checked={account.active}
                          readOnly
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-400 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                      </label>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Accounts;
