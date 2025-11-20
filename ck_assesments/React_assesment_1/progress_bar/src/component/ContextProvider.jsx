import React, { createContext, useReducer, useState } from "react";
import ChildA from "./ChildA";
import ChildB from "./ChildB";

export const ColorContext = createContext();
export const a = "sdsfds"

function ContextProvider() {
  const [count, setCount] = useState(0);

  console.log(count, "provider count from child A");

  const reduce = (state, action) => {
    if (action.type == "addone") {
      return state + 1;
    }
  };
  const [count1, dispatch] = useReducer(reduce, 0);

  console.log(count1, "provider count 1 from child B");

  return (
    <div>
      <ColorContext.Provider value={{ count, setCount, dispatch }}>
        <ChildA />

        <ChildB />
      </ColorContext.Provider>
    </div>
  );
}

export default ContextProvider;
