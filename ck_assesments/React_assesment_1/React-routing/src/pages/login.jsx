import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [pressed, setPressed] = useState(false);
  const navigate = useNavigate();
  const key = localStorage.getItem("login");

  if (key == "login") {
    console.log(key, "isnide if");

    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <div
        id="main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          //   border: "2px solid black",
        }}
      >
        <div
          id="card"
          style={{
            boxShadow: "1px 1px 15px #bdb8b8ff ",
            borderRadius: "15px",
            height: "25em",
            width: "30em",
            background: "#f9f2f2ff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              color: "#494646ff",
            }}
          >
            {" "}
            Click here to login...
          </h1>
          <button
            onClick={() => {
              localStorage.setItem("login", "login");
              navigate("/dashboard");
            }}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
            style={{
              height: "4em",
              width: "7em",
              borderRadius: "1em",
              backgroundColor: "#4283fbff",
              justifyContent: "end",
              color: "white",
              fontSize: "20px",
              border: "2px solid #e1dfdfff",
              transition: "transform 0.1s ease, box-shadow 0.1s ease",
              transform: pressed ? "scale(0.95)" : "scale(1)",
              boxShadow: pressed ? "0 0 5px #00000066 inset" : "none",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
