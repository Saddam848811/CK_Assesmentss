import React, { useEffect, useState } from "react";
import { getAccountsApi } from "../../../../Axios/AccountOnboardingApi/getAccountsApi";
import { getAccountsByUserIdApi } from "../../../../Axios/AccountManagementAPI/getAccountsByUserIdAPI";
import { useNavigate } from "react-router-dom";
import { accountsNotinUserApi } from "../../../../Axios/AccountManagementAPI/accountsNotinUserApi";
import { useSelector } from "react-redux";

function AccountManagement({ setUserAccountsForAddUser, user, edit }) {
  const userRole = useSelector((state) => state.role?.userRole ?? null);

  const navigate = useNavigate();
  const [userAccounts, setUserAccounts] = useState([]);
  const [dragItem, setDragItem] = useState(null);
  const [dragFrom, setDragFrom] = useState(null);
  const [cloudAccountsData, setCloudAccountsData] = useState([]);

  const onDragStart = (acc, from) => {
    setDragItem(acc);
    setDragFrom(from);
  };

  const onDropToUser = async () => {
    if (!dragItem || dragFrom !== "account") return;

    setUserAccounts((prev) => {
      const updated = [...prev, dragItem];

      setUserAccountsForAddUser(updated);

      return updated;
    });
    setCloudAccountsData((prev) =>
      prev.filter((acc) => acc.accountId !== dragItem.accountId)
    );

    setDragItem(null);
  };

  const onDropToAccount = async () => {
    if (!dragItem || dragFrom !== "user") return;

    setUserAccounts((prev) => {
      const updated = prev.filter(
        (acc) => acc.accountId !== dragItem.accountId
      );

      setUserAccountsForAddUser(updated);

      return updated;
    });
    setCloudAccountsData((prev) => [...prev, dragItem]);

    setDragItem(null);
  };

  const handleAddAll = () => {
    if (cloudAccountsData.length === 0) return;

    setUserAccounts((prev) => {
      const updated = [...prev, ...cloudAccountsData];
      setUserAccountsForAddUser(updated);
      return updated;
    });

    setCloudAccountsData([]);
  };

  const handleRemoveAll = () => {
    if (!userAccounts.length) return;

    setCloudAccountsData((prev) => [...prev, ...userAccounts]);
    setUserAccounts([]);
    setUserAccountsForAddUser([]);
  };

  useEffect(() => {
    if (!edit || !user) return;

    if (userRole === "ROLE_CUSTOMER") {
      navigate("/cost-explorer-dashboard");
      return;
    }
    if (userRole === "ROLE_READONLY") {
      navigate("/user-table");
      return;
    }

    const fetchUserAccounts = async () => {
      try {
        const response = await getAccountsByUserIdApi(user);
        setUserAccounts(response.data || []);
        setUserAccountsForAddUser(response.data || []);
      } catch (err) {
        console.error("Failed to fetch user accounts", err);
      }
    };

    fetchUserAccounts();
  }, [
    edit,
    user,
    navigate,
    setUserAccountsForAddUser,
    setUserAccounts,
    userRole,
  ]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        let response;

        if (edit && user) {
          response = await accountsNotinUserApi(user);
        } else {
          response = await getAccountsApi();
        }

        setCloudAccountsData(response.data || []);
      } catch (err) {
        console.error("Failed to fetch accounts:", err);
        setCloudAccountsData([]);
      }
    };

    fetchAccounts();
  }, [edit, user]);

  return (
    <div className="">
      <div className="flex justify-evenly gap-6">
        <div
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={onDropToAccount}
          className="shadow-xl w-[35%] h-[50vh] bg-blue-50 border-[#85c6f8] border rounded p-6  overflow-y-auto"
        >
          <h1 className="text-xl font-bold mb-4 text-center">
            Onboarded Accounts
          </h1>
          <div className="space-y-3">
            {cloudAccountsData.length > 0 ? (
              cloudAccountsData.map((acc) => (
                <div
                  key={acc.accountId}
                  draggable
                  onDragStart={() => onDragStart(acc, "account")}
                  className="border p-3 rounded border-[#85c6f8] bg-blue-100 cursor-grab"
                >
                  <p className="  text-gray-700 ">
                    <strong>Account Name:</strong> {acc.accountName}
                  </p>
                  <p className="  text-gray-700 ">
                    <strong>Account ID:</strong> {acc.accountId}
                  </p>
                  <p className="  text-gray-700 ">
                    <strong>Resource Name:</strong> {acc.resourceName}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic text-center">
                No accounts found
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-[20%] gap-4">
          <button
            onClick={handleAddAll}
            className="w-33 px-4 py-2 bg-blue-300 text-black rounded hover:bg-blue-400"
          >
            Add All →
          </button>

          <button
            onClick={handleRemoveAll}
            className="w-33 px-4 py-2 bg-red-300 text-black rounded hover:bg-red-400"
          >
            ← Remove All
          </button>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={onDropToUser}
          className="shadow-xl w-[35%] h-[50vh] bg-blue-50 border-[#85c6f8] border bg-[#f2f2f2] rounded p-6  overflow-y-auto"
        >
          <h1 className="text-xl font-bold mb-4 text-center">
            {user?.username || "User"}'s Accounts
          </h1>

          <div className="space-y-3">
            {userAccounts.length > 0 ? (
              userAccounts.map((acc) => (
                <div
                  key={acc.accountId}
                  draggable
                  onDragStart={() => onDragStart(acc, "user")}
                  className="border border-green-400 p-3 rounded bg-green-50 cursor-grab"
                >
                  <p className="  text-gray-700 ">
                    <strong>Account Name:</strong> {acc.accountName}
                  </p>
                  <p className="  text-gray-700 ">
                    <strong>Account ID:</strong> {acc.accountId}
                  </p>
                  <p className="  text-gray-700 ">
                    <strong>Resource Name:</strong> {acc.resourceName}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic text-center">
                No assigned accounts found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountManagement;
