import React from "react";

function ConfirmationPopUp({ onClose, user, onSuccess, activeFun }) {
  if (!user) return null;

  const newStatus = !user.active;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent backdrop-blur-sm">
      <div className="relative bg-white w-[380px] rounded-xl shadow-1xl p-6 border-blue-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Confirm Action
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to proceed with this action?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => onClose(false)}
            className="bg-white text-black px-4 py-2 mb-5  rounded-lg shadow border border-[#ececec] hover:bg-[#ececec] transition"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              try {
                const response = await activeFun(user, newStatus);
                onSuccess();
                onClose(false);
              } catch (err) {
                console.error(err);
              }
            }}
            className="bg-blue-100 text-black px-4 py-2 mb-5 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPopUp;
