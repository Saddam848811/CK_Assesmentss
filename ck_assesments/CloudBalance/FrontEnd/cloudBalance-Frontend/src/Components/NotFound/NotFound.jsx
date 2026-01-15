import React from "react";
import { useNavigate } from "react-router-dom";
import { BsExclamationTriangleFill } from "react-icons/bs";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="bg-white rounded-xl shadow-lg p-10 text-center max-w-md">
        <BsExclamationTriangleFill className="text-yellow-500 text-6xl mx-auto mb-4" />
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/user-table")}
          className="bg-blue-100 text-black px-4 py-2 mb-5  rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] transition"
        >
          Go Back to Dashboard...
        </button>
      </div>
    </div>
  );
}

export default NotFound;
