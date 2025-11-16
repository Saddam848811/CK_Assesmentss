import React from "react";

function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: "50px", color: "#ff4d4d" }}>404</h1>
      <p style={{ fontSize: "20px", color: "#555" }}>
        Page Not Found
      </p>
    </div>
  );
}

export default NotFound;
