import React, { useEffect, useState } from "react";

function Timer() {
  const [timer, setTimer] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [pressed1, setPressed1] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [pressed3, setPressed3] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    let intervalId;
    if (clicked) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [clicked]);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <div
        id="main"
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#000000ff",
        }}
      >
        <h1 style={{ color: "#fff", fontSize: "80px" }}>Timer</h1>

        <div
          id="timer"
          style={{
            height: "100px",
            width: "100px",
            backgroundColor: "#e9e3e3ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "40px",
          }}
        >
          {timer}
        </div>

        <div
          style={{
            marginTop: "20px",
            color: "#fff",
            fontSize: "40px",
            fontWeight: "bold",
          }}
        >
          {formatTime(currentTime)}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            marginTop: "40px",
          }}
        >
          <div>
            <h3 style={{ color: "#fff", fontSize: "30px" }}>Start timer - - - </h3>
          </div>
          <button
            onClick={() => setClicked(true)}
            onMouseDown={() => setPressed1(true)}
            onMouseUp={() => setPressed1(false)}
            onMouseLeave={() => setPressed1(false)}
            style={{
              height: "4em",
              width: "7em",
              borderRadius: "1em",
              backgroundColor: "#4283fbff",
              color: "white",
              fontSize: "20px",
              border: "2px solid #e1dfdfff",
              transition: "transform 0.1s ease, box-shadow 0.1s ease",
              transform: pressed1 ? "scale(0.95)" : "scale(1)",
              boxShadow: pressed1 ? "0 0 5px #00000066 inset" : "none",
              marginLeft: "20px",
            }}
          >
            Start
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <div>
            <h3 style={{ color: "#fff", fontSize: "30px" }}>Stop/Clear timer - - -</h3>
          </div>
          <button
            onClick={() => setClicked(false)}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
            style={{
              height: "4em",
              width: "7em",
              borderRadius: "1em",
              backgroundColor: "#4283fbff",
              color: "white",
              fontSize: "20px",
              transition: "transform 0.1s ease, box-shadow 0.1s ease",
              transform: pressed ? "scale(0.95)" : "scale(1)",
              boxShadow: pressed ? "0 0 5px #00000066 inset" : "none",
              marginLeft: "20px",
            }}
          >
            Stop
          </button>
          <button
            onClick={() => {
              setClicked(false);
              setTimer(0);
            }}
            onMouseDown={() => setPressed3(true)}
            onMouseUp={() => setPressed3(false)}
            onMouseLeave={() => setPressed3(false)}
            style={{
              height: "4em",
              width: "7em",
              borderRadius: "1em",
              backgroundColor: "#4283fbff",
              color: "white",
              fontSize: "20px",
              transition: "transform 0.1s ease, box-shadow 0.1s ease",
              transform: pressed3 ? "scale(0.95)" : "scale(1)",
              boxShadow: pressed3 ? "0 0 5px #00000066 inset" : "none",
              marginLeft: "20px",
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
