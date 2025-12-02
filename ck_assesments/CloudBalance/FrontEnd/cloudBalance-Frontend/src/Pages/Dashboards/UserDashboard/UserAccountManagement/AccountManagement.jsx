import React, { useState } from "react";
import { orphanAccounts as orphanData } from "./OrphanAccount";
import { userAccounts } from "./UsersAccounts";
import { assignedAccounts as assignedData } from "../UserAccountManagement/AssignedAccount";

function AccountManagement({ user }) {
  const [orphanAccounts, setOrphanAccounts] = useState(orphanData.map(a => ({ ...a, type: "orphan" })));
  const [usersAccount, setUsersAccounts] = useState(userAccounts.map(a => ({ ...a, type: a.type || "orphan" })));
  const [assignedAccounts, setAssignedAccounts] = useState(assignedData.map(a => ({ ...a, type: "assigned" })));
  const [dragItem, setDragItem] = useState(null);
  const [dragFrom, setDragFrom] = useState(null);
  const [activeLeftView, setActiveLeftView] = useState("orphan");

  const onDragStart = (acc, from) => {
    setDragItem(acc);
    setDragFrom(from);
  };

  const onDropToUsers = () => {
    if (!dragItem) return;
    if (dragItem.type === "orphan" && dragFrom === "orphan") {
      setOrphanAccounts(orphanAccounts.filter(a => a.id !== dragItem.id));
      setUsersAccounts([...usersAccount, dragItem]);
    } else if (dragItem.type === "assigned" && dragFrom === "assigned") {
      setAssignedAccounts(assignedAccounts.filter(a => a.id !== dragItem.id));
      setUsersAccounts([...usersAccount, dragItem]);
    }
    setDragItem(null);
  };

  const onDropToOrphan = () => {
    if (!dragItem || dragFrom !== user.firstname) return;
    if (dragItem.type === "orphan") {
      setUsersAccounts(usersAccount.filter(a => a.id !== dragItem.id));
      setOrphanAccounts([...orphanAccounts, dragItem]);
    }
    setDragItem(null);
  };

  const onDropToAssigned = () => {
    if (!dragItem || dragFrom !== user.firstname) return;
    if (dragItem.type === "assigned") {
      setUsersAccounts(usersAccount.filter(a => a.id !== dragItem.id));
      setAssignedAccounts([...assignedAccounts, dragItem]);
    }
    setDragItem(null);
  };

  const leftAccounts = activeLeftView === "orphan" ? orphanAccounts : assignedAccounts;

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between px-10 mt-10">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={activeLeftView === "orphan" ? onDropToOrphan : onDropToAssigned}
          className="shadow-2xl w-[40%] bg-[#f2f2f2] rounded p-6 h-[70vh] overflow-y-auto"
        >
          <div className="flex justify-between">
            <button
              onClick={() => setActiveLeftView("orphan")}
              className={`bg-blue-50 text-black px-4 py-2 my-5 mx-4 rounded-lg shadow border border-[#85c6f8] ${activeLeftView === "orphan" ? "bg-blue-500 text-white" : ""}`}
            >
              Orphan Accounts
            </button>
            <button
              onClick={() => setActiveLeftView("assigned")}
              className={`bg-blue-50 text-black px-4 py-2 my-5 mx-4 rounded-lg shadow border border-[#85c6f8] ${activeLeftView === "assigned" ? "bg-blue-500 text-white" : ""}`}
            >
              Assigned Accounts
            </button>
          </div>
          <div className="flex gap-2 mb-4">
            <input type="text" placeholder="Search accounts..." className="w-full border px-3 py-2 rounded" />
            <button className="bg-blue-600 text-white px-4 rounded">Search</button>
          </div>
          <div className="space-y-3">
            {leftAccounts.length > 0 ? (
              leftAccounts.map(acc => (
                <div
                  key={acc.id}
                  draggable
                  onDragStart={() => onDragStart(acc, activeLeftView)}
                  className="border p-3 rounded bg-gray-50 cursor-grab"
                >
                  <p><strong>ID:</strong> {acc.id}</p>
                  {acc.provider && <p><strong>Provider:</strong> {acc.provider}</p>}
                  {acc.email && <p><strong>Email:</strong> {acc.email}</p>}
                  {acc.assignedTo && <p><strong>Assigned To:</strong> {acc.assignedTo}</p>}
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">No accounts</p>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-6">
          <p className="text-lg font-semibold">Add → or ← Remove</p>
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDropToUsers}
          className="shadow-2xl w-[40%] bg-[#f2f2f2] rounded p-6 h-[70vh] overflow-y-auto"
        >
          <h1 className="text-xl font-bold mb-4">{user.firstname}'s Accounts</h1>
          <div className="flex gap-2 mb-4">
            <input type="text" placeholder="Search accounts..." className="w-full border px-3 py-2 rounded" />
            <button className="bg-blue-600 text-white px-4 rounded">Search</button>
          </div>
          <div className="space-y-3">
            {usersAccount.length > 0 ? (
              usersAccount.map(acc => (
                <div
                  key={acc.id}
                  draggable
                  onDragStart={() => onDragStart(acc, user.firstname)}
                  className={`border p-3 rounded cursor-grab ${acc.type === "orphan" ? "bg-yellow-50" : "bg-green-50"}`}
                >
                  <p><strong>ID:</strong> {acc.id}</p>
                  {acc.provider && <p><strong>Provider:</strong> {acc.provider}</p>}
                  {acc.email && <p><strong>Email:</strong> {acc.email}</p>}
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">No accounts assigned</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountManagement;
