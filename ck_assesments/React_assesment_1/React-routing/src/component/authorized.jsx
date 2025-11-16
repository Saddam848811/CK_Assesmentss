import React from "react";
import { Navigate, Outlet, Link } from "react-router-dom";

function Authorized() {
  const key = localStorage.getItem("login");

  if (!key) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: "20px",
          padding: "15px",
          background: "#eaeaea",
        }}
      >
        <Link to="/counter">Counter</Link>
        <Link to="/timer">Digital Watch</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default Authorized;
