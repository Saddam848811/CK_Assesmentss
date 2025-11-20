import React, { useEffect, useRef, useState } from "react";

function ProgressBar() {
  const [count, setCount] = useState(0);





  const [width, setWidth] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [bgcolor, setBgcolor] = useState("white");
  const [stopDisplay, setStopDisplay] = useState("none");
  const [startDisplay, setStartDisplay] = useState("block");
  const [clearDisplay, setClearDisplay] = useState("none");

  const bgcolorref = useRef();

  useEffect(() => {
    if (width > 10) {
      bgcolorref.current.style.backgroundColor = "blue";
      //   setBgcolor("blue");
    }
    if (width > 20) {
      bgcolorref.current.style.backgroundColor = "green";
    }
    if (width > 40) {
      bgcolorref.current.style.backgroundColor = "orange";
    }
    if (width > 60) {
      bgcolorref.current.style.backgroundColor = "pink";
    }
    if (width > 80) {
      bgcolorref.current.style.backgroundColor = "yellow";
    }
    if (width > 90) {
      bgcolorref.current.style.backgroundColor = "grey";
    }
    if (width > 100) {
      bgcolorref.current.style.backgroundColor = "blue";
    }
  }, [width]);

  useEffect(() => {
    let interval;
    if (clicked && width < 100) {
      interval = setTimeout(() => {
        setWidth((prev) => prev + 0.5);
      }, 50);
    }

    return () => {
      clearInterval(interval);
    };
  }, [clicked, width]);

  return (
    <div>
      <div
        id="container"
        style={{
          border: "2px solid black",
          height: "100vh",
          width: "100wh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          ref={bgcolorref}
          id="card"
          style={{
            border: "2px solid blue",
            display: "flex",
            alignItems: "center",
            height: "150px",
            width: "800px",
            justifyContent: "center",
            borderRadius: "20px",
            // backgroundColor: bgcolor,
          }}
        >
          <div
            id="loading"
            style={{
              //   border: "2px solid black",
              height: "80px",
              width: "700px",
            }}
          >
            <div
              style={{
                border: "2px solid black",
                height: "80px",
                // width: "100%",
                width: width + "%",
                backgroundColor: "#23a203ff",
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  border: "2px solid black",
                  width: "700px",
                  height: "80px",
                  alignItems: "center",
                }}
              >
                {Number(width).toFixed(0)}%
              </h1>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setClicked(true);
            setStopDisplay("block");
            setStartDisplay("none");
          }}
          style={{
            marginTop: "100px",
            height: "50px",
            width: "100px",
            display: startDisplay,
          }}
        >
          Start
        </button>

        <button
          onClick={() => {
            setClicked(false);
            setStopDisplay("none");
            setClearDisplay("block");
          }}
          style={{
            marginTop: "100px",
            height: "50px",
            width: "100px",
            display: stopDisplay,
          }}
        >
          Stop
        </button>

        <button
          onClick={() => {
            setClicked(false);
            setWidth(0);
            bgcolorref.current.style.backgroundColor = "white";
            setClearDisplay("none");
            setStartDisplay("block");
          }}
          style={{
            marginTop: "100px",
            height: "50px",
            width: "100px",
            display: clearDisplay,
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default ProgressBar;
