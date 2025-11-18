import React, { useEffect, useState } from "react";

function ProgressBar() {
  const [width, setWidth] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [bgcolor, setBgcolor] = useState("white");
  const [stopDisplay, setStopDisplay] = useState("none");
  const [startDisplay, setStartDisplay] = useState("block");
  const [clearDisplay, setClearDisplay] = useState("none");



 useEffect(() => {
    if (width > 100) {
      setBgcolor("blue");
    } 
    if(width  > 200) {
      setBgcolor("green");
    }if(width  > 300) {
      setBgcolor("orange");
    }if(width  > 300) {
      setBgcolor("pink");
    }if(width  > 400) {
      setBgcolor("yellow");
    }if(width  > 500) {
      setBgcolor("grey");
    }if(width  > 600) {
      setBgcolor("red");
    }
  }, [width]);


  useEffect(() => {

    
    let interval;
    if (clicked && width < 700) {
      interval = setTimeout(() => {
        setWidth((prev) => prev + 1);
      }, 10);
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
          id="card"
          style={{
            border: "2px solid blue",
            display: "flex",
            alignItems: "center",
            height: "150px",
            width: "800px",
            justifyContent: "center",
            borderRadius: "20px",
            backgroundColor: bgcolor,
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
                width: width + "px",
                backgroundColor: "#23a203ff",
              }}
            ></div>
          </div>
        </div>

        <button
          onClick={() => {
            setClicked(true);
            setStopDisplay("block");
            setStartDisplay("none")
          }}
          style={{
            marginTop: "100px",
            height: "50px",
            width: "100px",
            display:startDisplay

          }}
        >
          Start
        </button>

        <button
          onClick={() => {
            setClicked(false);
            setStopDisplay("none")
            setClearDisplay("block")
          }}
          style={{
            marginTop: "100px",
            height: "50px",
            width: "100px",
            display:stopDisplay,
          }}
        >
          Stop
        </button>

        <button
          onClick={() => {
            setClicked(false);
            setWidth(0);
            setBgcolor("white")
            setClearDisplay("none");
            setStartDisplay("block")
          }}
          style={{
            marginTop: "100px",
            height: "50px",
            width: "100px",
            display:clearDisplay,
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default ProgressBar;
