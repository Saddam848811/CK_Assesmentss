import React, { useState } from "react";

function Counter() {
  const [pressed1, setPressed1] = useState(false);
  const [pressed, setPressed] = useState(false);

  const [cValue, setCValue] = useState(0);

  return (
    <div>
      <h1>Couter</h1>
      <h2>Current Value : {cValue}</h2>

      <div
        style={{
          display: "flex",
        }}
      >
        <h3>Click to increment/Clear - </h3>
        <button
          onClick={() => {
            setCValue(cValue + 1);
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
            fontSize: "15px",
            border: "2px solid #e1dfdfff",
            transition: "transform 0.1s ease, box-shadow 0.1s ease",
            transform: pressed1 ? "scale(0.95)" : "scale(1)",
            boxShadow: pressed1 ? "0 0 5px #00000066 inset" : "none",
          }}
        >
          Click+
        </button>

        <button
          onClick={() => {
            setCValue(0);
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
            fontSize: "15px",
            border: "2px solid #e1dfdfff",
            transition: "transform 0.1s ease, box-shadow 0.1s ease",
            transform: pressed ? "scale(0.95)" : "scale(1)",
            boxShadow: pressed ? "0 0 5px #00000066 inset" : "none",
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default Counter;
