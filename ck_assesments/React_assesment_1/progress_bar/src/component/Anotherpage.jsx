import React, { useRef } from "react";

function Anotherpage() {
  const countRef = useRef(0);

  const handleInc = () => {
    countRef.current = countRef.current+1 ;
    console.log("countRef : ", countRef.current);
    
  }

  return (
    <>
      <div>This is next page.</div>
                  
      <h1>{countRef.current}</h1>


      <button onClick={handleInc}>Increment</button>
    </>
  );
}

export default Anotherpage;
