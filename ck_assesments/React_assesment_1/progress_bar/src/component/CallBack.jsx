import { useCallback, useEffect, useRef, useState } from "react";

function ExpensiveComponent() {


  const[count, setCount] = useState(0)
  const exref = useRef(null);

  const expensive = useCallback(() => {
    console.log("inside expensive");
  });

  let excheck = expensive;

  useEffect(() => {
    exref.current = expensive;
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
          if (exref.current === excheck) {
            console.log("inside if");
          }else{
            console.log("outside if");
            
          }
        }}
      >
        click
      </button>
    </div>
  );
}

export default ExpensiveComponent;
