import React from 'react'

function LoginButton(prop) {
  return (
    <>
        <button onClick={prop.onClick} className=" w-[100%] h-[100%] bg-[#4398d7] text-white">Log In</button>
    </>
  )
}

export default LoginButton
