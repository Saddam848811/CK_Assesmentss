import React from "react";

function AddUserButton(prop) {

    const {text} = prop;
  return (
    <button onClick={prop.onClick} className="bg-blue-50 text-black px-4 py-2 my-5 mx-4 rounded-lg shadow border border-[#85c6f8] hover:bg-[#85c6f8] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors">
      {text}
    </button>
  );
}

export default AddUserButton;
