import React from "react";

function LoginInputs(prop) {
  const { placeHolder } = prop;

  return (
    <>
        <input
            className="ml-2 border-1  border-[#7b7d86] rounded h-[100%] w-[100%]"
            type="text"
            placeholder={placeHolder}
        />
    </>
  );
}

export default LoginInputs;
