import React, { useEffect } from "react";

function App() {
 let clean =  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Interval running");
    }, 1000);

    // Cleanup function stored in a variable
    const cleanup = () => {
      clearInterval(timer);
      console.log("Cleanup ran");
    };

    return cleanup; // Returning the variable
  }, []);

  return <div>Check the console</div>;
}

export default App;
