import React from "react";
import ChildA from "./ChildA";
import ChildB from "./ChildB";
import { Provider, useDispatch, useSelector } from "react-redux";
import { increment } from "../redux/Actions";
import { useEffect } from "react";
import { useState } from "react";

function Parent() {
  const count = useSelector((state) => state.count);
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(1);
  }, [count]);

  

  return (
    <>
      <h1>{count} parent</h1>
      <ChildA />

      <ChildB />
    </>
  );
}

export default Parent;
