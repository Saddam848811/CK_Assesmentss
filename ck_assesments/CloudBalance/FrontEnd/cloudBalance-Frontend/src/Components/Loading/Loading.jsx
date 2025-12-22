import React from "react";

function Loading({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/50 z-50">
      {/* Spinner */}
      <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin shadow-lg"></div>
      
      {/* Animated text */}
      <p className="mt-4 text-gray-700 text-lg font-semibold animate-pulse">
        {message}
      </p>
    </div>
  );
}

export default Loading;
