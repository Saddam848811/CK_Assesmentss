import React from "react";

function Loading({ message = "Loading..." }) {
  return (
    <div className=" h-[87vh] m-9 bg-white rounded p-6 flex flex-col justify-center items-center">
      <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin shadow-lg"></div>
      <p className="mt-4 text-gray-700 text-lg font-semibold animate-pulse">
        {message}
      </p>
    </div>
  );
}

export default Loading;
