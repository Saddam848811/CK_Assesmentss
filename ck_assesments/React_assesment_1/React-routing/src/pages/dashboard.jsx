import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard() {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const [pressed1, setPressed1] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [pressed2, setPressed2] = useState(false);

  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to dashboard</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        {/* <button
          onClick={() => {
            navigate("/counter");
          }}
          onMouseDown={() => setPressed1(true)}
          onMouseUp={() => setPressed1(false)}
          onMouseLeave={() => setPressed1(false)}
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
            transform: pressed1 ? "scale(0.95)" : "scale(1)",
            boxShadow: pressed1 ? "0 0 5px #00000066 inset" : "none",
          }}
        >
          Counter
        </button>
        <button
          onClick={() => {
            navigate("/timer");
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
          Timer
        </button> */}
        <button
          onClick={() => {
            localStorage.removeItem("login");
            navigate("/");
          }}
          onMouseDown={() => setPressed2(true)}
          onMouseUp={() => setPressed2(false)}
          onMouseLeave={() => setPressed2(false)}
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
            transform: pressed2 ? "scale(0.95)" : "scale(1)",
            boxShadow: pressed2 ? "0 0 5px #00000066 inset" : "none",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
